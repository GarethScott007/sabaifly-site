"use client";
import { useEffect } from "react";

export default function SearchForm() {
  useEffect(() => {
    const origin = document.getElementById("origin") as HTMLInputElement | null;
    const destination = document.getElementById("destination") as HTMLInputElement | null;
    const ret = document.getElementById("return_at") as HTMLInputElement | null;
    const trip = document.getElementById("trip-type");

    const up = (el: HTMLInputElement | null) => el?.addEventListener("input", () => (el.value = el.value.toUpperCase().slice(0, 4)));
    up(origin); up(destination);

    trip?.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-trip]");
      if (!btn || !ret) return;
      trip.querySelectorAll("button").forEach((b) => b.classList.remove("bg-brand","text-white"));
      btn.classList.add("bg-brand","text-white");
      if (btn.dataset.trip === "oneway") { ret.value = ""; ret.disabled = true; } else { ret.disabled = false; }
    });
  }, []);

  return (
    <section aria-label="Search flights">
      <div className="rail">
        <form className="bg-white border border-br rounded-xl shadow-xl p-4" action="/flights/results" method="get">
          <div className="mb-2">
            <span className="text-xs text-muted">Trip type</span>
            <div id="trip-type" className="inline-flex gap-2 ml-2 align-middle">
              <button type="button" data-trip="return" className="chip bg-brand text-white">Return</button>
              <button type="button" data-trip="oneway" className="chip">One-way</button>
            </div>
          </div>
          <div className="grid gap-3 grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] items-end">
            <div><label htmlFor="origin" className="text-xs text-muted">From</label><input id="origin" name="origin" className="input" placeholder="LON" required /></div>
            <div><label htmlFor="destination" className="text-xs text-muted">To</label><input id="destination" name="destination" className="input" placeholder="BKK" required /></div>
            <div><label htmlFor="departure_at" className="text-xs text-muted">Depart</label><input id="departure_at" name="departure_at" type="date" className="input" required /></div>
            <div id="return-block"><label htmlFor="return_at" className="text-xs text-muted">Return</label><input id="return_at" name="return_at" type="date" className="input" /></div>
            <div><button type="submit" className="btn">Search</button></div>
          </div>
          <div className="grid gap-3 grid-cols-[1fr_1fr_1fr_1fr_auto] mt-3 items-end">
            <div><label className="text-xs text-muted" htmlFor="adults">Adults</label><input id="adults" name="adults" type="number" min={1} max={9} defaultValue={1} className="input" /></div>
            <div><label className="text-xs text-muted" htmlFor="children">Children</label><input id="children" name="children" type="number" min={0} max={8} defaultValue={0} className="input" /></div>
            <div><label className="text-xs text-muted" htmlFor="infants">Infants</label><input id="infants" name="infants" type="number" min={0} max={4} defaultValue={0} className="input" /></div>
            <div><label className="text-xs text-muted" htmlFor="currency">Currency</label>
              <select id="currency" name="currency" className="input"><option value="GBP">GBP</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="THB">THB</option></select>
            </div>
            <label className="chip align-middle"><input id="direct" name="direct" type="checkbox" value="true" /> Direct only</label>
          </div>
        </form>
      </div>
    </section>
  );
}
