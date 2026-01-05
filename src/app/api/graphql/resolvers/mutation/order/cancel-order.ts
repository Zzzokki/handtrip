import { db, orderTable, seatTable } from "@/app/api/graphql/database";
import { MutationResolvers } from "@/app/api/graphql/types/generated/types.generated";
import { eq, inArray } from "drizzle-orm";

export const cancelOrder: MutationResolvers["cancelOrder"] = async (_, { orderId }, context) => {
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
        customer: true,
        payment: true,
        travelSession: {
          with: {
            guide: true,
            seats: {
              with: {
                seatCost: true,
              },
            },
          },
        },
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

    if (!order) {
      return {
        success: false,
        message: "Захиалга олдсонгүй",
        order: null!,
      };
    }

    // Check permissions
    // Customers can only cancel their own orders
    // Managers and admins can cancel any order
    if (user.role === "customer" && order.customerId !== user.id) {
      return {
        success: false,
        message: "Танд энэ захиалгыг цуцлах эрх байхгүй",
        order: null!,
      };
    }

    // Cannot cancel already paid orders
    if (order.payment.isPaid) {
      return {
        success: false,
        message: "Төлбөр төлөгдсөн захиалгыг цуцлах боломжгүй",
        order: null!,
      };
    }

    // Cannot cancel already cancelled orders
    if (order.orderStatus === 2) {
      return {
        success: false,
        message: "Энэ захиалга аль хэдийн цуцлагдсан байна",
        order: null!,
      };
    }

    // Release seats back to available
    const seatIds = order.travelers.map((traveler) => traveler.seat.id);
    if (seatIds.length > 0) {
      await db.update(seatTable).set({ status: "available" }).where(inArray(seatTable.id, seatIds));
    }

    // Update order status to cancelled (2)
    await db
      .update(orderTable)
      .set({
        orderStatus: 2, // Cancelled
      })
      .where(eq(orderTable.id, orderId));

    // Fetch updated order
    const updatedOrder = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
      with: {
        customer: true,
        payment: true,
        travelSession: {
          with: {
            guide: true,
            seats: {
              with: {
                seatCost: true,
              },
            },
          },
        },
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
      success: true,
      message: "Захиалга цуцлагдлаа",
      order: updatedOrder!,
    };
  } catch (error: any) {
    console.error("Cancel order error:", error);
    return {
      success: false,
      message: error.message || "Захиалга цуцлахад алдаа гарлаа",
      order: null!,
    };
  }
};
