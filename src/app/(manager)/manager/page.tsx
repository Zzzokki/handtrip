"use client";

import { Building2, ShoppingBag, Users, Plane, DollarSign, Plus } from "lucide-react";
import { ManagerHeader, StatCard, QuickActionCard } from "./_components";

export default function ManagerDashboard() {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <ManagerHeader />

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard title="Нийт компани" value="523" subtitle="Бүртгэлтэй компаниуд" icon={Building2} color="indigo" trend={{ value: 8, isPositive: true }} />
        <StatCard title="Нийт захиалга" value="12,341" subtitle="Бүх захиалгууд" icon={ShoppingBag} color="emerald" trend={{ value: 15, isPositive: true }} />
        <StatCard title="Нийт хэрэглэгч" value="10,245" subtitle="Бүртгэлтэй хэрэглэгчид" icon={Users} color="blue" trend={{ value: 12, isPositive: true }} />
        <StatCard title="Нийт орлого" value="$2.5M" subtitle="Платформын орлого" icon={DollarSign} color="purple" trend={{ value: 18, isPositive: true }} />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <StatCard title="Идэвхтэй аяллууд" value="1,234" subtitle="Идэвхжиж буй" icon={Plane} color="amber" />
        <StatCard title="Шинэ захиалга" value="89" subtitle="Өнөөдөр" icon={ShoppingBag} color="emerald" />
        <StatCard title="Батлах хүлээлттэй" value="23" subtitle="Компанийн хүсэлт" icon={Building2} color="red" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Үндсэн үйлдлүүд</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard title="Компаниуд" description="Бүх компаниудыг харах болон удирдах" icon={Building2} href="/manager/companies" color="indigo" />
          <QuickActionCard title="Захиалгууд" description="Бүх захиалгуудыг харах болон удирдах" icon={ShoppingBag} href="/manager/orders" color="emerald" />
          <QuickActionCard title="Хэрэглэгчид" description="Бүх хэрэглэгчдийг харах болон удирдах" icon={Users} href="/manager/users" color="blue" />
          <QuickActionCard title="Компани үүсгэх" description="Шинэ компани бүртгэх" icon={Plus} href="/manager/companies/create" color="amber" />
        </div>
      </div>
    </div>
  );
}
