"use client";

import LoadingUI from "@/components/uiSelfCustom/common/LoadingUI";
import { AuthProvider } from "@/contexts/AuthContext";
import { useLoadingStore } from "@/lib/zustand/loadingStore";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <AuthProvider>
      <main className="">
        {isLoading && <LoadingUI />}
        {children}
        <Toaster
          toastOptions={{
            duration: 1500,
            className: "bg-[#262626]! border! border-[#3B3C3C]! text-white!",
            classNames: {
              description: "text-gray-500!",
            },
          }}
          position="top-center"
        />
      </main>
    </AuthProvider>
  );
}
