import { QueryResolvers } from "@/api/types";
import { db, companyTable, orderTable, customerTable } from "@/database";
import { count, eq } from "drizzle-orm";

export const getAdminStats: QueryResolvers["getAdminStats"] = async () => {
  const [{ totalUsers }] = await db.select({ totalUsers: count() }).from(customerTable);

  const [{ verifiedCompanies }] = await db.select({ verifiedCompanies: count() }).from(companyTable);

  const orders = await db.query.orderTable.findMany({
    with: {
      payment: true,
    },
  });

  const totalRevenue = orders.filter((order) => order.payment.isPaid).reduce((sum, order) => sum + order.totalPrice, 0);

  const [{ activeOrders }] = await db.select({ activeOrders: count() }).from(orderTable).where(eq(orderTable.orderStatus, 1));

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayOrdersData = await db.query.orderTable.findMany({
    where: (table, { and, gte, lte }) => and(gte(table.createdAt, startOfDay), lte(table.createdAt, endOfDay)),
    with: {
      payment: true,
    },
  });

  const todayOrders = todayOrdersData.length;
  const todayRevenue = todayOrdersData.filter((order) => order.payment.isPaid).reduce((sum, order) => sum + order.totalPrice, 0);
  return {
    totalUsers,
    verifiedCompanies,
    totalRevenue,
    activeOrders,
    todayRevenue,
    todayOrders,
    pendingCompanies: 0,
  };
};
