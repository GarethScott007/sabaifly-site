import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Check multiple environment variables for production detection
  const vercelUrl = process.env["VERCEL_URL"] || "";
  const vercelEnv = process.env["VERCEL_ENV"] || "";
  const nodeEnv = process.env["NODE_ENV"] || "";
  const cfPages = process.env["CF_PAGES"] || "";
  const cfPagesBranch = process.env["CF_PAGES_BRANCH"] || "";

  // Determine if this is production
  const isProd =
    vercelEnv === "production" || // Vercel production deployment
    cfPagesBranch === "main" || // Cloudflare Pages main branch
    vercelUrl === "www.sabaifly.com" ||
    vercelUrl === "sabaifly.com" ||
    vercelUrl.includes("sabaifly.com");

  // Default to blocking (safer - won't accidentally index staging)
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
