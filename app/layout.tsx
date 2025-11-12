import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#693AAE",
  width: "device-width",
  initialScale: 1,
};

// Root layout - minimal wrapper (locale handling is done by middleware and [locale] layout)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
