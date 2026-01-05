import { db, orderTable, paymentTable } from "@/app/api/graphql/database";
import { MutationResolvers } from "@/app/api/graphql/types/generated/types.generated";
import { eq } from "drizzle-orm";

export const updateOrderPayment: MutationResolvers["updateOrderPayment"] = async (_, { orderId, paymentIntentId }, context) => {
  try {
    const user = context.user;

    if (!user) {
      return {
        success: false,
        message: "Нэвтрээгүй байна",
        order: null!,
      };
    }

    // Get the order
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
      with: {
        payment: true,
        travelSession: {
          with: {
            travel: true,
            guide: true,
          },
        },
        travelers: true,
      },
    });

    if (!order) {
      return {
        success: false,
        message: "Захиалга олдсонгүй",
        order: null!,
      };
    }

    // Check if user owns this order (for customers)
    if (user.role === "customer" && order.customerId !== user.id) {
      return {
        success: false,
        message: "Танд энэ захиалгыг засах эрх байхгүй",
        order: null!,
      };
    }

    // Update payment
    await db
      .update(paymentTable)
      .set({
        stripePaymentIntentId: paymentIntentId,
        isPaid: true,
        paidAt: new Date(),
      })
      .where(eq(paymentTable.id, order.paymentId));

    // Update order status to confirmed if payment is successful
    await db
      .update(orderTable)
      .set({
        orderStatus: 1, // Confirmed
      })
      .where(eq(orderTable.id, orderId));

    // Fetch updated order
    const updatedOrder = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
      with: {
        payment: true,
        travelSession: {
          with: {
            travel: true,
            guide: true,
          },
        },
        travelers: true,
      },
    });

    return {
      success: true,
      message: "Төлбөр амжилттай шинэчлэгдлээ",
      order: updatedOrder as any,
    };
  } catch (error) {
    console.error("Error updating order payment:", error);
    return {
      success: false,
      message: "Төлбөр шинэчлэхэд алдаа гарлаа",
      order: null!,
    };
  }
};
