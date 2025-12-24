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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Миний Захиалгууд</h1>
              <p className="text-gray-500 mt-1">Аялалын захиалгуудаа удирдах</p>
            </div>
            <Link href="/travels">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                <Plane className="w-4 h-4 mr-2" />
                Шинэ захиалга
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-white">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">Нийт захиалга</CardDescription>
                  <CardTitle className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</CardTitle>
                </div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 bg-white">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">Баталгаажсан</CardDescription>
                  <CardTitle className="text-3xl font-bold text-gray-900 mt-2">{orders.filter((o) => o.orderStatus === 1).length}</CardTitle>
                </div>
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 bg-white">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">Нийт зарцуулсан</CardDescription>
                  <CardTitle className="text-3xl font-bold text-gray-900 mt-2">₮{orders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}</CardTitle>
                </div>
                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
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
                <Card key={order.id} className="border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 overflow-hidden group bg-white">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <Plane className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">Захиалга #{order.id}</h3>
                              <p className="text-xs text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${status.color} text-xs px-2.5 py-0.5 font-medium`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                            {order.payment.isPaid ? (
                              <Badge className="bg-blue-600 text-white text-xs px-2.5 py-0.5 font-medium">Төлсөн</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs px-2.5 py-0.5 font-medium border-gray-300">
                                Төлөөгүй
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium">
                                {new Date(order.travelSession.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                                {new Date(order.travelSession.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{order.travelers.length} аялагч</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">₮{order.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{order.totalSeats} суудал</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 lg:min-w-[280px] lg:justify-end">
                        <Link href={`/orders/${order.id}`} className="flex-1 lg:flex-initial">
                          <Button variant="outline" size="sm" className="w-full lg:w-auto border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                            <Eye className="w-4 h-4 mr-1.5" />
                            Дэлгэрэнгүй
                          </Button>
                        </Link>
                        {order.orderStatus === 0 && !order.payment.isPaid && (
                          <Button size="sm" className="flex-1 lg:flex-initial bg-green-600 hover:bg-green-700">
                            <DollarSign className="w-4 h-4 mr-1.5" />
                            Төлбөр төлөх
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="max-w-md mx-auto border border-gray-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold mb-2">Захиалга байхгүй байна</CardTitle>
              <CardDescription className="text-sm mb-6">Анхны аялалаа эхлүүлээрэй</CardDescription>
              <Link href="/travels">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
