import { NextResponse } from "next/server";

/**
 * Travelpayouts Autocomplete API Proxy
 * -------------------------------------
 * Protects your API token and allows client-side autocomplete
 * requests through /api/suggest?q=<term>
 *
 * Docs: https://www.travelpayouts.com/tools/api
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
   const token = process.env["TP_TOKEN"] as string;


    if (!q.trim()) {
      return NextResponse.json([], { status: 200 });
    }

    const url = `https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&term=${encodeURIComponent(
      q
    )}`;

    const response = await fetch(url, {
      headers: {
        "X-Access-Token": token ?? "",
      },
      next: { revalidate: 60 }, // optional caching (1 minute)
    });

    if (!response.ok) {
      console.error("Travelpayouts API error:", response.statusText);
      return NextResponse.json(
        { error: "Failed to fetch autocomplete data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Limit to 200 suggestions for performance
    const limited = Array.isArray(data) ? data.slice(0, 200) : [];

    return NextResponse.json(limited);
  } catch (error) {
    console.error("Autocomplete route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
