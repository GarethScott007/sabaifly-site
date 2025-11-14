import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VisaEmbassyInfoGlobal from "@/components/VisaEmbassyInfoGlobal";
import FlightSearchCTA from "@/components/FlightSearchCTA";

// Travel information database
const DESTINATIONS = {
  "lhr-to-bkk": {
    from: "LHR",
    to: "BKK",
    fromCity: "London",
    toCity: "Bangkok",
    country: "Thailand",
    bestTime: "November to February (cool and dry season)",
    festivals: [
      "Songkran (Thai New Year) - April 13-15",
      "Loy Krathong - November (full moon)",
      "Chinese New Year - January/February",
    ],
    avgTemp: "27-35°C (80-95°F)",
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
      "Avoid rainy season (May-October) for better weather",
      "Book 2-3 months ahead for best flight prices",
      "Consider shoulder season (March-April, November) for deals",
      "Bangkok is a major hub - great for connecting flights to islands",
    ],
  },
  "lhr-to-jfk": {
    from: "LHR",
    to: "JFK",
    fromCity: "London",
    toCity: "New York",
    country: "United States",
    bestTime: "April-June and September-November (spring/fall)",
    festivals: [
      "New Year's Eve in Times Square - December 31",
      "Thanksgiving Day Parade - November",
      "St. Patrick's Day Parade - March 17",
      "4th of July Fireworks - July 4",
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
      "Cheapest flights: January-March (avoid holidays)",
      "Most expensive: summer and Christmas period",
      "ESTA visa waiver required (apply online)",
      "Consider Newark (EWR) for potentially cheaper fares",
    ],
  },
  "lhr-to-sin": {
    from: "LHR",
    to: "SIN",
    fromCity: "London",
    toCity: "Singapore",
    country: "Singapore",
    bestTime: "February to April (less rain, Chinese New Year festivities)",
    festivals: [
      "Chinese New Year - January/February",
      "Deepavali (Festival of Lights) - October/November",
      "Singapore Food Festival - July",
      "Great Singapore Sale - June-July",
    ],
    avgTemp: "24-31°C year-round (tropical climate)",
    flightTime: "~13 hours",
    timezone: "GMT+8 (7-8 hours ahead of London)",
    currency: "Singapore Dollar (SGD)",
    highlights: [
      "Marina Bay Sands and Gardens by the Bay",
      "Sentosa Island beaches and attractions",
      "Hawker centers for authentic local food",
      "Chinatown, Little India, Arab Street",
      "Universal Studios and Night Safari",
    ],
    tips: [
      "No visa required for UK passport holders (up to 90 days)",
      "Book 3-4 months ahead for best prices",
      "Avoid monsoon season (November-January) for less rain",
      "Singapore is a perfect stopover for Australia/New Zealand trips",
    ],
  },
  "lhr-to-hnd": {
    from: "LHR",
    to: "HND",
    fromCity: "London",
    toCity: "Tokyo",
    country: "Japan",
    bestTime: "March-May (cherry blossoms) or September-November (autumn colors)",
    festivals: [
      "Cherry Blossom Season - Late March to early April",
      "Golden Week - Late April to early May",
      "Sumida River Fireworks - July",
      "Tokyo Marathon - March",
    ],
    avgTemp: "Summer: 25-30°C, Winter: 5-12°C",
    flightTime: "~12 hours 30 minutes",
    timezone: "GMT+9 (8-9 hours ahead of London)",
    currency: "Japanese Yen (JPY)",
    highlights: [
      "Shibuya Crossing and Harajuku fashion",
      "Senso-ji Temple in Asakusa",
      "Tokyo Skytree and teamLab Borderless",
      "Tsukiji Outer Market for sushi",
      "Mount Fuji day trips",
    ],
    tips: [
      "Visa-free for UK passport holders (up to 90 days)",
      "Book 2-3 months ahead for cherry blossom season",
      "Avoid Golden Week (very crowded and expensive)",
      "Get a JR Pass if planning to visit other cities",
    ],
  },
  "lhr-to-syd": {
    from: "LHR",
    to: "SYD",
    fromCity: "London",
    toCity: "Sydney",
    country: "Australia",
    bestTime: "September to November (spring) or March to May (autumn)",
    festivals: [
      "Sydney Festival - January",
      "Vivid Sydney (light festival) - May-June",
      "Sydney Gay and Lesbian Mardi Gras - February-March",
      "New Year's Eve Fireworks - December 31",
    ],
    avgTemp: "Summer: 18-26°C, Winter: 8-17°C",
    flightTime: "~22 hours (with stopover)",
    timezone: "GMT+10/+11 (9-10 hours ahead of London)",
    currency: "Australian Dollar (AUD)",
    highlights: [
      "Sydney Opera House and Harbour Bridge",
      "Bondi Beach and coastal walks",
      "The Rocks historic district",
      "Taronga Zoo with harbour views",
      "Blue Mountains day trips",
    ],
    tips: [
      "Electronic visa (eVisitor) required - free and instant",
      "Book 3-6 months ahead for best long-haul prices",
      "Summer (Dec-Feb) is peak season and most expensive",
      "Consider stopover in Singapore or Dubai to break journey",
    ],
  },
  "lhr-to-dxb": {
    from: "LHR",
    to: "DXB",
    fromCity: "London",
    toCity: "Dubai",
    country: "United Arab Emirates",
    bestTime: "November to March (pleasant weather, 20-30°C)",
    festivals: [
      "Dubai Shopping Festival - January-February",
      "Dubai Food Festival - February-March",
      "Dubai World Cup (horse racing) - March",
      "Ramadan celebrations - Varies by lunar calendar",
    ],
    avgTemp: "Summer: 35-45°C, Winter: 20-30°C",
    flightTime: "~7 hours",
    timezone: "GMT+4 (3-4 hours ahead of London)",
    currency: "UAE Dirham (AED)",
    highlights: [
      "Burj Khalifa and Dubai Mall",
      "Palm Jumeirah and Atlantis resort",
      "Dubai Marina and JBR beach",
      "Gold and Spice Souks in Old Dubai",
      "Desert safari and sand dunes",
    ],
    tips: [
      "Visa on arrival for UK passport holders",
      "Avoid summer (May-September) - extremely hot",
      "Shopping Festival offers great deals",
      "Modest dress required in traditional areas",
    ],
  },
  "lhr-to-del": {
    from: "LHR",
    to: "DEL",
    fromCity: "London",
    toCity: "Delhi",
    country: "India",
    bestTime: "October to March (cool and dry season)",
    festivals: [
      "Diwali (Festival of Lights) - October/November",
      "Holi (Festival of Colors) - March",
      "Republic Day Parade - January 26",
      "Dussehra celebrations - September/October",
    ],
    avgTemp: "Summer: 30-45°C, Winter: 7-20°C",
    flightTime: "~8 hours 30 minutes",
    timezone: "GMT+5:30 (4:30-5:30 hours ahead of London)",
    currency: "Indian Rupee (INR)",
    highlights: [
      "Red Fort and Jama Masjid",
      "India Gate and Rajpath",
      "Qutub Minar UNESCO site",
      "Chandni Chowk street food",
      "Day trips to Taj Mahal in Agra",
    ],
    tips: [
      "E-visa required - apply online before travel",
      "Avoid summer (April-June) - very hot",
      "Book 2-3 months ahead for festival seasons",
      "Consider health precautions and travel insurance",
    ],
  },
  "lhr-to-hkt": {
    from: "LHR",
    to: "HKT",
    fromCity: "London",
    toCity: "Phuket",
    country: "Thailand",
    bestTime: "November to February (dry season, perfect beach weather)",
    festivals: [
      "Phuket Vegetarian Festival - September/October",
      "Loy Krathong - November (full moon)",
      "Songkran (Thai New Year) - April 13-15",
      "Phuket Old Town Festival - February",
    ],
    avgTemp: "27-32°C year-round (tropical climate)",
    flightTime: "~12 hours (with connection)",
    timezone: "GMT+7 (6-7 hours ahead of London)",
    currency: "Thai Baht (THB)",
    highlights: [
      "Patong Beach and nightlife",
      "Phi Phi Islands day trips",
      "Big Buddha and Wat Chalong",
      "Old Phuket Town Sino-Portuguese architecture",
      "Island hopping and snorkeling",
    ],
    tips: [
      "Avoid monsoon season (May-October) for beach holidays",
      "Book 3-4 months ahead for high season (Nov-Feb)",
      "Shoulder season (March-April) offers good deals",
      "Great base for exploring Phang Nga Bay and Krabi",
    ],
  },
  "lhr-to-kul": {
    from: "LHR",
    to: "KUL",
    fromCity: "London",
    toCity: "Kuala Lumpur",
    country: "Malaysia",
    bestTime: "May to July or December to February (drier months)",
    festivals: [
      "Chinese New Year - January/February",
      "Hari Raya (Eid) - Varies by lunar calendar",
      "Thaipusam Hindu festival - January/February",
      "Malaysia Day celebrations - September 16",
    ],
    avgTemp: "27-32°C year-round (tropical climate)",
    flightTime: "~13 hours",
    timezone: "GMT+8 (7-8 hours ahead of London)",
    currency: "Malaysian Ringgit (MYR)",
    highlights: [
      "Petronas Twin Towers and KLCC Park",
      "Batu Caves Hindu temples",
      "Street food in Jalan Alor",
      "Bukit Bintang shopping district",
      "Day trips to Genting Highlands",
    ],
    tips: [
      "No visa required for UK passport holders (up to 90 days)",
      "Book 2-3 months ahead for best prices",
      "Avoid monsoon season (November-March) on east coast",
      "Perfect stopover for Australia or Southeast Asia trips",
    ],
  },
  "lhr-to-bom": {
    from: "LHR",
    to: "BOM",
    fromCity: "London",
    toCity: "Mumbai",
    country: "India",
    bestTime: "November to February (cool and pleasant season)",
    festivals: [
      "Ganesh Chaturthi - August/September",
      "Diwali (Festival of Lights) - October/November",
      "Holi (Festival of Colors) - March",
      "Mumbai Festival - January",
    ],
    avgTemp: "Summer: 27-35°C, Winter: 17-30°C",
    flightTime: "~9 hours",
    timezone: "GMT+5:30 (4:30-5:30 hours ahead of London)",
    currency: "Indian Rupee (INR)",
    highlights: [
      "Gateway of India and Taj Mahal Palace Hotel",
      "Marine Drive promenade",
      "Elephanta Caves UNESCO site",
      "Dharavi area and Dhobi Ghat",
      "Bollywood studio tours",
    ],
    tips: [
      "E-visa required - apply online before travel",
      "Avoid monsoon season (June-September) - heavy rains",
      "Book 2-3 months ahead for festival seasons",
      "Mumbai is India's financial hub - great food and nightlife",
    ],
  },
} as const;

type RouteParams = {
  params: Promise<{ route: string; locale: string }>;
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { route } = await params;
  const destination = DESTINATIONS[route as keyof typeof DESTINATIONS];

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `${destination.fromCity} to ${destination.toCity} Flights | Best Time to Visit, Festivals & Travel Tips`,
    description: `Find cheap flights from ${destination.fromCity} (${destination.from}) to ${destination.toCity} (${destination.to}). Best time to visit: ${destination.bestTime}. Flight time: ${destination.flightTime}. ${destination.highlights[0]}.`,
    openGraph: {
      title: `${destination.fromCity} to ${destination.toCity} Travel Guide`,
      description: `Everything you need to know about flying from ${destination.fromCity} to ${destination.toCity} - best times, festivals, and top attractions.`,
    },
  };
}

export default async function DestinationPage({ params }: RouteParams) {
  const { route } = await params;
  const destination = DESTINATIONS[route as keyof typeof DESTINATIONS];

  if (!destination) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {destination.fromCity} to {destination.toCity}
        </h1>
        <p className="text-xl text-gray-600">
          Complete travel guide for your flight from {destination.from} to {destination.to}
        </p>
      </div>

      {/* TOP SEARCH CTA - Multiple options! */}
      <div className="mb-8">
        <FlightSearchCTA
          from={destination.from}
          to={destination.to}
          variant="full"
          showPriceIndicator={true}
          estimatedPrice="$599"
        />
      </div>

      {/* Visa & Embassy Information */}
      <VisaEmbassyInfoGlobal toAirport={destination.to} />

      {/* Flight Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Flight Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Flight Duration</h3>
            <p className="text-gray-600">{destination.flightTime}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Time Difference</h3>
            <p className="text-gray-600">{destination.timezone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Average Temperature</h3>
            <p className="text-gray-600">{destination.avgTemp}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Currency</h3>
            <p className="text-gray-600">{destination.currency}</p>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Time to Visit</h2>
        <p className="text-gray-700 text-lg">{destination.bestTime}</p>
      </section>

      {/* Festivals & Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Major Festivals & Events</h2>
        <ul className="space-y-3">
          {destination.festivals.map((festival, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand mr-3 text-xl">•</span>
              <span className="text-gray-700">{festival}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Top Attractions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Top Attractions</h2>
        <ul className="space-y-3">
          {destination.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <span className="text-brand mr-3 text-xl">✓</span>
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Travel Tips */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Money-Saving Travel Tips</h2>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <ul className="space-y-3">
            {destination.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">💡</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BOTTOM SEARCH CTA - Multiple options! */}
      <div className="mt-12">
        <FlightSearchCTA
          from={destination.from}
          to={destination.to}
          variant="full"
          showPriceIndicator={true}
          estimatedPrice="$599"
        />
      </div>
    </main>
  );
}

// Generate static params for all destinations
export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((route) => ({
    route,
  }));
}
