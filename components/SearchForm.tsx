"use client";

import React, { useState, useEffect, useRef } from "react";
import { Shuffle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const [tripType, setTripType] = useState("round");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showTravellers, setShowTravellers] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; code: string; city_name: string }[]>([]);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const toRef = useRef<HTMLInputElement>(null);

  // Fetch airport suggestions (debounced)
  useEffect(() => {
    const q = activeField === "from" ? from : to;
    if (!q) return;

    const t = setTimeout(async () => {
      const res = await fetch(`/api/suggest?q=${q}`);
      const data = await res.json();
      setSuggestions(data.slice(0, 200));
    }, 300);

    return () => clearTimeout(t);
  }, [from, to, activeField]);

  const handleSelect = (value: string) => {
    if (activeField === "from") {
      setFrom(value);
      setActiveField("to");
      toRef.current?.focus();
    } else {
      setTo(value);
      setActiveField(null);
    }
    setSuggestions([]);
  };

  const handleTravellerChange = (key: "adults" | "children" | "infants", delta: number) => {
    setTravellers((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      from,
      to,
      tripType,
      adults: String(travellers.adults),
      children: String(travellers.children),
      infants: String(travellers.infants),
    }).toString();
    router.push(`/flights/results?${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto,1fr,auto,auto,auto]
      items-center gap-2 md:gap-3 w-full relative"
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
          onFocus={() => setActiveField("from")}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
        />
        {activeField === "from" && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow z-40 max-h-60 overflow-y-auto text-sm">
            {suggestions.map((s) => (
              <li
                key={s.code}
                onClick={() => handleSelect(`${s.name} (${s.code})`)}
                className="px-3 py-2 hover:bg-brand/10 cursor-pointer"
              >
                {s.name} — {s.city_name} ({s.code})
              </li>
            ))}
          </ul>
        )}
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
          ref={toRef}
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          onFocus={() => setActiveField("to")}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
        />
        {activeField === "to" && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow z-40 max-h-60 overflow-y-auto text-sm">
            {suggestions.map((s) => (
              <li
                key={s.code}
                onClick={() => handleSelect(`${s.name} (${s.code})`)}
                className="px-3 py-2 hover:bg-brand/10 cursor-pointer"
              >
                {s.name} — {s.city_name} ({s.code})
              </li>
            ))}
          </ul>
        )}
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
