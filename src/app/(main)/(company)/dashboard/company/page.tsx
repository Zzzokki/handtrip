"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetTravelsByCompanyQuery, useGetOrdersByCompanyQuery } from "@/types/generated";
import { Plane, ShoppingBag, Users, DollarSign } from "lucide-react";
import { StatCard, WelcomeHeader } from "./_components";

const CompanyDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <WelcomeHeader />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
        <StatCard title="Аяллын багцууд" value={travels.length.toString()} subtitle="Идэвхтэй багцууд" icon={Plane} color="blue" />
        <StatCard title="Нийт захиалга" value={orders.length.toString()} subtitle="Нийт захиалгууд" icon={ShoppingBag} color="purple" />
        <StatCard title="Нийт сууриуд" value={totalBookings.toString()} subtitle="Захиалагдсан сууриуд" icon={Users} color="emerald" />
        <StatCard title="Орлого" value={`$${totalRevenue.toLocaleString()}`} subtitle="Нийт орлого" icon={DollarSign} color="amber" />
      </div> */}
    </div>
  );
};

export default CompanyDashboard;
