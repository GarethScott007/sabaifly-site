"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";

export default function MobileFilterDrawer({
  onChange,
}: {
  onChange: (f: FilterState) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand text-white rounded-full p-4 shadow-lg md:hidden hover:bg-brand-dark transition"
        aria-label="Open Filters"
      >
        <SlidersHorizontal size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col">
          {/* Header */}
          <div className="bg-white p-4 flex justify-between items-center shadow">
            <h2 className="text-lg font-semibold text-brand">Filters</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 transition"
              aria-label="Close Filters"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto bg-white p-4">
            <FilterSidebar onChange={onChange} />
          </div>

          {/* Apply Button */}
          <div className="bg-white p-4 border-t">
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-brand text-white py-2.5 rounded-full text-sm font-medium hover:bg-brand-dark transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
