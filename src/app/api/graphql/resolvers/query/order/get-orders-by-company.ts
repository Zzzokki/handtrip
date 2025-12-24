import { QueryResolvers } from "@/api/types";
import { db } from "@/database";
import { eq } from "drizzle-orm";

export const getOrdersByCompany: QueryResolvers["getOrdersByCompany"] = async (_, { companyId }) => {
  // Get all orders for travels belonging to this company
  const orders = await db.query.orderTable.findMany({
    with: {
      customer: true,
      payment: true,
      travelSession: {
        with: {
          travel: {
            with: {
              company: true,
            },
          },
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

  // Filter orders where the travel's company matches the companyId
  const companyOrders = orders.filter((order) => order.travelSession.travel.company.id === companyId);

  return companyOrders;
};
