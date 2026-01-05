import { QueryResolvers } from "@/api/types";
import { db, orderTable, seatTable } from "@/database";
import { eq, inArray } from "drizzle-orm";

export const getOrder: QueryResolvers["getOrder"] = async (_, { id }) => {
  const order = await db.query.orderTable.findFirst({
    where: (order, { eq }) => eq(order.id, id),
    with: {
      customer: true,
      payment: true,
      travelSession: {
        with: {
          travel: true,
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

  if (!order) throw new Error("Order not found");

  // Auto-cancel unpaid orders older than 1 hour
  if (order.orderStatus === 0 && !order.payment.isPaid) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const orderCreatedAt = new Date(order.createdAt);

    if (orderCreatedAt < oneHourAgo) {
      // Release seats back to available
      const seatIds = order.travelers.map((t) => t.seat.id);
      if (seatIds.length > 0) {
        await db.update(seatTable).set({ status: "available" }).where(inArray(seatTable.id, seatIds));
      }

      // Cancel the order
      await db.update(orderTable).set({ orderStatus: 2 }).where(eq(orderTable.id, order.id));

      // Fetch updated order
      const updatedOrder = await db.query.orderTable.findFirst({
        where: (order, { eq }) => eq(order.id, id),
        with: {
          customer: true,
          payment: true,
          travelSession: {
            with: {
              travel: true,
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

      return updatedOrder!;
    }
  }

  return order;
};
