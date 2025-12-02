import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { CompanySidebar } from "./_components";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Компанийн самбар",
  description: "Компанийн удирдлагын самбарын хуудас",
};

export default function CompanyDashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="w-screen h-screen flex">
        <div className="h-screen w-[320px]">
          <CompanySidebar />
        </div>

        <div className="h-screen flex-1 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-scroll">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
