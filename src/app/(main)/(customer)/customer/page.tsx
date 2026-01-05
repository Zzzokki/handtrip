"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetOrdersByCustomerQuery } from "@/types/generated";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { OrderStatsCards, OrderList, OrderPagination, EmptyOrdersState, OrderFilters } from "./_components";

const ITEMS_PER_PAGE = 10;

export default function CustomerOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const { data, loading } = useGetOrdersByCustomerQuery({
    variables: { customerId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "customer")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const allOrders = data?.getOrdersByCustomer || [];

  const filteredOrders = useMemo(() => {
    let filtered = [...allOrders];

    if (searchQuery) {
      filtered = filtered.filter((order) => order.id.toString().includes(searchQuery));
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.orderStatus === parseInt(statusFilter));
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter((order) => (paymentFilter === "paid" ? order.payment.isPaid : !order.payment.isPaid));
    }

    return filtered;
  }, [allOrders, searchQuery, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const confirmedOrders = allOrders.filter((o) => o.orderStatus === 1).length;
  const totalSpent = allOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || paymentFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-white py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Миний Захиалгууд</h1>
              <p className="text-sm text-gray-500 mt-0.5">Аялалын захиалгуудаа удирдах</p>
            </div>
            <Link href="/travels">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plane className="w-3.5 h-3.5 mr-1.5" />
                Шинэ захиалга
              </Button>
            </Link>
          </div>
        </div>

        <OrderStatsCards totalOrders={allOrders.length} confirmedOrders={confirmedOrders} totalSpent={totalSpent} />

        <OrderFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onPaymentChange={setPaymentFilter}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {filteredOrders.length > 0 ? (
          <>
            <OrderList orders={paginatedOrders} />
            <OrderPagination currentPage={currentPage} totalPages={totalPages} totalOrders={filteredOrders.length} onPageChange={setCurrentPage} />
          </>
        ) : hasActiveFilters ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">Хайлтын үр дүн олдсонгүй</p>
            <Button variant="link" onClick={handleClearFilters} className="mt-2 text-blue-600 text-sm">
              Шүүлтүүрийг цэвэрлэх
            </Button>
          </div>
        ) : (
          <EmptyOrdersState />
        )}
      </div>
    </div>
  );
}
