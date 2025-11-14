"use client";

import { useTranslations } from "next-intl";
import { Plane, ExternalLink, TrendingUp } from "lucide-react";
import { generateKiwiLink, generateSkyscannerLink } from "@/lib/affiliateLinks";

interface FlightSearchCTAProps {
  from: string;
  to: string;
  departDate?: string;
  returnDate?: string;
  variant?: "full" | "compact";
  showPriceIndicator?: boolean;
  estimatedPrice?: string;
}

/**
 * Multi-partner flight search CTA
 * Shows multiple booking options to give users CHOICE
 * Easy to add to top/bottom of any page
 */
export default function FlightSearchCTA({
  from,
  to,
  departDate,
  returnDate,
  variant = "full",
  showPriceIndicator = true,
  estimatedPrice,
}: FlightSearchCTAProps) {
  const t = useTranslations();

  const bookingOptions = [
    {
      name: "Kiwi.com",
      description: "Best for flexible dates & multi-city",
      color: "bg-green-600 hover:bg-green-700",
      url: generateKiwiLink({ from, to, departDate, returnDate }),
      icon: "🥝",
    },
    {
      name: "Skyscanner",
      description: "Compare 1000+ airlines instantly",
      color: "bg-blue-600 hover:bg-blue-700",
      url: generateSkyscannerLink({ from, to, departDate, returnDate }),
      icon: "✈️",
    },
    {
      name: "Google Flights",
      description: "Best price tracking & alerts",
      color: "bg-red-600 hover:bg-red-700",
      url: `https://www.google.com/travel/flights?q=flights%20from%20${from}%20to%20${to}`,
      icon: "🔍",
    },
  ];

  const handleClick = (partner: string, url: string) => {
    // Track the click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search_click", {
        partner: partner,
        route: `${from}-${to}`,
      });
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (variant === "compact") {
    return (
      <div className="w-full bg-gradient-to-r from-brand to-brand-light rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-white font-semibold text-lg">
                Ready to Book Your Flight?
              </h3>
              {estimatedPrice && (
                <p className="text-white/90 text-sm">From {estimatedPrice}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => handleClick("Kiwi.com", bookingOptions[0].url)}
            className="bg-white text-brand px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md whitespace-nowrap"
          >
            Search Flights →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Plane className="w-8 h-8 text-brand" />
          <h2 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Flight
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          Compare prices from top travel sites in seconds
        </p>
        {estimatedPrice && showPriceIndicator && (
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">
              Flights from {estimatedPrice}
            </span>
          </div>
        )}
      </div>

      {/* Booking Options Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {bookingOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => handleClick(option.name, option.url)}
            className={`
              ${option.color} text-white rounded-xl p-6
              transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105
              group relative overflow-hidden
            `}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
              {option.icon}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-3xl mb-2">{option.icon}</div>
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                {option.name}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-white/90 text-sm">{option.description}</p>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
          </button>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Secure Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Free Cancellation Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
