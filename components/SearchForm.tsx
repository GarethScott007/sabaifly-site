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
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const toRef = useRef<HTMLInputElement>(null);

  // Debounced autocomplete
  useEffect(() => {
    const q = activeField === "from" ? from : to;
    if (!q) return;

    const t = setTimeout(async () => {
      const res = await fetch(`/api/suggest?q=${q}`);
      const data = await res.json();
      setSuggestions(data.slice(0, 200)); // Limit to 200+
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

      {/* Travellers (same as before) */}
      {/* ...existing travellers dropdown... */}

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
