import "../globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { GoogleAnalytics } from "@/app/ga/GoogleAnalytics";
import { routing } from "@/i18n/routing";
import {
  OrganizationSchema,
  WebSiteSchema,
} from "@/components/StructuredData";

export const viewport: Viewport = {
  themeColor: "#693AAE",
  width: "device-width",
  initialScale: 1,
};

// Generate metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://www.sabaifly.com";
  const localePath = locale === "en" ? "" : `/${locale}`;

  // Generate hreflang alternates
  const languages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const path = loc === "en" ? "" : `/${loc}`;
    languages[loc] = `${baseUrl}${path}`;
  });
  languages["x-default"] = baseUrl;

  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    keywords: [
      "cheap flights",
      "flight search",
      "flight comparison",
      "airline tickets",
      "travel deals",
      "flight booking",
      "international flights",
      "domestic flights",
    ],
    alternates: {
      canonical: `${baseUrl}${localePath}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}${localePath}`,
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [{ url: "/img/hero-home.jpg" }],
      locale: locale,
      siteName: "SabaiFly",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: ["/img/hero-home.jpg"],
      site: "@SabaiFly",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "google-site-verification": "pending",
    },
  };
}

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Locale-specific layout with Header and content
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Await the headers() promise to get the header list
  const headerList = await headers();
  const host = (headerList.get("host") || "").toLowerCase();

  // Detect if we're on the production domain
  const isProdHost = host === "www.sabaifly.com" || host === "sabaifly.com";
  const showGA = isProdHost;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="bg-white text-neutral-900 antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {/* Structured Data for AI Search Engines */}
          <OrganizationSchema />
          <WebSiteSchema locale={locale} />

          {/* Fixed Global Header */}
          <Header locale={locale} />

          {/* Conditionally render Google Analytics */}
          {showGA && <GoogleAnalytics />}

          {/* Main content with top padding to account for fixed header */}
          <main className="pt-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
