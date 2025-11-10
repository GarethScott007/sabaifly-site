"use client";

import React, { useEffect, useRef } from "react";

export default function SearchForm() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const tripButtons = form.querySelectorAll("button[data-trip]");
    const ret = form.querySelector<HTMLInputElement>("[name='return']");

    tripButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active classes from all buttons
        tripButtons.forEach((b) => b.classList.remove("bg-brand", "text-white"));
        // Add active state to clicked button
        btn.classList.add("bg-brand", "text-white");

        // Use TypeScript-safe dataset access
        const tripType = btn.dataset["trip"];

        if (tripType === "oneway") {
          if (ret) {
            ret.value = "";
            ret.disabled = true;
          }
        } else if (ret) {
          ret.disabled = false;
        }
      });
    });

    // Cleanup
    return () => {
      tripButtons.forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true));
      });
    };
  }, []);

  return (
    <form ref={formRef} className="flex flex-col sm:flex-row gap-3 items-center justify-center p-4">
      <div className="flex gap-2">
        <button
          type="button"
          data-trip="round"
          className="px-4 py-2 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors"
        >
          Round Trip
        </button>
        <button
          type="button"
          data-trip="oneway"
          className="px-4 py-2 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors"
        >
          One Way
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-lg">
        <input
          type="text"
          name="from"
          placeholder="From"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand outline-none"
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand outline-none"
        />
        <input
          type="date"
          name="depart"
          placeholder="Departure"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand outline-none"
        />
        <input
          type="date"
          name="return"
          placeholder="Return"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
