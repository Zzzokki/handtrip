import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { AdminAuth, AdminSidebar, AdminHeader } from "./_components";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the platform",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AdminAuth>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="px-6 py-4">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuth>
  );
}
