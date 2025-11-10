import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Use TypeScript-safe env access
  const host = process.env["VERCEL_URL"] ?? "www.sabaifly.com";
  const isProd =
    host === "www.sabaifly.com" || host === "sabaifly.com";

  return isProd
    ? {
        rules: {
          userAgent: "*",
          allow: "/",
        },
        sitemap: "https://www.sabaifly.com/sitemap.xml",
        host: "https://www.sabaifly.com",
      }
    : {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      };
}
