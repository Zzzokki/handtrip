"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetTravelsByCompanyQuery, useGetOrdersByCompanyQuery } from "@/types/generated";
import { Plane, ShoppingBag, Users, DollarSign, TrendingUp, Package } from "lucide-react";
import { WelcomeHeader, RecentOrders } from "./_components";

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

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <WelcomeHeader />

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
            <p className="text-2xl font-bold text-gray-900">₮{totalRevenue.toLocaleString()}</p>
            <p className="text-xs font-semibold text-amber-700">Нийт орлого</p>
            <p className="text-xs text-gray-600">Баталгаажсан</p>
          </div>
        </div>
      </div>

      <RecentOrders orders={orders} />
    </div>
  );
};

export default CompanyDashboard;
