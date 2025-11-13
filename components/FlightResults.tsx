"use client";

import { useState, useMemo } from "react";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import { TIME_RANGES, AFFILIATE_LINKS } from "@/lib/constants";
import { TravelpayoutsFlight, SearchParams } from "@/lib/types";

interface FlightResultsProps {
  flights: TravelpayoutsFlight[];
  displayDates: string[];
  searchParams: SearchParams;
}

export default function FlightResults({ flights, displayDates, searchParams }: FlightResultsProps) {
  // Get the affiliate marker from environment variables
  const affiliateMarker = process.env["NEXT_PUBLIC_TP_MARKER"] || '670577';

  // Build Kiwi.com deep link with search parameters
  const departDate = (searchParams.departDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]) as string;
  const returnDate = searchParams.returnDate;

  // Kiwi.com uses format: dateFrom=DD/MM/YYYY&dateTo=DD/MM/YYYY
  const formatDateForKiwi = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const formattedDepartDate = formatDateForKiwi(departDate);
  const returnParam = returnDate ? `&return=${formatDateForKiwi(returnDate)}` : '';
  const kiwiSearchUrl = `https://www.kiwi.com/deep?affilid=670577&from=${searchParams.from}&to=${searchParams.to}&departure=${formattedDepartDate}${returnParam}&currency=GBP`;

  const [filters, setFilters] = useState<FilterState>({
    stops: [],
    timeOfDay: [],
    baggage: [],
  });

  // Filter flights based on current filter state
  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      // Filter by stops
      if (filters.stops.length > 0) {
        const transfers = flight.transfers ?? 0;
        const matchesStops = filters.stops.some((stop) => {
          if (stop === "Direct") return transfers === 0;
          if (stop === "1 Stop") return transfers === 1;
          if (stop === "2+ Stops") return transfers >= 2;
          return false;
        });
        if (!matchesStops) return false;
      }

      // Filter by time of day (based on arrival time if available, otherwise departure)
      if (filters.timeOfDay.length > 0) {
        const timeStr = flight.return_at || flight.departure_at;
        const hour = new Date(timeStr).getHours();
        const matchesTime = filters.timeOfDay.some((time) => {
          if (time === "Morning") {
            return hour >= TIME_RANGES.MORNING.start && hour < TIME_RANGES.MORNING.end;
          }
          if (time === "Afternoon") {
            return hour >= TIME_RANGES.AFTERNOON.start && hour < TIME_RANGES.AFTERNOON.end;
          }
          if (time === "Evening") {
            return hour >= TIME_RANGES.EVENING.start && hour < TIME_RANGES.EVENING.end;
          }
          if (time === "Night") {
            return hour >= TIME_RANGES.NIGHT.start || hour < TIME_RANGES.NIGHT.end;
          }
          return false;
        });
        if (!matchesTime) return false;
      }

      // Filter by baggage
      // Note: The Travelpayouts API doesn't provide baggage info directly
      // This is a placeholder - in production you'd need to check airline baggage policies
      // or use a different API that provides this data
      if (filters.baggage.length > 0) {
        // For now, we'll assume all flights have at least cabin bag
        // This should be replaced with actual baggage data from the API
        const hasCabinBag = true;
        const hasCheckedBag = true; // Placeholder

        const matchesBaggage = filters.baggage.some((bag) => {
          if (bag === "Cabin Bag") return hasCabinBag;
          if (bag === "Checked Bag") return hasCheckedBag;
          return false;
        });
        if (!matchesBaggage) return false;
      }

      return true;
    });
  }, [flights, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 md:px-8 py-10 gap-6">
      {/* Sidebar Filters */}
      <FilterSidebar onChange={handleFilterChange} />

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer onChange={handleFilterChange} />

      {/* Main Results List */}
      <section className="flex-1">
        {/* Kiwi.com Alternative Flight Search */}
        {flights.length < 5 && (
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h3 className="text-blue-900 font-semibold mb-2">Want more flight options?</h3>
            <p className="text-blue-700 text-sm mb-3">
              Search hundreds of airlines and travel sites on Kiwi.com for the best deals
            </p>
            <a
              href={kiwiSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm"
            >
              Search on Kiwi.com →
            </a>
          </div>
        )}

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          {filteredFlights.length === flights.length ? (
            <p>Showing all {flights.length} flights</p>
          ) : (
            <p>
              Showing {filteredFlights.length} of {flights.length} flights
            </p>
          )}
        </div>

        {/* Date ribbon (optional enhancement) */}
        {displayDates.length > 0 && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {displayDates.map((date) => (
              <button
                key={date}
                className="px-4 py-2 bg-white border rounded-lg text-sm whitespace-nowrap hover:bg-brand-light hover:text-white transition"
              >
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </button>
            ))}
          </div>
        )}

        {/* Flight cards */}
        {filteredFlights.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500 mb-2">No flights match your filters</p>
            <button
              onClick={() =>
                setFilters({ stops: [], timeOfDay: [], baggage: [] })
              }
              className="text-brand hover:text-brand-dark underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="mb-4">
              <div className="p-6 border rounded-lg bg-white hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">
                      {flight.origin} → {flight.destination}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {flight.airline}
                      {flight.flight_number ? ` • ${flight.flight_number}` : ""}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand">
                      £{flight.price}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-600">
                    <div>
                      Departs:{" "}
                      {new Date(flight.departure_at).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                    {flight.transfers !== undefined && (
                      <div className="mt-1">
                        {flight.transfers === 0 && (
                          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                            Direct
                          </span>
                        )}
                        {flight.transfers === 1 && (
                          <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                            1 Stop
                          </span>
                        )}
                        {flight.transfers! >= 2 && (
                          <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs">
                            {flight.transfers} Stops
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <a
                    href={
                      flight.link
                        ? `https://www.aviasales.com${flight.link.split('?')[0]}?marker=${affiliateMarker}`
                        : `https://www.aviasales.com/search/${flight["origin_airport"] || flight.origin}${flight.departure_at.slice(5, 10).replace('-', '')}${flight["destination_airport"] || flight.destination}1?marker=${affiliateMarker}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-brand text-white rounded-full hover:bg-brand-dark transition text-sm font-medium"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
