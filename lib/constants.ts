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
export const POPULAR_ROUTES = [
  { from: "LON", to: "BKK", label: "London to Bangkok" },
  { from: "LON", to: "NYC", label: "London to New York" },
  { from: "LON", to: "SIN", label: "London to Singapore" },
  { from: "LON", to: "DXB", label: "London to Dubai" },
  { from: "LON", to: "SYD", label: "London to Sydney" },
  { from: "LON", to: "LAX", label: "London to Los Angeles" },
  { from: "LON", to: "TYO", label: "London to Tokyo" },
  { from: "LON", to: "HKG", label: "London to Hong Kong" },
  { from: "NYC", to: "LON", label: "New York to London" },
  { from: "NYC", to: "PAR", label: "New York to Paris" },
  { from: "SFO", to: "LON", label: "San Francisco to London" },
  { from: "LAX", to: "TYO", label: "Los Angeles to Tokyo" },
  { from: "DXB", to: "BKK", label: "Dubai to Bangkok" },
  { from: "SIN", to: "SYD", label: "Singapore to Sydney" },
  { from: "HKG", to: "BKK", label: "Hong Kong to Bangkok" },
] as const;

// Environment variables (with type safety)
export const ENV = {
  TP_TOKEN: process.env["TP_TOKEN"],
  TP_MARKET: process.env["TP_MARKET"] || "en",
  GA4_ID: process.env["GA4_ID"],
  PRODUCTION_DOMAIN: "www.sabaifly.com",
} as const;

// Debounce delays (in milliseconds)
export const DEBOUNCE = {
  AUTOCOMPLETE: 300,
  SEARCH: 500,
} as const;
