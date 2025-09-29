"use client";

import Header from "@/components/UI/common/Header";
import LoadingUI from "@/components/UI/common/LoadingUI";
import { AuthProvider } from "@/contexts/AuthContext";
import { useLoadingStore } from "@/lib/zustand/loadingStore";
import { ReactNode, useEffect } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <AuthProvider>
      <main>
        {isLoading && <LoadingUI />}
        {children}
      </main>
    </AuthProvider>
  );
}
