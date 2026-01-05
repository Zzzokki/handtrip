import { db, orderTable, paymentTable } from "@/app/api/graphql/database";
import { MutationResolvers } from "@/app/api/graphql/types/generated/types.generated";
import { eq } from "drizzle-orm";

export const updatePaymentIntent: MutationResolvers["updatePaymentIntent"] = async (_, { orderId, paymentIntentId }, context) => {
  try {
    const user = context.user;

    if (!user) {
      return {
        success: false,
        message: "Нэвтрээгүй байна",
      };
    }

    // Get the order
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
      with: {
        payment: true,
      },
    });

    if (!order) {
      return {
        success: false,
        message: "Захиалга олдсонгүй",
      };
    }

    // Check if user owns this order (for customers)
    if (user.role === "customer" && order.customerId !== user.id) {
      return {
        success: false,
        message: "Танд энэ захиалгыг засах эрх байхгүй",
      };
    }

    // Check if this payment intent is already used by another payment
    const existingPayment = await db.query.paymentTable.findFirst({
      where: eq(paymentTable.stripePaymentIntentId, paymentIntentId),
    });

    if (existingPayment && existingPayment.id !== order.paymentId) {
      return {
        success: false,
        message: "Энэ төлбөрийн мэдээлэл өөр захиалгад ашиглагдсан байна",
      };
    }

    // Update payment with payment intent ID
    await db
      .update(paymentTable)
      .set({
        stripePaymentIntentId: paymentIntentId,
      })
      .where(eq(paymentTable.id, order.paymentId));

    return {
      success: true,
      message: "Төлбөрийн мэдээлэл шинэчлэгдлээ",
    };
  } catch (error) {
    console.error("Error updating payment intent:", error);
    return {
      success: false,
      message: "Төлбөрийн мэдээлэл шинэчлэхэд алдаа гарлаа",
    };
  }
};
