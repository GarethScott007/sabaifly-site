import { Suspense } from "react";

async function getFlights(params: any) {
  const token = process.env["TP_TOKEN"] as string;
  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${params.from}&destination=${params.to}&token=${token}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  return res.json();
}

export default async function Results({ searchParams }: { searchParams: any }) {
  const data = await getFlights(searchParams);
  const flights = data.data || [];

  const sorted = [...flights].sort((a, b) => a.price - b.price);
  const displayDates = Array.from(new Set(sorted.map((f) => f.departure_at.slice(0, 10)))).slice(0, 7);

  return (
    <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 md:px-8 py-10 gap-6">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 bg-white border rounded-xl p-4 h-fit sticky top-8 hidden md:block">
        <h3 className="font-semibold mb-3 text-brand">Filters</h3>

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium mb-1">Stops</p>
            <label className="block"><input type="checkbox" className="mr-2" /> Direct</label>
            <label className="block"><input type="checkbox" className="mr-2" /> 1 stop</label>
            <label className="block"><input type="checkbox" className="mr-2" /> 2+ stops</label>
          </div>
          <div>
            <p className="font-medium mb-1">Baggage</p>
            <label className="block"><input type="checkbox" className="mr-2" /> Cabin bag</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Checked bag</label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        <h1 className="text-2xl font-semibold mb-3">
          Flights from {searchParams.from} to {searchParams.to}
        </h1>

        {/* Date Ribbon */}
        <div className="flex gap-2 overflow-x-auto py-3 mb-6 scrollbar-thin">
          {displayDates.map((date) => (
            <button
              key={date}
              className="px-4 py-2 rounded-full border text-sm bg-white hover:bg-brand hover:text-white whitespace-nowrap transition"
            >
              {date}
            </button>
          ))}
        </div>

        {/* Flights List */}
        <Suspense fallback={<p>Loading flights…</p>}>
          {sorted.length ? (
            <div className="grid gap-4">
              {sorted.map((f: any) => (
                <a
                  key={f.link}
                  href={`https://www.aviasales.com${f.link}?marker=YOUR_MARKER&utm_source=sabaifly`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-lg">
                      {f.origin} → {f.destination}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {f.departure_at.slice(0, 10)} • {f.duration} min • {f.transfers} stops
                    </p>
                    <p className="text-sm text-neutral-500">
                      Airline: {f.airline || "Multiple"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-brand">${f.price}</p>
                    <button className="mt-2 px-4 py-1.5 rounded-full bg-brand text-white text-sm hover:bg-brand-dark">
                      Book →
                    </button>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-neutral-600">No flights found for these dates.</p>
          )}
        </Suspense>
      </section>
    </main>
  );
}
