"use client";

import { Users, Building2, DollarSign, Calendar, TrendingUp, Activity } from "lucide-react";
import { AdminHeader, StatCard, RecentActivity, SystemStatus, RecentUsers } from "./_components";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <AdminHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard title="Нийт хэрэглэгч" value="10,245" subtitle="Идэвхтэй хэрэглэгчид" icon={Users} color="blue" trend={{ value: 12, isPositive: true }} />
        <StatCard title="Компаниуд" value="523" subtitle="Баталгаажсан компани" icon={Building2} color="emerald" trend={{ value: 8, isPositive: true }} />
        <StatCard title="Нийт орлого" value="$1.2M" subtitle="Сүүлийн сард" icon={DollarSign} color="purple" trend={{ value: 15, isPositive: true }} />
        <StatCard title="Идэвхтэй захиалга" value="2,341" subtitle="Баталгаажсан захиалгууд" icon={Calendar} color="amber" trend={{ value: 10, isPositive: true }} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <StatCard title="Өнөөдрийн орлого" value="$45,230" subtitle="24 цагийн турш" icon={TrendingUp} color="indigo" />
        <StatCard title="Шинэ захиалга" value="156" subtitle="Өнөөдөр" icon={Activity} color="red" />
        <StatCard title="Баталгаажуулах хүлээлттэй" value="23" subtitle="Компанийн хүсэлт" icon={Building2} color="amber" />
      </div>

      {/* Recent Activity & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentActivity />
        <RecentUsers />
      </div>

      {/* System Status */}
      <SystemStatus />
    </div>
  );
}
