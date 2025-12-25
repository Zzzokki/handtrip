import { QueryResolvers } from "@/api/types";
import { db } from "@/database";

export const getOrdersByCompany: QueryResolvers["getOrdersByCompany"] = async (_, { companyId }) => {
  const travels = await db.query.travelTable.findMany({
    where: (table, { eq }) => eq(table.companyId, companyId),
  });

  const travelIds = travels.map((travel) => travel.id);

  console.log("Travel IDs:", travelIds);

  const travelSessions = await db.query.travelSessionTable.findMany({
    where: (table, { inArray }) => inArray(table.travelId, travelIds),
  });

  const travelSessionIds = travelSessions.map((session) => session.id);

  console.log("Travel Session IDs:", travelSessionIds);

  const orders = await db.query.orderTable.findMany({
    where: (table, { inArray }) => inArray(table.travelSessionId, travelSessionIds),
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

  return orders;
};
