// functions/api/suggest.js
export async function onRequest({ request }) {
  try {
    const url = new URL(request.url);
    const q = (url.searchParams.get("q") || "").trim();
    const locale = (url.searchParams.get("locale") || "en").toLowerCase();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10), 50);

    if (!q) {
      return new Response(JSON.stringify({ data: [] }), {
        status: 200, headers: { "content-type": "application/json" }
      });
    }

    const up = new URL("https://autocomplete.travelpayouts.com/places2");
    up.searchParams.set("term", q);
    up.searchParams.set("locale", locale);
    up.searchParams.append("types[]", "city");
    up.searchParams.append("types[]", "airport");

    const r = await fetch(up.toString(), { headers: { accept: "application/json" } });
    if (!r.ok) {
      return new Response(JSON.stringify({ error: `upstream ${r.status}` }), {
        status: 502, headers: { "content-type": "application/json" }
      });
    }

    const arr = await r.json();
    const data = Array.isArray(arr)
      ? arr.slice(0, limit).map(v => ({
          code: v.code || "",
          name: v.name || "",
          city: v.city_name || "",
          country: v.country_name || "",
          type: v.type || ""
        }))
      : [];

    return new Response(JSON.stringify({ data, locale }), {
      status: 200, headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "suggest error" }), {
      status: 500, headers: { "content-type": "application/json" }
    });
  }
}
