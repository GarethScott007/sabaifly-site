"use client";

import { useEffect } from "react";

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
        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA_ID);
      }
    }
  }, []);

  return null;
}
