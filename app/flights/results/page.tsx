import { Suspense } from "react";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import SkeletonFlightCard from "@/components/SkeletonFlightCard";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";

interface SearchParams {
  from: string;
  to: string;
}

/**
 * Fetch live flight data from Travelpayouts
 */
async function getFlights(params: SearchParams) {
  const token = process.env["TP_TOKEN"] as string;
  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${params.from}&destination=${params.to}&token=${token}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  return res.json();
}

/**
 * SabaiFly Flight Results Page
 */
export default async function Results({ searchParams }: { searchParams: SearchParams }) {
  const data = await getFlights(searchParams);
  const flights = data.data || [];

  // Sort by price ascending (can easily extend to duration etc.)
  const sorted = [...flights].sort((a, b) => a.price - b.price);

  // Create top date ribbon (unique days from dataset)
  const displayDates = Array.from(
    new Set(sorted.map((f) => f.departure_at.slice(0, 10)))
  ).slice(0, 7);

  return (
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 md:px-8 py-10 gap-6">
      {/* Sidebar Filters */}
      <FilterSidebar onChange={(filters: FilterState) => {}} />

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer onChange={(filters: FilterState) => {}} />

      {/* Main Results List */}
      <section className="flex-1">
        <Suspense fallback={<SkeletonFlightCard />}>
          {sorted.map((flight: any) => (
            <div key={flight.id} className="mb-4">
              <div className="p-4 border rounded">
                <div className="font-medium">
                  {flight.origin} → {flight.destination}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(flight.departure_at).toLocaleString()} — £{flight.price}
                </div>
              </div>
            </div>
          ))}
        </Suspense>
      </section>
    </main>
  );
}
