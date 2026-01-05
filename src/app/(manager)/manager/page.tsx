"use client";

import { Building2, ShoppingBag, Users, Plane, DollarSign, Plus } from "lucide-react";
import { StatCard, QuickActionCard } from "./_components";
import { useGetManagerStatsQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerDashboard() {
  const { data, loading } = useGetManagerStatsQuery();

  const stats = data?.getManagerStats;

  if (loading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Хянах самбар</h1>
          <p className="text-sm text-gray-500">Платформын ерөнхий мэдээлэл</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Хянах самбар</h1>
        <p className="text-sm text-gray-500">Платформын ерөнхий мэдээлэл</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Нийт компани" value={stats?.totalCompanies || 0} subtitle="Бүртгэлтэй компаниуд" icon={Building2} color="blue" />
        <StatCard title="Нийт захиалга" value={stats?.totalOrders || 0} subtitle="Бүх захиалгууд" icon={ShoppingBag} color="green" />
        <StatCard title="Нийт хэрэглэгч" value={stats?.totalUsers || 0} subtitle="Бүртгэлтэй хэрэглэгчид" icon={Users} color="purple" />
        <StatCard title="Нийт орлого" value={`₮${stats?.totalRevenue.toLocaleString() || 0}`} subtitle="Платформын орлого" icon={DollarSign} color="yellow" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Идэвхтэй аяллууд" value={stats?.activeTravels || 0} subtitle="Идэвхжиж буй" icon={Plane} color="blue" />
        <StatCard title="Шинэ захиалга" value={stats?.todayOrders || 0} subtitle="Өнөөдөр" icon={ShoppingBag} color="green" />
        <StatCard title="Батлах хүлээлттэй" value={stats?.pendingCompanies || 0} subtitle="Компанийн хүсэлт" icon={Building2} color="red" />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Үндсэн үйлдлүүд</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <QuickActionCard title="Компаниуд" description="Бүх компаниудыг харах болон удирдах" icon={Building2} href="/manager/companies" color="blue" />
          <QuickActionCard title="Захиалгууд" description="Бүх захиалгуудыг харах болон удирдах" icon={ShoppingBag} href="/manager/orders" color="green" />
          <QuickActionCard title="Хэрэглэгчид" description="Бүх хэрэглэгчдийг харах болон удирдах" icon={Users} href="/manager/users" color="purple" />
          <QuickActionCard title="Компани үүсгэх" description="Шинэ компани бүртгэх" icon={Plus} href="/manager/companies/create" color="yellow" />
        </div>
      </div>
    </div>
  );
}
