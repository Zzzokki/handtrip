import { type Metadata } from "next";
import { type PropsWithChildren } from "react";
import { AuthProvider } from "@/components";

export const metadata: Metadata = {
  title: "Handtrip",
  description: "Discover and Book Unforgettable Travel Experiences with Handtrip",
};

export default function MainLayout({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
