"use client";

import Header from "@/components/UI/common/Header";
import Loading from "@/components/UI/common/Loading";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <main>
        <Loading />
        <Header />
        {children}
      </main>
    </>
  );
}
