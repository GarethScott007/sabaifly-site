"use client";

import React, { useState } from "react";

export interface FilterState {
  stops: string[];
  timeOfDay: string[];
  baggage: string[];
}

interface FilterSidebarProps {
  onChange: (f: FilterState) => void;
  showAdditionalServices?: boolean;
}

export default function FilterSidebar({ onChange, showAdditionalServices = true }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    stops: [],
    timeOfDay: [],
    baggage: [],
  });

  const toggle = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const active = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      const next = { ...prev, [key]: active };
      onChange(next);
      return next;
    });
  };

  return (
    <aside className="w-full md:w-1/4 bg-white border rounded-xl p-4 h-fit sticky top-8 hidden md:block">
      <h3 className="font-semibold mb-3 text-brand">Filters</h3>

      <div className="space-y-4 text-sm">
        <div>
          <p className="font-medium mb-1">Stops</p>
          {["Direct", "1 Stop", "2+ Stops"].map((label) => (
            <label key={label} className="block cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.stops.includes(label)}
                onChange={() => toggle("stops", label)}
              />
              {label}
            </label>
          ))}
        </div>

        <div>
          <p className="font-medium mb-1">Time of Day (Arrival)</p>
          {["Morning", "Afternoon", "Evening", "Night"].map((label) => (
            <label key={label} className="block cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.timeOfDay.includes(label)}
                onChange={() => toggle("timeOfDay", label)}
              />
              {label}
            </label>
          ))}
        </div>

        <div>
          <p className="font-medium mb-1">Baggage</p>
          {["Cabin Bag", "Checked Bag"].map((label) => (
            <label key={label} className="block cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.baggage.includes(label)}
                onChange={() => toggle("baggage", label)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Complete Your Trip Section */}
      {showAdditionalServices && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold mb-3 text-brand text-sm">Complete Your Trip</h4>
          <div className="space-y-2">
            <a
              href={`https://tp.media/r?marker=${process.env["NEXT_PUBLIC_TP_MARKER"] || "670577"}&trs=470518&p=5104&u=https%3A%2F%2Fwww.booking.com&campaign_id=200`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-brand/10 to-brand-light/10 hover:from-brand/20 hover:to-brand-light/20 rounded-lg transition text-brand font-medium text-sm border border-brand/20"
            >
              <span className="text-lg">🏨</span>
              <span>Hotels</span>
            </a>
            <a
              href={`https://tp.media/r?marker=${process.env["NEXT_PUBLIC_TP_MARKER"] || "670577"}&trs=470518&p=647&u=https%3A%2F%2Fkiwitaxi.com&campaign_id=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-brand/10 to-brand-light/10 hover:from-brand/20 hover:to-brand-light/20 rounded-lg transition text-brand font-medium text-sm border border-brand/20"
            >
              <span className="text-lg">🚕</span>
              <span>Airport Taxi</span>
            </a>
            <a
              href={`https://tp.media/r?marker=${process.env["NEXT_PUBLIC_TP_MARKER"] || "670577"}&trs=470518&p=5996&u=https%3A%2F%2Fgetrentacar.com&campaign_id=222`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-brand/10 to-brand-light/10 hover:from-brand/20 hover:to-brand-light/20 rounded-lg transition text-brand font-medium text-sm border border-brand/20"
            >
              <span className="text-lg">🚗</span>
              <span>Car Rental</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
