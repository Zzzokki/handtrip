import { MutationResolvers } from "@/api/types";
import { db, orderTable, paymentTable, travelerTable, seatTable, travelSessionTable } from "@/database";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

export const createOrder: MutationResolvers["createOrder"] = async (_, { input }, context) => {
  const { user } = context;

  if (!user || user.role !== "customer") {
    throw new Error("Unauthorized: Only customers can create orders");
  }

  const { travelSessionId, travelers, paymentIntentId } = input;

  try {
    // 1. Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment not completed. Please complete the payment first.");
    }

    // 2. Get travel session details
    const travelSession = await db.query.travelSessionTable.findFirst({
      where: eq(travelSessionTable.id, travelSessionId),
      with: {
        travel: true,
      },
    });

    if (!travelSession) {
      throw new Error("Travel session not found");
    }

    // 3. Check available seats
    const existingSeats = await db.query.seatTable.findMany({
      where: eq(seatTable.travelSessionId, travelSessionId),
    });

    const availableSeats = existingSeats.filter((seat) => seat.status === "AVAILABLE");

    if (availableSeats.length < travelers.length) {
      throw new Error(`Not enough seats available. Only ${availableSeats.length} seats remaining.`);
    }

    // 4. Calculate total price (convert from cents)
    const totalPrice = paymentIntent.amount;

    // 5. Create payment record
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

    // 6. Create order
    const [order] = await db
      .insert(orderTable)
      .values({
        totalSeats: travelers.length,
        totalPrice,
        orderStatus: 1, // 1 = confirmed
        customerId: user.id,
        travelSessionId,
        paymentId: payment.id,
      })
      .returning();

    // 7. Create travelers and book seats
    for (let i = 0; i < travelers.length; i++) {
      const travelerData = travelers[i];
      const seat = availableSeats[i];

      // Book the seat
      await db.update(seatTable).set({ status: "OCCUPIED" }).where(eq(seatTable.id, seat.id));

      // Create traveler
      await db.insert(travelerTable).values({
        name: travelerData.name,
        email: travelerData.email,
        phoneNumber: travelerData.phoneNumber,
        dateOfBirth: new Date(travelerData.dateOfBirth),
        orderId: order.id,
        seatId: seat.id,
      });
    }

    // 8. Fetch complete order with relations
    const completeOrder = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, order.id),
      with: {
        customer: true,
        travelSession: {
          with: {
            travel: {
              with: {
                destination: true,
                company: true,
              },
            },
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
      message: "Order created successfully",
    };
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(`Failed to create order: ${error.message}`);
  }
};
