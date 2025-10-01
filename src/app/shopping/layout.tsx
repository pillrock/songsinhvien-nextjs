import Header from "@/components/uiSelfCustom/common/Header";
import type { Metadata } from "next";
import Navbars from "./Navbars";

export const metadata: Metadata = {
  title: "Quản lý mua sắm",
};

export default function ShoppingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex md:mt-5 mx-5 md:mx-8 gap-x-5">
        <Navbars />
        <div className="main-content flex-10 h-[1000px]">{children}</div>
      </div>
    </>
  );
}
