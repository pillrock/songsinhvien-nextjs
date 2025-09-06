"use client";

import { ReactNode } from "react";
import Header from "@/components/UI/common/Header";
import Footer from "@/components/UI/common/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
