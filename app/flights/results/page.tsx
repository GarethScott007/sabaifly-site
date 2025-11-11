import { Suspense } from "react";

async function getFlights(params: any) {
 const token = process.env["TP_TOKEN"] as string;
  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${params.from}&destination=${params.to}&token=${token}`;
  const res = await fetch(url);
  return res.json();
}

export default async function Results({ searchParams }: { searchParams: any }) {
  const data = await getFlights(searchParams);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Flights from {searchParams.from} to {searchParams.to}
      </h1>

      <Suspense fallback={<p>Loading flights…</p>}>
        <div className="grid gap-4">
          {data.data?.map((f: any) => (
            <a
              key={f.link}
              href={`https://www.aviasales.com${f.link}`}
              target="_blank"
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {f.origin} → {f.destination}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {f.departure_at.slice(0, 10)} — {f.return_at?.slice(0, 10)}
                  </p>
                </div>
                <p className="font-semibold text-brand">
                  ${f.price} • {f.airline}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Suspense>
    </main>
  );
}
