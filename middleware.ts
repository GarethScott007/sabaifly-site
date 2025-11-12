import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Static files (images, fonts, etc)
  // - Next.js internals (_next/*)
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
    "/(de|fr|es|zh|ja|ko|ar|th)/:path*",
  ],
};
