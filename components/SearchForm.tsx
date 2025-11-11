"use client";

import React, { useState } from "react";

export default function SearchForm() {
  const [tripType, setTripType] = useState("round");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showTravellers, setShowTravellers] = useState(false);

  const handleTravellerChange = (key: "adults" | "children" | "infants", delta: number) => {
    setTravellers((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  return (
    <form className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-3 w-full">
      {/* Trip Type */}
      <div className="flex gap-2 shrink-0">
        {["round", "oneway"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-3 py-1.5 rounded-full border text-sm transition ${
              tripType === type
                ? "bg-brand text-white border-brand"
                : "border-brand text-brand hover:bg-brand/10"
            }`}
          >
            {type === "round" ? "Round Trip" : "One Way"}
          </button>
        ))}
      </div>

      {/* From / To */}
      <input
        type="text"
        placeholder="From"
        className="flex-1 min-w-[120px] px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />
      <input
        type="text"
        placeholder="To"
        className="flex-1 min-w-[120px] px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />

      {/* Dates */}
      <input
        type="date"
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />
      {tripType === "round" && (
        <input
          type="date"
          className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
        />
      )}

      {/* Travellers Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTravellers(!showTravellers)}
          className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1 focus:ring-2 focus:ring-brand outline-none"
        >
          {travellers.adults + travellers.children + travellers.infants} Traveller
          {travellers.adults + travellers.children + travellers.infants > 1 ? "s" : ""}
        </button>

        {showTravellers && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 z-30">
            {["adults", "children", "infants"].map((key) => (
              <div key={key} className="flex justify-between items-center mb-2">
                <span className="capitalize">{key}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleTravellerChange(key as "adults" | "children" | "infants", -1)
                    }
                    className="w-6 h-6 flex items-center justify-center border rounded hover:bg-brand hover:text-white"
                  >
                    -
                  </button>
                  <span>{travellers[key as "adults" | "children" | "infants"]}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleTravellerChange(key as "adults" | "children" | "infants", 1)
                    }
                    className="w-6 h-6 flex items-center justify-center border rounded hover:bg-brand hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setShowTravellers(false)}
              className="mt-2 w-full bg-brand text-white rounded-md py-1.5 text-sm hover:bg-brand-dark"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="px-5 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition"
      >
        Search
      </button>
    </form>
  );
}
