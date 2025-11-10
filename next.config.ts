import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable the new compiler until it's bundled by Next officially
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
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
