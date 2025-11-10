import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Header from "@/components/Header";
import GoogleAnalytics from "@/app/ga/GoogleAnalytics";

export const viewport: Viewport = {
  themeColor: "#693AAE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sabaifly.com"),
  title: "SabaiFly",
  description:
    "Fast, clean flight search. Partners pay us when you book. We never add fees to your ticket price.",
  openGraph: {
    type: "website",
    url: "https://www.sabaifly.com",
    title: "SabaiFly — Calm flight search",
    description:
      "Find flights fast. Clean results. Book with trusted partners. No added fees.",
    images: [{ url: "/img/hero-home.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SabaiFly — Calm flight search",
    description:
      "Find flights fast. Clean results. Book with trusted partners. No added fees.",
    images: ["/img/hero-home.jpg"],
  },
};

// Root layout wrapper
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Await the headers() promise to get the header list
  const headerList = await headers();
  const host = (headerList.get("host") || "").toLowerCase();

  // Detect if we’re on the production domain
  const isProdHost = host === "www.sabaifly.com" || host === "sabaifly.com";
  const showGA = isProdHost;

  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased flex flex-col min-h-screen">
        {/* Global Header (renders once) */}
        <Header className="h-40 shadow-lg border-b border-brand/20" />

        {/* Conditionally render Google Analytics */}
        {showGA && <GoogleAnalytics />}

        {/* Main content */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
