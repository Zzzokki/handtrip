import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomerSidebar } from "./_components";

export const metadata: Metadata = {
  title: "Хэрэглэгчийн самбар",
  description: "Хэрэглэгчийн удирдлагын самбарын хуудас",
};

export default function CustomerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="w-screen h-screen flex">
        <div className="h-screen w-[320px]">
          <CustomerSidebar />
        </div>

        <div className="h-screen flex-1 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-scroll">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
