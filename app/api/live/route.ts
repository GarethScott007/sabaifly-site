import { NextResponse } from "next/server";

/**
 * Live flight pricing API
 * Fetches real-time flight prices from Travelpayouts
 * Supports query params: origin, destination, departure_date, return_date (optional), currency
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departure_date");
    const returnDate = searchParams.get("return_date");
    const currency = searchParams.get("currency") || "GBP";

    // Validate required parameters
    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        {
          error: "Missing required parameters",
          required: ["origin", "destination", "departure_date"],
        },
        { status: 400 }
      );
    }

    // Validate IATA codes (should be 3 letters)
    const iataRegex = /^[A-Z]{3}$/;
    if (!iataRegex.test(origin) || !iataRegex.test(destination)) {
      return NextResponse.json(
        {
          error: "Invalid IATA codes. Must be 3-letter airport codes (e.g., LHR, JFK)",
        },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departureDate)) {
      return NextResponse.json(
        {
          error: "Invalid date format. Use YYYY-MM-DD",
        },
        { status: 400 }
      );
    }

    if (returnDate && !dateRegex.test(returnDate)) {
      return NextResponse.json(
        {
          error: "Invalid return date format. Use YYYY-MM-DD",
        },
        { status: 400 }
      );
    }

    const token = process.env["TP_TOKEN"];
    if (!token) {
      console.error("TP_TOKEN environment variable not set");
      return NextResponse.json(
        {
          error: "API configuration error",
        },
        { status: 500 }
      );
    }

    // Build API URL
    let apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_at=${departureDate}&currency=${currency}&token=${token}`;

    if (returnDate) {
      apiUrl += `&return_at=${returnDate}`;
    }

    // Fetch from Travelpayouts
    const response = await fetch(apiUrl, {
      next: { revalidate: 180 }, // Cache for 3 minutes (live pricing changes frequently)
    });

    if (!response.ok) {
      console.error(`Travelpayouts API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        {
          error: "Failed to fetch flight prices",
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data
    return NextResponse.json({
      success: true,
      origin,
      destination,
      departureDate,
      returnDate,
      currency,
      flights: data.data || [],
      meta: {
        count: data.data?.length || 0,
        cachedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in /api/live:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

