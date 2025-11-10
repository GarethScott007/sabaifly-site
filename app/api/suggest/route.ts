import { NextResponse } from "next/server";

export const revalidate = 600; // Cache for 10 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2)
    return NextResponse.json({ items: [] }, { status: 200 });

  const token = process.env["TP_TOKEN"];
  const market = (process.env["TP_MARKET"] || "en").toLowerCase();

  if (!token)
    return NextResponse.json({ items: [] }, { status: 200 });

  const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(
    q
  )}&locale=${market}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Access-Token": token,
      },
      cache: "force-cache",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Travelpayouts API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
