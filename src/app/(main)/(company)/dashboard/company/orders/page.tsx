"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetOrdersByCompanyQuery } from "@/types/generated";
import { OrdersHeader, OrderStats, OrdersTable, EmptyState, LoadingSkeleton } from "./_components";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function CompanyOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  const { data, loading } = useGetOrdersByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const { orders, stats, filteredOrders } = useMemo(() => {
    const allOrders = data?.getOrdersByCompany || [];
    
    // Calculate stats from all orders
    const stats = {
      totalOrders: allOrders.length,
      confirmedOrders: allOrders.filter((o) => o.orderStatus === 1).length,
      pendingOrders: allOrders.filter((o) => o.orderStatus === 0).length,
      totalRevenue: allOrders.reduce((sum, o) => sum + o.totalPrice, 0),
    };

    // Apply filters
    let filtered = [...allOrders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(query) ||
          order.customer.firstName.toLowerCase().includes(query) ||
          order.customer.lastName.toLowerCase().includes(query) ||
          order.travelers.some((traveler: any) => traveler.name.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.orderStatus.toString() === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      const isPaid = paymentFilter === "paid";
      filtered = filtered.filter((order) => order.payment.isPaid === isPaid);
    }

    return { orders: allOrders, stats, filteredOrders: filtered };
  }, [data, searchQuery, statusFilter, paymentFilter]);

  if (isLoading || loading) return <LoadingSkeleton />;

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto py-6 w-full">
      <OrdersHeader totalOrders={stats.totalOrders} />

      <OrderStats totalOrders={stats.totalOrders} confirmedOrders={stats.confirmedOrders} pendingOrders={stats.pendingOrders} totalRevenue={stats.totalRevenue} />

      {/* Search and Filters */}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ID, үйлчлүүлэгч, аялагчаар хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Төлөв шүүх" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төлөв</SelectItem>
              <SelectItem value="0">Хүлээгдэж буй</SelectItem>
              <SelectItem value="1">Баталгаажсан</SelectItem>
              <SelectItem value="2">Цуцлагдсан</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Төлбөр шүүх" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төлбөр</SelectItem>
              <SelectItem value="paid">Төлсөн</SelectItem>
              <SelectItem value="unpaid">Төлөөгүй</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {filteredOrders.length > 0 ? (
        <>
          <OrdersTable orders={filteredOrders} />
          <div className="mt-4 text-sm text-muted-foreground text-center">
            {filteredOrders.length} захиалга үзүүлж байна
          </div>
        </>
      ) : orders.length > 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Хайлтын илэрц олдсонгүй</p>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
