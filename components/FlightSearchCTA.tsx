"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";

interface FlightSearchCTAProps {
  from: string;
  to: string;
  variant?: "full" | "compact";
  showPriceIndicator?: boolean;
  estimatedPrice?: string;
}

export default function FlightSearchCTA({
  from,
  to,
  variant = "full",
  showPriceIndicator = false,
  estimatedPrice,
}: FlightSearchCTAProps) {
  const router = useRouter();
  const locale = useLocale();

  const handleSearch = () => {
    // Navigate to search results with pre-filled from/to
    const searchParams = new URLSearchParams({
      from,
      to,
      tripType: "round",
    });
    router.push(`/${locale}/flights?${searchParams.toString()}`);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleSearch}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
      >
        Search Flights
        <ChevronRight size={18} />
      </button>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Ready to Book Your Flight?
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{from}</span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-gray-900">{to}</span>
            </div>
            {showPriceIndicator && estimatedPrice && (
              <div className="flex items-center gap-2 pl-3 border-l border-gray-300">
                <span className="text-green-600 font-semibold">
                  {estimatedPrice}
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Compare prices across multiple flight booking partners
          </p>
        </div>
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
        >
          Search Flights
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
