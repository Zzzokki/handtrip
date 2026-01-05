"use client";

import { useAuth } from "@/components";
import { Separator } from "@/components/ui/separator";
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
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar className="w-[320px]">
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 p-2 hover:bg-slate-50 transition-colors rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</span>
        </Link>

        <Separator />

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
