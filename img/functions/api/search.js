// functions/api/search.js — robust Aviasales/Travelpayouts search (HTTPS + airport→city + debug)

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra
    }
  });
}

// Common multi-airport city mappings so LGW/LHR→LON, DMK→BKK, etc.
const CITY_BY_AIRPORT = {
  // London
  LHR: "LON", LGW: "LON", STN: "LON", LTN: "LON", LCY: "LON", SEN: "LON",
  // New York
  JFK: "NYC", LGA: "NYC", EWR: "NYC",
  // Tokyo
  HND: "TYO", NRT: "TYO",
  // Paris
  CDG: "PAR", ORY: "ORY", BVA: "PAR", // ORY stays ORY for some endpoints; keep PAR fallback too
  // Washington DC
  IAD: "WAS", DCA: "WAS", BWI: "WAS",
  // Chicago
  ORD: "CHI", MDW: "CHI",
  // Osaka
  KIX: "OSA", ITM: "OSA",
  // Milan
  MXP: "MIL", LIN: "MIL", BGY: "MIL",
  // Rome
  FCO: "ROM", CIA: "ROM",
  // São Paulo
  GRU: "SAO", CGH: "SAO", VCP: "SAO",
  // Rio
  GIG: "RIO", SDU: "RIO",
  // Shanghai
  PVG: "SHA", SHA: "SHA",
  // Beijing
  PEK: "BJS", PKX: "BJS",
  // Bangkok
  DMK: "BKK", BKK: "BKK"
};

const toCity = (code) => {
  if (!code) return "";
  const c = code.toUpperCase().trim();
  return CITY_BY_AIRPORT[c] || c;
};

const isoDay = (s) => String(s || "").match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "";
const shift = (day, d) => {
  if (!day) return "";
  const t = new Date(day + "T00:00:00Z");
  t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};

// Call and parse JSON safely
async function hit(url) {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  const body = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, body };
}

export async function onRequest({ request, env }) {
  try {
    const u = new URL(request.url);
    const p = u.searchParams;

    // Inputs
    const origin = toCity(p.get("origin"));
    const destination = toCity(p.get("destination"));
    const departure_at = isoDay(p.get("departure_at"));
    const return_at = isoDay(p.get("return_at"));
    const currency = (p.get("currency") || "GBP").toUpperCase();
    const direct = String(p.get("direct") || "false") === "true";
    const limit = Math.min(parseInt(p.get("limit") || "60", 10) || 60, 100);
    const debug = p.has("debug");

    if (!origin || !destination || !departure_at) {
      return json({
        success: false,
        error: "Missing required params",
        have: { origin: !!origin, destination: !!destination, departure_at: !!departure_at }
      }, 400);
    }

    // Primary endpoint (HTTPS): prices_for_dates
    const base = new URL("https://api.travelpayouts.com/aviasales/v3/prices_for_dates");
    base.searchParams.set("origin", origin);
    base.searchParams.set("destination", destination);
    base.searchParams.set("currency", currency);
    base.searchParams.set("direct", String(direct));
    base.searchParams.set("limit", String(limit));
    base.searchParams.set("token", env.TP_TOKEN);

    // Try a small ±7 day sweep server-side (mirrors your FE sweep)
    const sweep = [0, -1, 1, -2, 2, -3, 3, -5, 5, -7, 7].map(i => shift(departure_at, i));
    let lastTried = "";

    for (const depart of sweep) {
      const url = new URL(base);
      url.searchParams.set("departure_at", depart);
      if (return_at) url.searchParams.set("return_at", return_at);
      lastTried = url.toString();

      const { ok, status, body } = await hit(lastTried);
      const rows = Array.isArray(body?.data) ? body.data : [];
      if (ok && rows.length) {
        const out = { success: true, total: rows.length, source: "travelpayouts", data: rows };
        if (debug) out.debug = { upstream: lastTried.replace(env.TP_TOKEN || "", "****") };
        return json(out);
      }
    }

    // Fallback: if nothing returned, respond with empty but include debug upstream URL
    const out = { success: true, total: 0, source: "travelpayouts", data: [] };
    if (debug && lastTried) out.debug = { upstream: lastTried.replace(env.TP_TOKEN || "", "****") };
    return json(out);
  } catch (err) {
    return json({ success: false, error: String(err?.message || err) }, 500);
  }
}
