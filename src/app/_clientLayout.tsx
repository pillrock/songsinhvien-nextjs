"use client";

import Header from "@/components/UI/common/Header";
import LoadingUI from "@/components/UI/common/LoadingUI";
import { useLoadingStore } from "@/lib/zustand/loadingStore";
import { ReactNode, useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <main>
      {isLoading && <LoadingUI />}
      <Header />
      {children}
    </main>
  );
}
