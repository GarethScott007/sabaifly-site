"use client";

import { useEffect } from "react";

// Extend the global window object to declare gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const GA_ID = process.env["NEXT_PUBLIC_GA_ID"];
      if (GA_ID && !window.gtag) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args) => {
          window.dataLayer!.push(args);
        };

        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
      }
    }
  }, []);

  return null;
}
