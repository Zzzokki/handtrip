"use client";

import { Shield, LayoutDashboard, Users, Building2, ShoppingCart, Plane } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/admin",
    label: "Самбар",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/users",
    label: "Хэрэглэгчид",
    icon: Users,
  },
  {
    href: "/admin/companies",
    label: "Компаниуд",
    icon: Building2,
  },
  {
    href: "/admin/orders",
    label: "Захиалгууд",
    icon: ShoppingCart,
  },
  {
    href: "/admin/travels",
    label: "Аяллууд",
    icon: Plane,
  },
];

export const AdminHeader = () => {
  const pathname = usePathname();

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Админ самбар</h1>
          <p className="text-slate-600">Системийн төлөв байдал болон статистик</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-2 border-b pb-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
