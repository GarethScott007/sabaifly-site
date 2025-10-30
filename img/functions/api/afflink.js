// functions/api/afflink.js
// v22.3 — Prefilled deep links for Kiwi & WayAway (+ Aviasales)
// - WayAway: stronger currency hints (GBP) + locale, while user can still change on-site
// Debug with &debug=1

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const provider = (url.searchParams.get("provider") || "avia").toLowerCase();

  // helpers
  const pick = (u, keys=[]) => { for (const k of keys) { const v=u.searchParams.get(k); if (v) return v; } return ""; };
  const up3  = s => String(s||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,3);
  const toISO = s => {
    s = String(s||"").trim();
    if (!s) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (!m) return "";
    let [_, d, mo, y] = m; if (y.length===2) y="20"+y;
    return `${y.padStart(4,"0")}-${mo.padStart(2,"0")}-${d.padStart(2,"0")}`;
  };

  // params
  const origin       = up3(pick(url, ["origin","origin_iata","from","o","orig"]));
  const destination  = up3(pick(url, ["destination","destination_iata","to","d","dest"]));
  let   departISO    = toISO(pick(url, ["depart","departure","departure_at","depart_date","date","date_from"]));
  let   returnISO    = toISO(pick(url, ["return","return_at","return_date","date_to"]));
  const adults       = String(pick(url, ["adults","adt","pax","pax_adults"]) || "1");
  const children     = String(pick(url, ["children","chd","pax_children"]) || "0");
  const infants      = String(pick(url, ["infants","inf","pax_infants"]) || "0");
  const currency     = String(pick(url, ["currency","cur"]) || (env.CURRENCY || "GBP")).toUpperCase();

  // env
  const marker       = (env.TP_PARTNER_ID || "").trim();
  const trs          = (env.TP_TRS || "").trim();
  const kiwiAff      = (env.KIWI_AFFILIATE_ID || "").trim();
  const wayawayP     = String(env.WAYAWAY_P || "5976");
  const wayawayCamp  = String(env.WAYAWAY_CAMPAIGN || "200");

  // metro → city mapping (WayAway likes city IATA)
  const CITY = {
    LON:["LHR","LGW","LTN","LCY","STN","SEN"], NYC:["JFK","EWR","LGA"],
    PAR:["CDG","ORY","BVA"], TYO:["HND","NRT"], SEL:["ICN","GMP"],
    WAS:["IAD","DCA","BWI"], SAO:["GRU","CGH","VCP"], RIO:["GIG","SDU"],
    BUE:["EZE","AEP"], MOW:["SVO","DME","VKO"], YTO:["YYZ","YTZ","YHM"],
    YMQ:["YUL","YHU"],
  };
  const toCity = code => {
    const c = String(code||"").toUpperCase();
    for (const k in CITY) if (k===c || CITY[k].includes(c)) return k;
    return c;
  };

  // builders
  function ddmm(iso){ if(!iso) return ""; const [y,m,d] = iso.split("-"); return d+m; }

  function aviasalesUrl(){
    let path = `${origin}${ddmm(departISO)}${destination}`;
    const r = ddmm(returnISO); if (r) path += r;
    const u = new URL(`https://www.aviasales.com/search/${path}`);
    if (origin)      u.searchParams.set("origin_iata", origin);
    if (destination) u.searchParams.set("destination_iata", destination);
    if (departISO)   u.searchParams.set("depart_date", departISO);
    if (returnISO)   u.searchParams.set("return_date", returnISO);
    u.searchParams.set("adults", adults);
    u.searchParams.set("children", children);
    u.searchParams.set("infants", infants);
    u.searchParams.set("currency", currency);
    return u;
  }

  function kiwiDeepDirect(){
    const u = new URL("https://www.kiwi.com/deep");
    if (origin)      u.searchParams.set("from", origin);
    if (destination) u.searchParams.set("to", destination);
    if (departISO)   u.searchParams.set("departure", departISO);
    if (returnISO)   u.searchParams.set("return", returnISO);
    u.searchParams.set("adults", adults);
    u.searchParams.set("children", children);
    u.searchParams.set("infants", infants);
    u.searchParams.set("currency", currency);
    if (kiwiAff) u.searchParams.set("affilid", kiwiAff);
    return u;
  }
  function kiwiDeepViaTP(){
    const deep = kiwiDeepDirect();
    const tp = new URL("https://c111.travelpayouts.com/click");
    tp.searchParams.set("shmarker", marker);
    tp.searchParams.set("promo_id", "3791");
    tp.searchParams.set("source_type", "customlink");
    tp.searchParams.set("type", "click");
    tp.searchParams.set("custom_url", encodeURIComponent(deep.toString()));
    if (trs) tp.searchParams.set("trs", trs);
    return tp;
  }
  function kiwiBasicClick(){
    const tp = new URL("https://tp.media/click");
    tp.searchParams.set("shmarker", marker);
    tp.searchParams.set("promo_id", "3413");
    tp.searchParams.set("source_type", "link");
    tp.searchParams.set("type", "click");
    tp.searchParams.set("campaign_id", "111");
    if (trs) tp.searchParams.set("trs", trs);
    return tp;
  }

  // WayAway deep link (send strong currency & locale hints)
  function wayawaySearchUrl(){
    const o = toCity(origin);
    const d = toCity(destination);
    const u = new URL("https://wayaway.io/search");
    if (o){ u.searchParams.set("origin_iata", o); u.searchParams.set("origin", o); }
    if (d){ u.searchParams.set("destination_iata", d); u.searchParams.set("destination", d); }
    if (departISO){ u.searchParams.set("depart_date", departISO); u.searchParams.set("departure", departISO); }
    if (returnISO){ u.searchParams.set("return_date", returnISO); u.searchParams.set("return", returnISO); }
    u.searchParams.set("with_request", "true");
    u.searchParams.set("oneway", returnISO ? "0" : "1");
    u.searchParams.set("adults", adults);
    u.searchParams.set("children", children);
    u.searchParams.set("infants", infants);

    // currency & locale (send multiple synonyms so their parser picks GBP)
    const C = (currency || "GBP").toUpperCase();
    u.searchParams.set("currency", C);          // primary
    u.searchParams.set("cur", C);               // synonym
    u.searchParams.set("ccy", C);               // synonym
    u.searchParams.set("selected_currency", C); // synonym
    u.searchParams.set("lang", "en-GB");
    u.searchParams.set("locale", "en-GB");

    return u;
  }

  function tpWrap(u,{p,campaign_id}={}){
    if (!marker) return u;
    const tp = new URL("https://tp.media/r");
    tp.searchParams.set("marker", marker);
    tp.searchParams.set("u", u.toString());
    if (p) tp.searchParams.set("p", String(p));
    if (campaign_id) tp.searchParams.set("campaign_id", String(campaign_id));
    if (trs) tp.searchParams.set("trs", trs);
    return tp;
  }

  function rentacarUrl(){ const base=new URL("https://getrentacar.com/"); return tpWrap(base,{p:Number(env.RENTACAR_P||5996),campaign_id:Number(env.RENTACAR_CAMPAIGN||222)}); }
  function hotelsUrl(){ const u=new URL("https://hotels-comparer.com/"); if(marker)u.searchParams.set("marker",marker); if(trs)u.searchParams.set("trs",trs); return u; }

  let target, mode="";
  const hasRoute = !!(origin && destination);
  const hasDates = !!(departISO || returnISO);

  if (provider === "kiwi") {
    if (hasRoute || hasDates) { target = marker ? kiwiDeepViaTP() : kiwiDeepDirect(); mode = marker ? "kiwi_tp_deeplink":"kiwi_deeplink"; }
    else { target = kiwiBasicClick(); mode = "kiwi_basic"; }
  } else if (provider === "wayaway") {
    const w = wayawaySearchUrl(); target = tpWrap(w, { p:Number(wayawayP), campaign_id:Number(wayawayCamp) }); mode = "wayaway_search";
  } else if (provider === "rentacar" || provider === "getrentacar") {
    target = rentacarUrl(); mode = "rentacar";
  } else if (provider === "hotels") {
    target = hotelsUrl(); mode = "hotels";
  } else {
    const avia = aviasalesUrl(); target = tpWrap(avia, { p: 4114 }); mode = "avia";
  }

  if (url.searchParams.get("debug") === "1") {
    return new Response(JSON.stringify({ provider, mode, origin, destination, departISO, returnISO, adults, children, infants, currency, target: target.toString() }, null, 2), { headers:{ "content-type":"application/json" }});
  }
  return Response.redirect(target.toString(), 302);
}
