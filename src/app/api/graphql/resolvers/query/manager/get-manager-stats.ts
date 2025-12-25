import { QueryResolvers } from "@/api/types";
import { db, companyTable, orderTable, customerTable, travelTable, travelSessionTable } from "@/database";
import { count, gte, lte, eq, and } from "drizzle-orm";

export const getManagerStats: QueryResolvers["getManagerStats"] = async () => {
  // Get total companies
  const [{ totalCompanies }] = await db.select({ totalCompanies: count() }).from(companyTable);

  // Get total orders
  const [{ totalOrders }] = await db.select({ totalOrders: count() }).from(orderTable);

  // Get total users (customers)
  const [{ totalUsers }] = await db.select({ totalUsers: count() }).from(customerTable);

  // Get total revenue from paid orders
  const orders = await db.query.orderTable.findMany({
    with: {
      payment: true,
    },
  });

  const totalRevenue = orders.filter((order) => order.payment.isPaid).reduce((sum, order) => sum + order.totalPrice, 0);

  // Get active travels (those with future sessions)
  const today = new Date();
  const activeTravelSessions = await db.query.travelSessionTable.findMany({
    where: (table) => gte(table.startDate, today),
  });

  const uniqueTravelIds = new Set(activeTravelSessions.map((session) => session.travelId));
  const activeTravels = uniqueTravelIds.size;

  // Get today's orders
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [{ todayOrders }] = await db
    .select({ todayOrders: count() })
    .from(orderTable)
    .where(and(gte(orderTable.createdAt, startOfDay), lte(orderTable.createdAt, endOfDay)));

  return {
    totalCompanies,
    totalOrders,
    totalUsers,
    totalRevenue,
    activeTravels,
    todayOrders,
    pendingCompanies: 0,
  };
};
