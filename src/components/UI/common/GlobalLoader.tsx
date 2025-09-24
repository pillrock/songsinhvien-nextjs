"use client";
import { useEffect, ReactNode } from "react";
import { useLoadingStore } from "@/lib/zustand/loadingStore";
import Loading from "./LoadingUI";

const GlobalLoader = ({ children }: { children: ReactNode }) => {
  useLoadingStore.getState().setLoading(true);
  return (
    <>
      <Loading />
      {children}
    </>
  );
};

export default GlobalLoader;
