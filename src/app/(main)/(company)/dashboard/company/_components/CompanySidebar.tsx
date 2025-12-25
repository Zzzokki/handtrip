"use client";

import { useAuth } from "@/components";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Building2, Home, HomeIcon, LogOut, Plane, Settings, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Хянах самбар",
    url: "/dashboard/company",
    icon: Home,
  },
  {
    title: "Аялалууд",
    url: "/dashboard/company/travels",
    icon: Plane,
  },
  {
    title: "Захиалгууд",
    url: "/dashboard/company/orders",
    icon: Ticket,
  },
  {
    title: "Хөтчүүд",
    url: "/dashboard/company/guides",
    icon: Users,
  },
];

export const CompanySidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar className="w-[320px]">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Компанийн бүртгэл</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Үндсэн цэс</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={cn(isActive && "bg-blue-50 text-blue-600")}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Бусад</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn(pathname === "/dashboard/company/settings" && "bg-blue-50 text-blue-600")}>
                  <Link href="/dashboard/company/settings">
                    <Settings />
                    Тохиргоо
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <HomeIcon />
                    Нүүр хуудас руу буцах
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="text-red-600 hover:bg-red-50">
                  <LogOut /> Гарах
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
