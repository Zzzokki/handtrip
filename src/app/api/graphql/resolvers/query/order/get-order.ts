import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

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

  return order;
};
