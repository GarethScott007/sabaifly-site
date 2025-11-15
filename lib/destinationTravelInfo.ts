/**
 * Destination Travel Information
 * Structured data for translatable destination content
 * Falls back to English if translation not available
 */

export interface DestinationTravelInfo {
  bestTime: string;
  festivals: string[];
  avgTemp: string;
  flightTime: string;
  timezone: string;
  currency: string;
  highlights: string[];
  tips: string[];
}

// English travel information database
// Can be extended with translations in message files
const DESTINATION_TRAVEL_DATA: Record<string, DestinationTravelInfo> = {
  "lon-to-bkk": {
    bestTime: "November to February (cool and dry season)",
    festivals: [
      "Songkran (Thai New Year) - April 13-15",
      "Loy Krathong - November (full moon)",
      "Chinese New Year - January/February",
    ],
    avgTemp: "27-35°C year-round",
    flightTime: "~11 hours 30 minutes",
    timezone: "GMT+7 (6-7 hours ahead of London)",
    currency: "Thai Baht (THB)",
    highlights: [
      "Grand Palace and Wat Phra Kaew",
      "Floating markets and street food",
      "Chatuchak Weekend Market",
      "Rooftop bars and nightlife",
      "Day trips to Ayutthaya",
    ],
    tips: [
      "Visa exempt for UK passport holders (up to 30 days)",
      "Book 2-3 months ahead for best flight prices",
      "Avoid rainy season (May-October) for better weather",
      "Bangkok is a major hub for connecting to Thai islands",
    ],
  },
  "lon-to-nyc": {
    bestTime: "April-June and September-November (spring/fall)",
    festivals: [
      "New Year's Eve in Times Square - December 31",
      "Thanksgiving Day Parade - November",
      "St. Patrick's Day Parade - March 17",
      "Fourth of July Fireworks - July 4",
    ],
    avgTemp: "Summer: 25-30°C, Winter: -3 to 5°C",
    flightTime: "~8 hours (westbound), ~7 hours (eastbound)",
    timezone: "GMT-5 (5 hours behind London)",
    currency: "US Dollar (USD)",
    highlights: [
      "Statue of Liberty and Ellis Island",
      "Central Park and Metropolitan Museum",
      "Brooklyn Bridge and DUMBO",
      "Broadway shows and Times Square",
      "9/11 Memorial and One World Observatory",
    ],
    tips: [
      "ESTA visa waiver required (apply online)",
      "Cheapest flights: January-March (avoid holidays)",
      "Most expensive: summer and Christmas period",
      "Consider Newark (EWR) for potentially cheaper fares",
    ],
  },
  // ... Additional destinations would continue here
  // For now, this demonstrates the structure
  // A full list of all 87 destinations would be generated from the current DESTINATIONS object
};

/**
 * Get destination travel information with i18n support
 * Falls back to English if translation is not available
 *
 * @param route - The destination route (e.g., "lon-to-bkk")
 * @param translations - Translation object from useTranslations()
 * @returns DestinationTravelInfo or null if route not found
 */
export function getDestinationTravelInfo(
  route: string,
  translations?: Record<string, any>
): DestinationTravelInfo | null {
  // First check if translation exists for this route
  if (translations && `destinations.${route}` in translations) {
    try {
      return translations[`destinations.${route}`] as DestinationTravelInfo;
    } catch (e) {
      console.warn(`Translation error for route ${route}, falling back to English`);
    }
  }

  // Fall back to English
  return DESTINATION_TRAVEL_DATA[route] || null;
}
