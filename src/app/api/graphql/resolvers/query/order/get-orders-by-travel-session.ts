import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getOrdersByTravelSession: QueryResolvers["getOrdersByTravelSession"] = async (_, { travelSessionId }) => {
  const orders = await db.query.orderTable.findMany({
    where: (order, { eq }) => eq(order.travelSessionId, travelSessionId),
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

  return orders;
};
