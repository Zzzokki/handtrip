import { MutationResolvers } from "@/api/types";
import { db, orderTable, paymentTable, travelerTable, seatTable, travelSessionTable, seatCostTable } from "@/database";
import Stripe from "stripe";
import { and, eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export const createOrder: MutationResolvers["createOrder"] = async (_, { input }, context) => {
  const { user } = context;

  if (!user || user.role !== "customer") throw new Error("Зөвшөөрөлгүй: Зөвхөн хэрэглэгчид захиалга үүсгэх боломжтой");

  const { travelSessionId, travelers, paymentIntentId } = input;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") throw new Error("Төлбөр төлөгдөөгүй байна. Эхлээд төлбөрөө төлнө үү.");

    const travelSession = await db.query.travelSessionTable.findFirst({
      where: eq(travelSessionTable.id, travelSessionId),
    });

    if (!travelSession) throw new Error("Аялалын сесс олдсонгүй");

    const availableSeats = await db.query.seatTable.findMany({
      where: and(eq(seatTable.travelSessionId, travelSessionId), eq(seatTable.status, "available")),
    });

    if (availableSeats.length < travelers.length) throw new Error(`Хүрэлцэхүйц суудал байхгүй байна. Зөвхөн ${availableSeats.length} суудал үлдсэн.`);

    const totalPrice = paymentIntent.amount;

    const [payment] = await db
      .insert(paymentTable)
      .values({
        total: totalPrice,
        isPaid: true,
        paidAt: new Date(),
        stripePaymentIntentId: paymentIntentId,
        stripePaymentMethod: paymentIntent.payment_method as string,
      })
      .returning();

    const [order] = await db
      .insert(orderTable)
      .values({
        totalSeats: travelers.length,
        totalPrice,
        orderStatus: 1,
        customerId: user.id,
        travelSessionId,
        paymentId: payment.id,
      })
      .returning();

    for (let i = 0; i < travelers.length; i++) {
      const travelerData = travelers[i];
      const seat = availableSeats[i];

      await db.update(seatTable).set({ status: "occupied" }).where(eq(seatTable.id, seat.id));

      await db.insert(travelerTable).values({
        name: travelerData.name,
        email: travelerData.email,
        phoneNumber: travelerData.phoneNumber,
        dateOfBirth: new Date(travelerData.dateOfBirth),
        orderId: order.id,
        seatId: seat.id,
      });
    }

    const completeOrder = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, order.id),
      with: {
        customer: true,
        travelSession: {
          with: {
            guide: true,
          },
        },
        payment: true,
        travelers: {
          with: {
            seat: {
              with: {
                seatCost: true,
              },
            },
          },
        },
      },
    });

    return {
      order: completeOrder as any,
      success: true,
      message: "Захиалга амжилттай үүсгэгдлээ",
    };
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(`Захиалга үүсгэхэд алдаа гарлаа: ${error.message}`);
  }
};
