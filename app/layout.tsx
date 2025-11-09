import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";

export const viewport: Viewport = { themeColor: "#693AAE", width: "device-width", initialScale: 1 };
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sabaifly.com"),
  title: "SabaiFly",
  description: "Fast, clean flight search. Partners pay us when you book. We never add fees."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
