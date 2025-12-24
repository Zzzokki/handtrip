import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getOrders: QueryResolvers["getOrders"] = async () => {
  const orders = await db.query.orderTable.findMany({
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
