"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetOrdersByCompanyQuery } from "@/types/generated";
import { OrdersHeader, OrderStats, OrdersTable, EmptyState, LoadingSkeleton } from "./_components";

export default function CompanyOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const { data, loading } = useGetOrdersByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const { orders, stats } = useMemo(() => {
    const orders = data?.getOrdersByCompany || [];
    const stats = {
      totalOrders: orders.length,
      confirmedOrders: orders.filter((o) => o.orderStatus === 1).length,
      pendingOrders: orders.filter((o) => o.orderStatus === 0).length,
      totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0),
    };
    return { orders, stats };
  }, [data]);

  if (isLoading || loading) return <LoadingSkeleton />;

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto py-6 w-full">
      <OrdersHeader totalOrders={stats.totalOrders} />

      <OrderStats totalOrders={stats.totalOrders} confirmedOrders={stats.confirmedOrders} pendingOrders={stats.pendingOrders} totalRevenue={stats.totalRevenue} />

      {orders.length > 0 ? <OrdersTable orders={orders} /> : <EmptyState />}
    </div>
  );
}
