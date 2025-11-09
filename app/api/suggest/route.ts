import { NextRequest, NextResponse } from "next/server";

// Server-side autocomplete via Travelpayouts (set TP_TOKEN / TP_MARKET in env)
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("query") || "").trim();
  if (!q || q.length < 2) return NextResponse.json({ items: [] }, { status: 200 });

  const token = process.env.TP_TOKEN;
  const market = (process.env.TP_MARKET || "en").toLowerCase();
  if (!token) return NextResponse.json({ items: [] }, { status: 200 });

  const api = new URL("https://autocomplete.travelpayouts.com/jravia?v=3");
  api.set("locale", market); api.set("q", q);

  const r = await fetch(api);
  if (!r.ok) return NextResponse.json({ items: [] }, { status: 200 });

  const data = (await r.json()) as any[];
  const items = (Array.isArray(data) ? data : [])
    .map((x) => ({ code: String(x.code || "").toUpperCase().slice(0, 4), name: String(x.name || "").slice(0, 120) }))
    .filter((x) => /^[A-Z]{2,4}$/.test(x.code))
    .slice(0, 50);

  return NextResponse.json({ items }, { status: 200, headers: { "cache-control": "public, max-age=300" } });
}
