import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "zh", "ja", "ko", "de", "fr", "es", "ar", "th"],

  // Default locale
  defaultLocale: "en",

  // Locale prefix strategy
  localePrefix: "as-needed", // Don't show /en/ prefix for default locale
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
