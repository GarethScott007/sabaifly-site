import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  // Add more destinations as needed
} as const;

type RouteParams = {
  params: { route: string };
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const destination = DESTINATIONS[params.route as keyof typeof DESTINATIONS];

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

export default function DestinationPage({ params }: RouteParams) {
  const destination = DESTINATIONS[params.route as keyof typeof DESTINATIONS];

  if (!destination) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {destination.fromCity} to {destination.toCity}
        </h1>
        <p className="text-xl text-gray-600">
          Complete travel guide for your flight from {destination.from} to {destination.to}
        </p>
      </div>

      {/* Search Flights CTA */}
      <div className="bg-brand/10 border-2 border-brand rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-brand mb-3">Find Flights</h2>
        <p className="text-gray-700 mb-4">
          Ready to book? Search for the best deals on flights from {destination.fromCity} to{" "}
          {destination.toCity}.
        </p>
        <Link
          href={`/flights/results?from=${destination.from}&to=${destination.to}`}
          className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition"
        >
          Search Flights →
        </Link>
      </div>

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

      {/* Bottom CTA */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Ready to explore {destination.toCity}?
        </h2>
        <p className="text-gray-600 mb-6">
          Compare prices from multiple airlines and book your {destination.fromCity} to{" "}
          {destination.toCity} flight today.
        </p>
        <Link
          href={`/flights/results?from=${destination.from}&to=${destination.to}`}
          className="inline-block bg-brand text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-dark transition text-lg"
        >
          Find Cheapest Flights
        </Link>
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
