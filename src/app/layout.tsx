import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import ClientLayout from "./_clientLayout";

export const baseFont = localFont({
  variable: "--font-base",
  src: "../../public/fonts/base.woff2",
});

export const baseBoldFont = localFont({
  variable: "--font-base-bold",
  src: "../../public/fonts/base-bold.woff2",
});

export const kanitFont = Kanit({
  weight: "500",
  variable: "--font-logo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Sống Sinh Viên | %s",
    default: "Sống Sinh Viên",
  },
  description: "Đa dạng tiện ích cho sinh viên",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased overflow-x-hidden ${baseFont.className} ${baseBoldFont.variable} ${kanitFont.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
