"use client";

import { Users, Building2, DollarSign, Calendar, TrendingUp, Activity } from "lucide-react";
import { AdminHeader, StatCard, RecentActivity, SystemStatus, RecentUsers } from "./_components";
import { useGetAdminStatsQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data, loading } = useGetAdminStatsQuery();

  const stats = data?.getAdminStats;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-6 w-full">
        <AdminHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 w-full">
      <AdminHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard title="Нийт хэрэглэгч" value={stats?.totalUsers || 0} subtitle="Идэвхтэй хэрэглэгчид" icon={Users} color="blue" />
        <StatCard title="Компаниуд" value={stats?.verifiedCompanies || 0} subtitle="Баталгаажсан компани" icon={Building2} color="green" />
        <StatCard title="Нийт орлого" value={`₮${stats?.totalRevenue.toLocaleString() || 0}`} subtitle="Нийт платформ" icon={DollarSign} color="purple" />
        <StatCard title="Идэвхтэй захиалга" value={stats?.activeOrders || 0} subtitle="Баталгаажсан захиалгууд" icon={Calendar} color="yellow" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <StatCard title="Өнөөдрийн орлого" value={`₮${stats?.todayRevenue.toLocaleString() || 0}`} subtitle="24 цагийн турш" icon={TrendingUp} color="blue" />
        <StatCard title="Шинэ захиалга" value={stats?.todayOrders || 0} subtitle="Өнөөдөр" icon={Activity} color="red" />
        <StatCard title="Баталгаажуулах хүлээлттэй" value={stats?.pendingCompanies || 0} subtitle="Компанийн хүсэлт" icon={Building2} color="yellow" />
      </div>

      {/* Recent Activity & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <RecentActivity />
        <RecentUsers />
      </div>
    </div>
  );
}
