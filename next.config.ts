import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: { reactCompiler: true },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; " +
            "img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; " +
            "script-src 'self' https://www.googletagmanager.com; " +
            "connect-src 'self' https://autocomplete.travelpayouts.com; "
        }
      ]
    }
  ]
};

export default config;
