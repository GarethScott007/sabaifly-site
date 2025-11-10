import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function FlightStatusPage({ params }: { params: { code: string } }) {
  // Fetch live flight data from Aviationstack
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/status?flight_iata=${params.code}`, {
    next: { revalidate: 600 },
  });
  const flight = await res.json();

  if (!flight?.flight) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center p-6">
        <p className="text-lg text-neutral-600">Flight not found. Please try another code.</p>
      </main>
    );
  }

  const dep = flight.departure?.iata || "";
  const arr = flight.arrival?.iata || "";
  const route = dep && arr ? `${dep}-${arr}` : "";
  const travelpayoutsLink = route
    ? `https://www.travelpayouts.com/flights/${route}?marker=${process.env.NEXT_PUBLIC_TP_MARKER}`
    : `https://www.travelpayouts.com/?marker=${process.env.NEXT_PUBLIC_TP_MARKER}`;

  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col items-center">
      <section className="w-full max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2">Flight {flight.flight.iata}</h1>
        <p className="text-sm text-neutral-500 mb-6">
          {flight.departure.airport} ({flight.departure.iata}) → {flight.arrival.airport} ({flight.arrival.iata})
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-neutral-200 shadow-sm p-6 bg-white/70 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Airline</p>
              <p className="font-medium">{flight.airline.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Status</p>
              <p className="font-medium text-blue-600">{flight.flight.status}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Departure</p>
              <p className="font-medium">
                {flight.departure.airport} — {new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Arrival</p>
              <p className="font-medium">
                {flight.arrival.airport} — {new Date(flight.arrival.estimated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Aircraft</p>
              <p className="font-medium">{flight.aircraft?.model || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Registration</p>
              <p className="font-medium">{flight.aircraft?.reg || "N/A"}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sticky footer with dynamic Travelpayouts link */}
      <footer className="sticky bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-neutral-200 p-4 flex gap-3 justify-center">
        <Link
          href="/search"
          prefetch
          className="relative px-6 py-3 rounded-full text-sm font-medium text-neutral-900 bg-white shadow-sm border border-neutral-300 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 group"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-gray-200/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative">Track Another Flight</span>
        </Link>

        <a
          href={travelpayoutsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-3 rounded-full text-sm font-medium text-white bg-blue-600 shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 group"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-slate-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative">Search Return Fares</span>
        </a>
      </footer>
    </main>
  );
}
