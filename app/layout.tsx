import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Header from "@/components/Header";
import GoogleAnalytics from "@/ga/GoogleAnalytics";

export const viewport: Viewport = {
  themeColor: "#693AAE",
  width: "device-width",
  initialScale: 1
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
    images: [{ url: "/img/hero-home.jpg", width: 1200, height: 630 }]
  },
  alternates: { canonical: "https://www.sabaifly.com/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Only run GA on the real production host
  const host = (headers().get("host") || "").toLowerCase();
  const isProdHost = host === "www.sabaifly.com" || host === "sabaifly.com";

  // Exposed via Vercel env. Keep this value out of source control.
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en">
      <body>
        {isProdHost && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Header />
        {children}
      </body>
    </html>
  );
}
