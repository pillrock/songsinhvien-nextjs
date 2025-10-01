import Header from "@/components/uiSelfCustom/common/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xác thực",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
