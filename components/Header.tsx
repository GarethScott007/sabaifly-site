"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  className?: string;
  locale: string;
}

export default function Header({ className = "", locale }: HeaderProps) {
  const t = useTranslations();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    setIsLangMenuOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full h-16 bg-brand flex items-center justify-between px-6 md:px-10 shadow-md ${className}`}
    >
      {/* Left – Logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
        >
          SabaiFly
        </Link>
      </div>

      {/* Center – Navigation - NOW VISIBLE ON ALL DEVICES */}
      <nav className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium flex-1 justify-center max-w-2xl mx-2">
        <Link
          href="/"
          className="px-1.5 sm:px-2 md:px-3 py-1 md:py-1.5 rounded-md text-white bg-white/10 hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap"
        >
          {t("header.home")}
        </Link>
        <Link
          href="/flights"
          className="px-1.5 sm:px-2 md:px-3 py-1 md:py-1.5 rounded-md text-white bg-white/10 hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap"
        >
          {t("header.flights")}
        </Link>
        <Link
          href="/hotels"
          className="px-1.5 sm:px-2 md:px-3 py-1 md:py-1.5 rounded-md text-white bg-white/10 hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap"
        >
          {t("header.hotels")}
        </Link>
        <Link
          href="/about"
          className="px-1.5 sm:px-2 md:px-3 py-1 md:py-1.5 rounded-md text-white bg-white/10 hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap"
        >
          {t("header.about")}
        </Link>
        <Link
          href="/privacy"
          className="px-1.5 sm:px-2 md:px-3 py-1 md:py-1.5 rounded-md text-white bg-white/10 hover:bg-white/20 transition-all border border-white/30 whitespace-nowrap"
        >
          {t("header.privacy")}
        </Link>
      </nav>

      {/* Right – Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand font-semibold hover:bg-white/90 transition text-sm shadow-md"
          aria-label={t("languages.select")}
        >
          <span>{t(`languages.${locale}`)}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isLangMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsLangMenuOpen(false)}
            />

            {/* Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2 max-h-96 overflow-y-auto">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-brand/10 transition-colors text-sm ${
                    locale === loc
                      ? "bg-brand/20 font-semibold text-brand"
                      : "text-neutral-700"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{getLanguageFlag(loc)}</span>
                    <span>{t(`languages.${loc}`)}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

// Helper function to get flag emojis for languages
function getLanguageFlag(locale: string): string {
  const flags: Record<string, string> = {
    en: "🇬🇧",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
    de: "🇩🇪",
    fr: "🇫🇷",
    es: "🇪🇸",
    ar: "🇸🇦",
    th: "🇹🇭",
  };
  return flags[locale] || "🌐";
}
