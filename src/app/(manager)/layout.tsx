import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { ManagerAuth } from "./manager/_components/ManagerAuth";

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Manager dashboard for managing the platform",
};

export default function ManagerLayout({ children }: PropsWithChildren) {
  return <ManagerAuth>{children}</ManagerAuth>;
}
