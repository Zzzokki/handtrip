"use client";

import { type PropsWithChildren } from "react";
import { Footer, Header } from "@/app/_components";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
