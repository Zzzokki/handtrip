import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { ManagerAuth } from "./manager/_components/ManagerAuth";
import { ManagerSidebar, ManagerHeaderBar } from "./manager/_components";

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Manager dashboard for managing the platform",
};

export default function ManagerLayout({ children }: PropsWithChildren) {
  return (
    <ManagerAuth>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <ManagerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ManagerHeaderBar />
          <main className="flex-1 overflow-y-auto">
            <div className="px-6 py-4">{children}</div>
          </main>
        </div>
      </div>
    </ManagerAuth>
  );
}
