import Footer from "@/components/UI/common/Footer";
import Header from "@/components/UI/common/Header";

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
