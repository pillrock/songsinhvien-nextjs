import Footer from "@/components/uiSelfCustom/common/Footer";
import Header from "@/components/uiSelfCustom/common/Header";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
      <Footer />
    </>
  );
}
