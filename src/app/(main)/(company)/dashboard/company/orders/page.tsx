"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetOrdersByCompanyQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, DollarSign, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  1: { label: "Confirmed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  2: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function CompanyOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useGetOrdersByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const orders = data?.getOrdersByCompany || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-600">View and manage all bookings for your travel packages</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-3xl">{orders.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Confirmed</CardDescription>
              <CardTitle className="text-3xl">{orders.filter((o) => o.orderStatus === 1).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl">{orders.filter((o) => o.orderStatus === 0).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">${orders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          {order.payment.isPaid && <Badge className="bg-blue-100 text-blue-800">Paid</Badge>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>
                              {order.customer.firstName} {order.customer.lastName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(order.travelSession.startDate).toLocaleDateString()} - {new Date(order.travelSession.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>
                              ${order.totalPrice.toLocaleString()} ({order.totalSeats} {order.totalSeats === 1 ? "seat" : "seats"})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{order.travelers.length} travelers</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">Booked on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>No Orders Yet</CardTitle>
              <CardDescription>Orders will appear here when customers book your travel packages</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
