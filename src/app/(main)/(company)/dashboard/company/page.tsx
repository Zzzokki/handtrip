"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetTravelsByCompanyQuery, useGetOrdersByCompanyQuery } from "@/types/generated";
import { Plane, ShoppingBag, Users, DollarSign, Calendar, MapPin, Clock, TrendingUp, Package } from "lucide-react";
import { StatCard, WelcomeHeader } from "./_components";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "text-yellow-600 bg-yellow-50" },
  1: { label: "Баталгаажсан", color: "text-green-600 bg-green-50" },
  2: { label: "Цуцалсан", color: "text-red-600 bg-red-50" },
};

const CompanyDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: travelsData, loading: travelsLoading } = useGetTravelsByCompanyQuery({
    variables: { input: { page: 1, limit: 100 } },
    skip: !user?.id,
  });

  const { data: ordersData, loading: ordersLoading } = useGetOrdersByCompanyQuery({
    variables: { companyId: typeof user?.id === "string" ? parseInt(user.id) : user?.id || 0 },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || travelsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const travels = travelsData?.getTravelsByCompany?.travels || [];
  const orders = ordersData?.getOrdersByCompany || [];

  const totalBookings = orders.reduce((sum, order) => sum + order.totalSeats, 0);
  const totalRevenue = orders.filter((o) => o.orderStatus === 1).reduce((sum, order) => sum + order.totalPrice, 0);
  const confirmedOrders = orders.filter((o) => o.orderStatus === 1).length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <WelcomeHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-500 rounded-lg shadow-md">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{travels.length}</p>
            <p className="text-xs font-semibold text-blue-700">Аяллын багц</p>
            <p className="text-xs text-gray-600">Идэвхтэй багцууд</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-500 rounded-lg shadow-md">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            <p className="text-xs font-semibold text-purple-700">Нийт захиалга</p>
            <p className="text-xs text-gray-600">{confirmedOrders} баталгаажсан</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-500 rounded-lg shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            <p className="text-xs font-semibold text-emerald-700">Нийт суудал</p>
            <p className="text-xs text-gray-600">Захиалагдсан</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-amber-500 rounded-lg shadow-md">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs font-semibold text-amber-700">Нийт орлого</p>
            <p className="text-xs text-gray-600">Баталгаажсан</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-lg font-bold text-gray-900">Сүүлийн захиалгууд</h2>
          <p className="text-sm text-gray-600 mt-0.5">Таны сүүлийн 5 захиалга</p>
        </div>

        {recentOrders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/manager/orders/${order.id}`)}
                className="p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{order.travelSession.travel.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS].color}`}>
                        {ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS].label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>
                          {order.customer.firstName} {order.customer.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-600" />
                        <span>{order.travelSession.travel.destination.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-green-600" />
                        <span>{new Date(order.travelSession.startDate).toLocaleDateString("mn-MN")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>Захиалсан {new Date(order.createdAt).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-gray-900">${order.totalPrice.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{order.totalSeats} суудал</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Захиалга байхгүй байна</p>
            <p className="text-sm text-gray-500 mt-1">Таны эхний захиалга энд харагдана</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
