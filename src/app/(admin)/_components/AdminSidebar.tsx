"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Building2, MapPin, ShoppingCart, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Хянах самбар",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Хэрэглэгчид",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Компаниуд",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    name: "Аяллууд",
    href: "/admin/travels",
    icon: MapPin,
  },
  {
    name: "Захиалгууд",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">HandTrip</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          <span>Гарах</span>
        </Button>
      </div>
    </aside>
  );
}
