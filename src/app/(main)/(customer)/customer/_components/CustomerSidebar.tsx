"use client";

import { useAuth } from "@/components";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useGetCustomerQuery } from "@/types/generated";
import { LogOut, Settings, Ticket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Захиалгууд",
    url: "/customer",
    icon: Ticket,
  },
];

export const CustomerSidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const { data } = useGetCustomerQuery({
    variables: { id: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  return (
    <Sidebar className="w-[320px]">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold">{data?.getCustomer ? `${data.getCustomer.firstName} ${data.getCustomer.lastName}` : "Хэрэглэгч"}</p>
            <p className="text-sm text-slate-600">Хэрэглэгчийн бүртгэл</p>
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
                    <SidebarMenuButton asChild className={cn(isActive && "bg-gradient-to-br from-blue-100 to-purple-100")}>
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
                <SidebarMenuButton asChild>
                  <Link href="/customer/settings">
                    <Settings />
                    Тохиргоо
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
