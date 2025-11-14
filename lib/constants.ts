/**
 * Application constants and configuration
 */

// API Endpoints
export const API_ENDPOINTS = {
  SUGGEST: "/api/suggest",
  STATUS: "/api/status",
  LIVE: "/api/live",
} as const;

// External APIs
export const EXTERNAL_APIS = {
  TRAVELPAYOUTS: {
    BASE_URL: "https://api.travelpayouts.com",
    PRICES_FOR_DATES: "/aviasales/v3/prices_for_dates",
    SUGGESTIONS: "/aviasales/autocomplete_places",
  },
  AVIATIONSTACK: {
    BASE_URL: "http://api.aviationstack.com/v1",
    FLIGHTS: "/flights",
  },
} as const;

// Travelpayouts affiliate links
export const AFFILIATE_LINKS = {
  TRAVELPAYOUTS_BASE: "https://www.travelpayouts.com/flights",
} as const;

// Cache revalidation times (in seconds)
export const CACHE_TIMES = {
  FLIGHT_PRICES: 300, // 5 minutes
  LIVE_PRICES: 180, // 3 minutes
  FLIGHT_STATUS: 600, // 10 minutes
  SUGGESTIONS: 3600, // 1 hour
} as const;

// Form validation
export const VALIDATION = {
  IATA_CODE_REGEX: /^[A-Z]{3}$/,
  DATE_REGEX: /^\d{4}-\d{2}-\d{2}$/,
  MIN_ADULTS: 1,
  MAX_TRAVELLERS: 9,
} as const;

// Filter options
export const FILTER_OPTIONS = {
  STOPS: ["Direct", "1 Stop", "2+ Stops"] as const,
  TIME_OF_DAY: ["Morning", "Afternoon", "Evening", "Night"] as const,
  BAGGAGE: ["Cabin Bag", "Checked Bag"] as const,
} as const;

// Time of day ranges (in hours, 24-hour format)
export const TIME_RANGES = {
  MORNING: { start: 6, end: 12 },
  AFTERNOON: { start: 12, end: 18 },
  EVENING: { start: 18, end: 22 },
  NIGHT: { start: 22, end: 6 }, // wraps around midnight
} as const;

// Brand colors (matching Tailwind config)
export const BRAND_COLORS = {
  PRIMARY: "#693AAE",
  LIGHT: "#8B5CF6",
  DARK: "#4C1D95",
} as const;

// Popular routes for sitemap/homepage
// Focused on high-income travelers from Asia, Middle East, Europe, and North America
export const POPULAR_ROUTES = [
  // === UK Routes (British travelers) ===
  { from: "LON", to: "BKK", label: "London to Bangkok" },
  { from: "LON", to: "NYC", label: "London to New York" },
  { from: "LON", to: "SIN", label: "London to Singapore" },
  { from: "LON", to: "DXB", label: "London to Dubai" },
  { from: "LON", to: "SYD", label: "London to Sydney" },
  { from: "LON", to: "LAX", label: "London to Los Angeles" },
  { from: "LON", to: "TYO", label: "London to Tokyo" },
  { from: "LON", to: "HKG", label: "London to Hong Kong" },
  { from: "BKK", to: "LON", label: "Bangkok to London" },
  { from: "SIN", to: "LON", label: "Singapore to London" },
  { from: "TYO", to: "LON", label: "Tokyo to London" },

  // === North America Routes ===
  { from: "NYC", to: "LON", label: "New York to London" },
  { from: "NYC", to: "PAR", label: "New York to Paris" },
  { from: "NYC", to: "TYO", label: "New York to Tokyo" },
  { from: "SFO", to: "LON", label: "San Francisco to London" },
  { from: "SFO", to: "TYO", label: "San Francisco to Tokyo" },
  { from: "SFO", to: "SIN", label: "San Francisco to Singapore" },
  { from: "LAX", to: "TYO", label: "Los Angeles to Tokyo" },
  { from: "LAX", to: "BKK", label: "Los Angeles to Bangkok" },
  { from: "LAX", to: "HKG", label: "Los Angeles to Hong Kong" },
  { from: "LAX", to: "SIN", label: "Los Angeles to Singapore" },

  // === Asia-Asia Routes (High volume, wealthy travelers) ===
  // Tokyo routes
  { from: "TYO", to: "BKK", label: "Tokyo to Bangkok" },
  { from: "TYO", to: "SIN", label: "Tokyo to Singapore" },
  { from: "TYO", to: "HKG", label: "Tokyo to Hong Kong" },
  { from: "TYO", to: "SEL", label: "Tokyo to Seoul" },
  { from: "BKK", to: "TYO", label: "Bangkok to Tokyo" },
  { from: "SIN", to: "TYO", label: "Singapore to Tokyo" },

  // Shanghai routes
  { from: "SHA", to: "BKK", label: "Shanghai to Bangkok" },
  { from: "SHA", to: "SIN", label: "Shanghai to Singapore" },
  { from: "SHA", to: "TYO", label: "Shanghai to Tokyo" },
  { from: "SHA", to: "HKG", label: "Shanghai to Hong Kong" },
  { from: "BKK", to: "SHA", label: "Bangkok to Shanghai" },

  // Seoul routes
  { from: "SEL", to: "BKK", label: "Seoul to Bangkok" },
  { from: "SEL", to: "SIN", label: "Seoul to Singapore" },
  { from: "SEL", to: "TYO", label: "Seoul to Tokyo" },
  { from: "SEL", to: "HKG", label: "Seoul to Hong Kong" },
  { from: "BKK", to: "SEL", label: "Bangkok to Seoul" },

  // Hong Kong routes
  { from: "HKG", to: "BKK", label: "Hong Kong to Bangkok" },
  { from: "HKG", to: "SIN", label: "Hong Kong to Singapore" },
  { from: "HKG", to: "TYO", label: "Hong Kong to Tokyo" },
  { from: "HKG", to: "SEL", label: "Hong Kong to Seoul" },
  { from: "BKK", to: "HKG", label: "Bangkok to Hong Kong" },

  // Singapore routes
  { from: "SIN", to: "BKK", label: "Singapore to Bangkok" },
  { from: "SIN", to: "SYD", label: "Singapore to Sydney" },
  { from: "SIN", to: "HKG", label: "Singapore to Hong Kong" },
  { from: "BKK", to: "SIN", label: "Bangkok to Singapore" },

  // === Middle East Routes ===
  { from: "DXB", to: "BKK", label: "Dubai to Bangkok" },
  { from: "DXB", to: "SIN", label: "Dubai to Singapore" },
  { from: "DXB", to: "LON", label: "Dubai to London" },
  { from: "DXB", to: "TYO", label: "Dubai to Tokyo" },
  { from: "BKK", to: "DXB", label: "Bangkok to Dubai" },
  { from: "SIN", to: "DXB", label: "Singapore to Dubai" },

  // === European Routes ===
  // Frankfurt routes
  { from: "FRA", to: "BKK", label: "Frankfurt to Bangkok" },
  { from: "FRA", to: "SIN", label: "Frankfurt to Singapore" },
  { from: "FRA", to: "TYO", label: "Frankfurt to Tokyo" },
  { from: "FRA", to: "DXB", label: "Frankfurt to Dubai" },
  { from: "BKK", to: "FRA", label: "Bangkok to Frankfurt" },

  // Paris routes
  { from: "PAR", to: "BKK", label: "Paris to Bangkok" },
  { from: "PAR", to: "SIN", label: "Paris to Singapore" },
  { from: "PAR", to: "TYO", label: "Paris to Tokyo" },
  { from: "PAR", to: "DXB", label: "Paris to Dubai" },
  { from: "BKK", to: "PAR", label: "Bangkok to Paris" },

  // Madrid/Barcelona routes
  { from: "MAD", to: "BKK", label: "Madrid to Bangkok" },
  { from: "BCN", to: "BKK", label: "Barcelona to Bangkok" },
  { from: "BKK", to: "MAD", label: "Bangkok to Madrid" },

  // === Australia/Pacific Routes ===
  { from: "SYD", to: "BKK", label: "Sydney to Bangkok" },
  { from: "SYD", to: "SIN", label: "Sydney to Singapore" },
  { from: "SYD", to: "LON", label: "Sydney to London" },
  { from: "BKK", to: "SYD", label: "Bangkok to Sydney" },

  // === India Routes (High volume market) ===
  { from: "DEL", to: "BKK", label: "Delhi to Bangkok" },
  { from: "DEL", to: "SIN", label: "Delhi to Singapore" },
  { from: "BOM", to: "BKK", label: "Mumbai to Bangkok" },
  { from: "BKK", to: "DEL", label: "Bangkok to Delhi" },

  // === Malaysia/Indonesia ===
  { from: "KUL", to: "BKK", label: "Kuala Lumpur to Bangkok" },
  { from: "BKK", to: "KUL", label: "Bangkok to Kuala Lumpur" },
] as const;

// Environment variables (with type safety)
export const ENV = {
  TP_TOKEN: process.env["TP_TOKEN"],
  TP_MARKER: process.env["TP_MARKER"] || "670577",
  TP_MARKET: process.env["TP_MARKET"] || "en",
  GA4_ID: process.env["GA4_ID"],
  PRODUCTION_DOMAIN: "www.sabaifly.com",
} as const;

// Debounce delays (in milliseconds)
export const DEBOUNCE = {
  AUTOCOMPLETE: 300,
  SEARCH: 500,
} as const;
