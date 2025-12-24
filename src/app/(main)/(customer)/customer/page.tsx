"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetOrdersByCustomerQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Eye, CheckCircle, Clock, XCircle, Plane } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-green-100 text-green-800", icon: CheckCircle },
  2: { label: "Цуцалсан", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function CustomerOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useGetOrdersByCustomerQuery({
    variables: { customerId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "customer")) {
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const orders = data?.getOrdersByCustomer || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Миний Захиалгууд</h1>
              <p className="text-sm text-gray-600 mt-1">Аялалын захиалгуудаа удирдах</p>
            </div>
            <Link href="/travels">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plane className="w-4 h-4 mr-2" />
                Шинэ захиалга
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-blue-700">Нийт захиалга</CardDescription>
                  <CardTitle className="text-2xl font-bold text-blue-900 mt-1">{orders.length}</CardTitle>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-green-700">Баталгаажсан</CardDescription>
                  <CardTitle className="text-2xl font-bold text-green-900 mt-1">{orders.filter((o) => o.orderStatus === 1).length}</CardTitle>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-purple-700">Нийт зарцуулсан</CardDescription>
                  <CardTitle className="text-2xl font-bold text-purple-900 mt-1">${orders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}</CardTitle>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => {
              const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-4 relative">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Plane className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-bold text-gray-900">Захиалга #{order.id}</h3>
                              <div className="flex items-center gap-1.5">
                                <Badge className={`${status.color} text-xs px-2 py-0.5`}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {status.label}
                                </Badge>
                                {order.payment.isPaid ? (
                                  <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">Төлсөн</Badge>
                                ) : (
                                  <Badge className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5">Төлөөгүй</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                            <span className="font-medium">
                              {new Date(order.travelSession.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                              {new Date(order.travelSession.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Users className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="font-medium">{order.travelers.length} аялагч</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <DollarSign className="w-3.5 h-3.5 text-green-600" />
                            <span className="font-medium">
                              ${order.totalPrice.toLocaleString()} • {order.totalSeats} суудал
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Clock className="w-3.5 h-3.5 text-purple-600" />
                            <span className="font-medium">Захиалсан {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                        <Link href={`/orders/${order.id}`} className="flex-1 lg:flex-none">
                          <Button variant="outline" className="w-full h-9 text-sm border-2 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all group/btn">
                            <Eye className="w-3.5 h-3.5 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Дэлгэрэнгүй
                          </Button>
                        </Link>
                        {order.orderStatus === 0 && !order.payment.isPaid && (
                          <Button className="flex-1 lg:flex-none w-full h-9 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">Төлбөр төлөх</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl mb-2">Захиалга байхгүй байна</CardTitle>
              <CardDescription className="text-sm mb-6">Анхны аялалаа эхлүүлээрэй</CardDescription>
              <Link href="/travels">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-10">
                  <Plane className="w-4 h-4 mr-2" />
                  Аялал үзэх
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
