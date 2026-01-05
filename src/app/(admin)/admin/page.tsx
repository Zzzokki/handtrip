"use client";

import { Users, Building2, DollarSign, Calendar, TrendingUp, Activity } from "lucide-react";
import { StatCard, RecentActivity, SystemStatus, RecentUsers } from "./_components";
import { useGetAdminStatsQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data, loading } = useGetAdminStatsQuery();

  const stats = data?.getAdminStats;

  if (loading) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your platform</p>
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
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Нийт хэрэглэгч" value={stats?.totalUsers || 0} subtitle="Идэвхтэй хэрэглэгчид" icon={Users} color="blue" />
        <StatCard title="Компаниуд" value={stats?.verifiedCompanies || 0} subtitle="Баталгаажсан компани" icon={Building2} color="green" />
        <StatCard title="Нийт орлого" value={`₮${stats?.totalRevenue.toLocaleString() || 0}`} subtitle="Нийт платформ" icon={DollarSign} color="purple" />
        <StatCard title="Идэвхтэй захиалга" value={stats?.activeOrders || 0} subtitle="Баталгаажсан захиалгууд" icon={Calendar} color="yellow" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Өнөөдрийн орлого" value={`₮${stats?.todayRevenue.toLocaleString() || 0}`} subtitle="24 цагийн турш" icon={TrendingUp} color="blue" />
        <StatCard title="Шинэ захиалга" value={stats?.todayOrders || 0} subtitle="Өнөөдөр" icon={Activity} color="red" />
        <StatCard title="Баталгаажуулах хүлээлттэй" value={stats?.pendingCompanies || 0} subtitle="Компанийн хүсэлт" icon={Building2} color="yellow" />
      </div>

      {/* Recent Activity & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <RecentUsers />
      </div>
    </div>
  );
}
