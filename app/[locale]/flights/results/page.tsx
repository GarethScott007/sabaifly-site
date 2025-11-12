import { Suspense } from "react";
import FlightResults from "@/components/FlightResults";
import SkeletonFlightCard from "@/components/SkeletonFlightCard";
import { SearchParams, TravelpayoutsFlight, TravelpayoutsApiResponse } from "@/lib/types";
import { CACHE_TIMES, EXTERNAL_APIS } from "@/lib/constants";

/**
 * Fetch live flight data via our internal API
 */
async function getFlights(params: SearchParams): Promise<TravelpayoutsApiResponse> {
  const currency = process.env["CURRENCY"] || "USD";
  const baseUrl = process.env["NEXT_PUBLIC_BASE_URL"] || "https://www.sabaifly.com";

  // Use provided date or default to tomorrow
  const departureDate = params.departDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const url = `${baseUrl}/api/live?origin=${params.from}&destination=${params.to}&departure_date=${departureDate}&currency=${currency}`;
  const res = await fetch(url, { next: { revalidate: CACHE_TIMES.FLIGHT_PRICES } });

  if (!res.ok) {
    throw new Error(`Failed to fetch flights: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Transform the response to match the expected format
  return {
    success: data.success,
    data: data.flights || [],
    currency: data.currency,
  };
}

/**
 * SabaiFly Flight Results Page
 */
export default async function Results({ searchParams }: { searchParams: SearchParams }) {
  const data = await getFlights(searchParams);
  const flights: TravelpayoutsFlight[] = data.data || [];

  // Sort by price ascending (can easily extend to duration etc.)
  const sorted = [...flights].sort((a, b) => a.price - b.price);

  // Create top date ribbon (unique days from dataset)
  const displayDates = Array.from(
    new Set(sorted.map((f) => f.departure_at.slice(0, 10)))
  ).slice(0, 7) as string[];

  return (
    <Suspense fallback={<SkeletonFlightCard />}>
      <FlightResults flights={sorted} displayDates={displayDates} />
    </Suspense>
  );
}
