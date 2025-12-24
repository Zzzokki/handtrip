import { builder } from "../builder";

export const ManagerStats = builder
  .objectRef<{
    totalCompanies: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
    activeTravels: number;
    todayOrders: number;
    pendingCompanies: number;
  }>("ManagerStats")
  .implement({
    fields: (t) => ({
      totalCompanies: t.exposeInt("totalCompanies"),
      totalOrders: t.exposeInt("totalOrders"),
      totalUsers: t.exposeInt("totalUsers"),
      totalRevenue: t.exposeFloat("totalRevenue"),
      activeTravels: t.exposeInt("activeTravels"),
      todayOrders: t.exposeInt("todayOrders"),
      pendingCompanies: t.exposeInt("pendingCompanies"),
    }),
  });
