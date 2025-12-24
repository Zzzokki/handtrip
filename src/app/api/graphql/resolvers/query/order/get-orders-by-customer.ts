import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getOrdersByCustomer: QueryResolvers["getOrdersByCustomer"] = async (_, { customerId }) => {
  const orders = await db.query.orderTable.findMany({
    where: (order, { eq }) => eq(order.customerId, customerId),
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
