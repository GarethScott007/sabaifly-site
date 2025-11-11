"use client";

import React, { useState } from "react";
import { Shuffle } from "lucide-react"; // icon for swap button

export default function SearchForm() {
  const [tripType, setTripType] = useState("round");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showTravellers, setShowTravellers] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleTravellerChange = (key: "adults" | "children" | "infants", delta: number) => {
    setTravellers((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <form
      className="
        grid grid-cols-1 md:grid-cols-[auto,1fr,auto,1fr,auto,auto,auto]
        items-center gap-2 md:gap-3 w-full
      "
    >
      {/* Trip Type */}
      <div className="flex gap-2 shrink-0 justify-center md:justify-start">
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

      {/* From */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleSwap}
          className="p-2 border border-brand rounded-full bg-white hover:bg-brand hover:text-white transition"
          title="Swap locations"
        >
          <Shuffle size={16} />
        </button>
      </div>

      {/* To */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
        />
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-center">
        <input
          type="date"
          className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none w-full"
        />
        {tripType === "round" && (
          <input
            type="date"
            className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none w-full"
          />
        )}
      </div>

      {/* Travellers Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTravellers(!showTravellers)}
          className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1 focus:ring-2 focus:ring-brand outline-none whitespace-nowrap"
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
      <div className="flex justify-center md:justify-end">
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </form>
  );
}
