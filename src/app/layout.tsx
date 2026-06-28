import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "جريدة القبس",
  description: "جريدة القبس - أخبار الكويت والعالم",
  openGraph: {
    title: "جريدة القبس",
    description: "جريدة القبس",
    url: "https://www.alqabas.com",
    type: "website",
    locale: "ar_SA",
    siteName: "جريدة القبس",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}