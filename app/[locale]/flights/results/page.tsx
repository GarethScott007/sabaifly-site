import { Suspense } from "react";
import FlightResults from "@/components/FlightResults";
import SkeletonFlightCard from "@/components/SkeletonFlightCard";
import { SearchParams, TravelpayoutsFlight, TravelpayoutsApiResponse } from "@/lib/types";
import { CACHE_TIMES, EXTERNAL_APIS } from "@/lib/constants";

/**
 * Fetch live flight data from Travelpayouts
 */
async function getFlights(params: SearchParams): Promise<TravelpayoutsApiResponse> {
  const token = process.env["TP_TOKEN"];
  if (!token) {
    throw new Error("TP_TOKEN environment variable not set");
  }

  const url = `${EXTERNAL_APIS.TRAVELPAYOUTS.BASE_URL}${EXTERNAL_APIS.TRAVELPAYOUTS.PRICES_FOR_DATES}?origin=${params.from}&destination=${params.to}&token=${token}`;
  const res = await fetch(url, { next: { revalidate: CACHE_TIMES.FLIGHT_PRICES } });

  if (!res.ok) {
    throw new Error(`Failed to fetch flights: ${res.status} ${res.statusText}`);
  }

  return res.json();
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
