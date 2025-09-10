"use client";

import Header from "@/components/UI/common/Header";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
