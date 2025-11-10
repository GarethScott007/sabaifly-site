"use client";

import React from "react";

export default function SearchForm() {
  return (
    <form className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-3 w-full">
      {/* Trip Type */}
      <div className="flex gap-2 shrink-0">
        <button
          type="button"
          className="px-3 py-1.5 border border-brand text-brand rounded-full text-sm hover:bg-brand hover:text-white transition"
        >
          Round Trip
        </button>
        <button
          type="button"
          className="px-3 py-1.5 border border-brand text-brand rounded-full text-sm hover:bg-brand hover:text-white transition"
        >
          One Way
        </button>
      </div>

      {/* From / To */}
      <input
        type="text"
        name="from"
        placeholder="From"
        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />
      <input
        type="text"
        name="to"
        placeholder="To"
        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />

      {/* Dates */}
      <input
        type="date"
        name="depart"
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />
      <input
        type="date"
        name="return"
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      />

      {/* Travellers */}
      <select
        name="travellers"
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none"
      >
        <option>1 Adult</option>
        <option>2 Adults</option>
        <option>1 Adult, 1 Child</option>
        <option>2 Adults, 1 Child, 1 Infant</option>
        <option>Custom...</option>
      </select>

      {/* Search */}
      <button
        type="submit"
        className="px-5 py-2 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition"
      >
        Search
      </button>
    </form>
  );
}
