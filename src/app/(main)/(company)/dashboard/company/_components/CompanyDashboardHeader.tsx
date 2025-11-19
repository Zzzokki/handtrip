"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { LogOut, Building2 } from "lucide-react";

export const CompanyDashboardHeader = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
              <p className="text-sm text-slate-600">Компанийн бүртгэл</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Гарах</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
