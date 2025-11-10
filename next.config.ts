import type { NextConfig } from "next";

// Security headers (CSP is GA4-ready, no inline scripts required)
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' https: data:",
      // Tailwind/Next styles are fine with 'unsafe-inline' for CSS only
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      // GA script loader
      "script-src 'self' https://www.googletagmanager.com",
      // XHR/fetch/beacon endpoints (Travelpayouts + GA4)
      "connect-src 'self' https://autocomplete.travelpayouts.com https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com"
    ].join("; ")
  }
];

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: securityHeaders
    }
  ]
};

export default config;
