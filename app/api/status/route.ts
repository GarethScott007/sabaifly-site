import { NextResponse } from "next/server";

export const revalidate = 600; // cache for 10 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flight_iata = searchParams.get("flight_iata");
  const fresh = searchParams.get("fresh");

  if (!flight_iata) {
    return NextResponse.json({ error: "Missing flight_iata parameter" }, { status: 400 });
  }

  const url = `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVSTACK_KEY}&flight_iata=${flight_iata}`;

  try {
    const res = await fetch(url, { cache: fresh ? "no-store" : "force-cache" });
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    const flight = data.data[0];

    return NextResponse.json({
      flight: {
        iata: flight.flight.iata,
        status: flight.flight_status,
      },
      airline: {
        name: flight.airline.name,
        iata: flight.airline.iata,
      },
      aircraft: flight.aircraft,
      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        scheduled: flight.departure.scheduled,
        actual: flight.departure.actual,
      },
      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        estimated: flight.arrival.estimated,
        actual: flight.arrival.actual,
      },
    });
  } catch (error) {
    console.error("Aviationstack API error:", error);
    return NextResponse.json({ error: "Failed to fetch flight data" }, { status: 500 });
  }
}
