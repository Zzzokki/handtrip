import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { AdminAuth } from "./_components/AdminAuth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the platform",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return <AdminAuth>{children}</AdminAuth>;
}
