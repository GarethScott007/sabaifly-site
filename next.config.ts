import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // moved from experimental
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Robots-Tag",
          value:
            process.env.NODE_ENV === "production"
              ? "all"
              : "noindex, nofollow",
        },
      ],
    },
  ],
};

export default nextConfig;
