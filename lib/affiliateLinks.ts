/**
 * Travelpayouts Affiliate Link Generator
 * Generates deep links to booking partners with your affiliate tracking
 */

import { ENV } from "./constants";

interface FlightSearchParams {
  from: string; // Airport code (e.g., "LON", "BKK")
  to: string;
  departDate?: string; // YYYY-MM-DD
  returnDate?: string; // YYYY-MM-DD
  adults?: number;
  children?: number;
  infants?: number;
  cabinClass?: "economy" | "premium_economy" | "business" | "first";
}

/**
 * Generate Kiwi.com affiliate link
 * Best for: Multi-city, budget travelers, global coverage
 */
export function generateKiwiLink(params: FlightSearchParams): string {
  const {
    from,
    to,
    departDate,
    returnDate,
    adults = 1,
    children = 0,
    infants = 0,
  } = params;

  const baseUrl = "https://www.kiwi.com/deep";
  const searchParams = new URLSearchParams({
    affilid: ENV.TP_MARKER || "670577",
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    ...(departDate && { departure: departDate }),
    ...(returnDate && { return: returnDate }),
    adults: adults.toString(),
    ...(children > 0 && { children: children.toString() }),
    ...(infants > 0 && { infants: infants.toString() }),
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate Skyscanner affiliate link
 * Best for: Comparison shopping, trusted brand
 */
export function generateSkyscannerLink(params: FlightSearchParams): string {
  const { from, to, departDate, returnDate, adults = 1, cabinClass = "economy" } = params;

  // Skyscanner format: /transport/flights/{origin}/{destination}/{outbound}/{inbound}
  const outbound = departDate || "anytime";
  const inbound = returnDate || "";

  const baseUrl = "https://www.skyscanner.com/transport/flights";
  const path = `${from.toLowerCase()}/${to.toLowerCase()}/${outbound}/${inbound || ""}`;

  const searchParams = new URLSearchParams({
    adultsv2: adults.toString(),
    cabinclass: cabinClass,
    ...(ENV.TP_MARKER && { associateid: ENV.TP_MARKER }),
  });

  return `${baseUrl}/${path}?${searchParams.toString()}`;
}

/**
 * Generate Aviasales affiliate link (Travelpayouts main brand)
 * Best for: Russian/CIS market, comprehensive search
 */
export function generateAviasalesLink(params: FlightSearchParams): string {
  const { from, to, departDate, returnDate, adults = 1 } = params;

  const baseUrl = "https://www.aviasales.com/search";
  const searchParams = new URLSearchParams({
    origin_iata: from.toUpperCase(),
    destination_iata: to.toUpperCase(),
    ...(departDate && { departure_at: departDate }),
    ...(returnDate && { return_at: returnDate }),
    adults: adults.toString(),
    marker: ENV.TP_MARKER || "670577",
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate generic Travelpayouts search link
 */
export function generateTravelpayoutsLink(params: FlightSearchParams): string {
  const { from, to, departDate } = params;

  const baseUrl = "https://tp.media/click";
  const searchParams = new URLSearchParams({
    shmarker: ENV.TP_MARKER || "670577",
    promo_id: "4231",
    source_type: "customlink",
    type: "click",
    custom_url: `https://www.aviasales.com/search/${from}${departDate?.replace(/-/g, "")}${to}1`,
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Get best affiliate link based on route/market
 */
export function getBestAffiliateLink(params: FlightSearchParams): {
  url: string;
  partner: string;
  reason: string;
} {
  const { from, to } = params;

  // European routes → Skyscanner (trusted in EU)
  if (isEuropeanRoute(from, to)) {
    return {
      url: generateSkyscannerLink(params),
      partner: "Skyscanner",
      reason: "Best for European travelers",
    };
  }

  // Budget/multi-city → Kiwi
  if (isAsianRoute(from, to) || isLongHaulRoute(from, to)) {
    return {
      url: generateKiwiLink(params),
      partner: "Kiwi.com",
      reason: "Best prices for international routes",
    };
  }

  // Default → Kiwi (most flexible)
  return {
    url: generateKiwiLink(params),
    partner: "Kiwi.com",
    reason: "Best overall coverage",
  };
}

// Helper functions for route classification
function isEuropeanRoute(from: string, to: string): boolean {
  const europeanAirports = ["LON", "LHR", "LGW", "PAR", "CDG", "FRA", "MUC", "MAD", "BCN", "AMS", "BER"];
  return europeanAirports.includes(from.toUpperCase()) || europeanAirports.includes(to.toUpperCase());
}

function isAsianRoute(from: string, to: string): boolean {
  const asianAirports = ["BKK", "SIN", "HKG", "TYO", "NRT", "HND", "SHA", "PVG", "SEL", "ICN", "KUL"];
  return asianAirports.includes(from.toUpperCase()) && asianAirports.includes(to.toUpperCase());
}

function isLongHaulRoute(from: string, to: string): boolean {
  const intercontinentalPairs = [
    ["LON", "BKK"], ["NYC", "TYO"], ["LAX", "SIN"], ["DXB", "JFK"],
  ];

  return intercontinentalPairs.some(
    ([a, b]) =>
      (from.toUpperCase().includes(a) && to.toUpperCase().includes(b)) ||
      (from.toUpperCase().includes(b) && to.toUpperCase().includes(a))
  );
}
