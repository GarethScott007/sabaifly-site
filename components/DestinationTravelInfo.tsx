"use client";

import { useTranslations } from "next-intl";

interface TravelInfo {
  bestTime: string;
  festivals: readonly string[];
  avgTemp: string;
  flightTime: string;
  timezone: string;
  currency: string;
  highlights: readonly string[];
  tips: readonly string[];
}

interface DestinationTravelInfoProps {
  route: string;
  travelData: TravelInfo;
}

/**
 * Component to display destination travel information with i18n support
 * Uses next-intl to translate content based on user's language
 * Falls back to provided travelData if translation not available
 */
export default function DestinationTravelInfo({
  route,
  travelData,
}: DestinationTravelInfoProps) {
  const t = useTranslations();

  // Try to get translated content, fall back to English data
  const getTranslation = (key: string, fallback: string | string[]): string | string[] => {
    try {
      const translationKey = `destinations.${route}.${key}`;
      // Check if translation exists
      const translated = t(translationKey, { defaultValue: null } as any);
      if (translated && typeof translated === "string" && translated !== translationKey) {
        return translated;
      }
      // For arrays, we can't easily translate via the message system yet
      // So we fall back to the provided data
      return fallback;
    } catch (e) {
      return fallback;
    }
  };

  const bestTime = getTranslation("bestTime", travelData.bestTime);
  const festivals = getTranslation("festivals", travelData.festivals);
  const highlights = getTranslation("highlights", travelData.highlights);
  const tips = getTranslation("tips", travelData.tips);

  return (
    <>
      {/* Best Time to Visit */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t("destinations.bestTimeTitle")}
        </h2>
        <p className="text-gray-700 text-lg">{bestTime}</p>
      </section>

      {/* Festivals & Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t("destinations.festivalsTitle")}
        </h2>
        <ul className="space-y-3">
          {Array.isArray(festivals) &&
            festivals.map((festival, index) => (
              <li key={index} className="flex items-start">
                <span className="text-brand mr-3 text-xl">•</span>
                <span className="text-gray-700">{festival}</span>
              </li>
            ))}
        </ul>
      </section>

      {/* Top Attractions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t("destinations.highlightsTitle")}
        </h2>
        <ul className="space-y-3">
          {Array.isArray(highlights) &&
            highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-brand mr-3 text-xl">✓</span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
        </ul>
      </section>

      {/* Travel Tips */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t("destinations.tipsTitle")}
        </h2>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <ul className="space-y-3">
            {Array.isArray(tips) &&
              tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3 font-semibold">→</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
