"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetTravelsByCompanyQuery, useGetOrdersByCompanyQuery } from "@/types/generated";
import { Plane, ShoppingBag, Users, DollarSign, Plus } from "lucide-react";
import { CompanyDashboardHeader, StatCard, QuickActionCard, RecentOrders, WelcomeHeader } from "./_components";

const CompanyDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: travelsData, loading: travelsLoading } = useGetTravelsByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  const { data: ordersData, loading: ordersLoading } = useGetOrdersByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || travelsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const travels = travelsData?.getTravelsByCompany || [];
  const orders = ordersData?.getOrdersByCompany || [];
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalBookings = orders.reduce((sum, order) => sum + order.totalSeats, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <CompanyDashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <WelcomeHeader userName={user.name || "Хэрэглэгч"} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          <StatCard title="Аяллын багцууд" value={travels.length.toString()} subtitle="Идэвхтэй багцууд" icon={Plane} color="blue" />
          <StatCard title="Нийт захиалга" value={orders.length.toString()} subtitle="Нийт захиалгууд" icon={ShoppingBag} color="purple" />
          <StatCard title="Нийт сууриуд" value={totalBookings.toString()} subtitle="Захиалагдсан сууриуд" icon={Users} color="emerald" />
          <StatCard title="Орлого" value={`$${totalRevenue.toLocaleString()}`} subtitle="Нийт орлого" icon={DollarSign} color="amber" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          <QuickActionCard
            title="Аяллын багцууд"
            description="Аяллын багцуудаа удирдах, шинээр үүсгэх"
            primaryAction={{
              label: "Шинэ аялал үүсгэх",
              href: "/dashboard/company/travels/create",
              icon: Plus,
            }}
            secondaryAction={{
              label: "Бүх аяллууд үзэх",
              href: "/dashboard/company/travels",
            }}
            gradient="from-blue-500 to-cyan-500"
            iconBg="from-blue-500 to-cyan-600"
          />
          <QuickActionCard
            title="Аялалын хөтөч"
            description="Хөтчүүдээ удирдах, томилох"
            primaryAction={{
              label: "Шинэ хөтөч нэмэх",
              href: "/dashboard/company/guides/create",
              icon: Plus,
            }}
            secondaryAction={{
              label: "Бүх хөтчүүд үзэх",
              href: "/dashboard/company/guides",
            }}
            gradient="from-purple-500 to-pink-500"
            iconBg="from-purple-500 to-pink-600"
          />
          <QuickActionCard
            title="Захиалгууд"
            description="Захиалгуудыг харах, удирдах"
            secondaryAction={{
              label: "Бүх захиалгууд үзэх",
              href: "/dashboard/company/orders",
            }}
            gradient="from-emerald-500 to-teal-500"
            iconBg="from-emerald-500 to-teal-600"
          />
        </div>

        <RecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default CompanyDashboard;
