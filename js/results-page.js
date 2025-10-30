// /js/results-page.js — pagination + badges, CSP-safe & XSS-hardened
(function () {
  "use strict";

  // ---------- tiny DOM helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text; // textContent prevents XSS
    return e;
  }

  // ---------- sanitizers ----------
  const SANITIZE_CODE = (code, min = 2, max = 4) =>
    String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, max);

  const ALLOWED_CURRENCIES = new Set(["GBP","USD","EUR","THB","AED"]);
  const SANITIZE_CURRENCY = (c) => {
    const up = String(c || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0,3);
    return ALLOWED_CURRENCIES.has(up) ? up : "GBP";
  };

  // ---------- URL params (sanitized) ----------
  const Q = new URLSearchParams(location.search);
  const ORIGIN   = SANITIZE_CODE(Q.get("origin"));
  const DEST     = SANITIZE_CODE(Q.get("destination"));
  const DEPART   = String(Q.get("departure_at") || "");
  const RETURN   = String(Q.get("return_at") || "");
  const ADULTS   = Math.max(1, Math.min(10, parseInt(Q.get("adults")   || "1", 10) || 1));
  const CHILDREN = Math.max(0, Math.min(10, parseInt(Q.get("children") || "0", 10) || 0));
  const INFANTS  = Math.max(0, Math.min(10, parseInt(Q.get("infants")  || "0", 10) || 0));
  const DIRECT_REQ = (String(Q.get("direct") || "false").toLowerCase() === "true");
  const CURRENCY = SANITIZE_CURRENCY(Q.get("currency") || "GBP");
  const LANG     = (Q.get("lang") || "").toLowerCase().replace(/[^a-z-]/g, "").slice(0,10);

  // ---------- DOM targets ----------
  const list = $("#results-list");
  const status = $("#results-status");
  const sortGroup = $("#sort-group");
  const stopsGroup = $("#stops-group");
  const selAir = $("#filter-airline");
  const airChipsCard = $("#airline-chips-card");
  const airChips = $("#airline-chips");
  const departRibbon = $("#depart-chips");
  const returnRibbon = $("#return-chips");
  const returnRibbonWrap = $("#return-ribbon");

  // ---------- state ----------
  let sortMode = "price";
  let stopsMode = "any";
  let airlineMode = "any";
  let state = { combos: [], outbound: [], back: [], tripType: "oneway" };

  // Pagination state (per section, Skyscanner-style)
  const isMobile = matchMedia("(max-width: 768px)").matches;
  const PAGE = () => ({
    combos: isMobile ? 6 : 10,
    outs:   isMobile ? 10 : 20,
    backs:  isMobile ? 10 : 20
  });
  let loadState = { combos: 0, outs: 0, backs: 0 };
  function resetLoadState() {
    const p = PAGE();
    loadState = { combos: p.combos, outs: p.outs, backs: p.backs };
  }

  const SYMBOL = { GBP: "£", USD: "$", EUR: "€", THB: "฿", AED: "د.إ" };

  // ---------- dates / currency ----------
  function toISO(s) {
    const t = String(s || "").trim();
    if (!t) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t; // ISO

    // DD/MM/YYYY or DD-MM-YYYY (or 2-digit year)
    let m = t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (m) {
      let d = m[1], mo = m[2], y = m[3];
      if (y.length === 2) y = "20" + y;
      const Y = parseInt(y,10), M = parseInt(mo,10), D = parseInt(d,10);
      if (Y >= 2020 && Y <= 2035 && M >= 1 && M <= 12 && D >= 1 && D <= 31) {
        return `${String(Y).padStart(4,"0")}-${String(M).padStart(2,"0")}-${String(D).padStart(2,"0")}`;
      }
      return "";
    }
    // YYYY/M/D or YYYY-MM-DD
    m = t.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
    if (m) {
      const Y = parseInt(m[1],10), M = parseInt(m[2],10), D = parseInt(m[3],10);
      if (Y >= 2020 && Y <= 2035 && M >= 1 && M <= 12 && D >= 1 && D <= 31) {
        return `${String(Y)}-${String(M).padStart(2,"0")}-${String(D).padStart(2,"0")}`;
      }
    }
    console.error("❌ Invalid date format:", s);
    return "";
  }

  const isoOnly = (s) => (String(s || "").match(/^(\d{4}-\d{2}-\d{2})/) || ["",""])[1];

  function shiftISO(s, d) {
    if (!s) return "";
    const t = new Date(s + "T00:00:00Z");
    t.setUTCDate(t.getUTCDate() + d);
    return t.toISOString().slice(0,10);
  }

  function nf(v, cy = CURRENCY) {
    try {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: cy, maximumFractionDigits: 0 }).format(v);
    } catch {
      return (SYMBOL[cy] || "") + Number(v || 0).toFixed(0);
    }
  }

  // city groups (IATA metro areas)
  const CITY = {
    LON: ["LHR","LGW","LTN","LCY","STN","SEN"],
    NYC: ["JFK","EWR","LGA"],
    PAR: ["CDG","ORY","BVA"],
    TYO: ["HND","NRT"],
    SEL: ["ICN","GMP"],
    ROM: ["FCO","CIA"],
    MIL: ["MXP","LIN","BGY"],
    SAO: ["GRU","CGH","VCP"],
    BUE: ["EZE","AEP"],
    MOW: ["SVO","DME","VKO"]
  };
  const toCity = (code) => {
    const c = SANITIZE_CODE(code);
    for (const k in CITY) if (k === c || CITY[k].includes(c)) return k;
    return c;
  };

  // ---------- validation ----------
  function validateParams() {
    if (!ORIGIN || !DEST) return false;
    if (ORIGIN.length < 2 || ORIGIN.length > 4) return false;
    if (DEST.length   < 2 || DEST.length   > 4) return false;
    if (DEPART && !toISO(DEPART)) return false;
    if (RETURN && !toISO(RETURN)) return false;
    if (!(ADULTS >= 1 && ADULTS <= 10)) return false;
    if (!(CHILDREN >= 0 && CHILDREN <= 10)) return false;
    if (!(INFANTS  >= 0 && INFANTS  <= 10)) return false;
    return true;
  }

  // ensure containers (defensive)
  function ensureContainers() {
    if (!list) {
      const e = el("div","results"); e.id = "results-list";
      (document.querySelector("main") || document.body).appendChild(e);
    }
    if (!status) {
      const e = el("div","status"); e.id = "results-status";
      (document.querySelector("main") || document.body).appendChild(e);
    }
  }

  // ---------- normalize ----------
  function normalizeData(json) {
    if (Array.isArray(json?.data)) return json.data;
    if (json?.data && typeof json.data === "object") return Object.values(json.data).flat();
    if (Array.isArray(json)) return json;
    return [];
  }
  const rowDuration  = (it) => it.duration || it.duration_to || 0;
  const rowTransfers = (it) => (typeof it.transfers === "number" ? it.transfers : (it.transfers_count ?? it.number_of_changes ?? 0));

  // ---------- APIs (no double-encode) ----------
  async function callTravelPayoutsApi({ origin, dest, depart, ret, direct }) {
    try {
      const u = new URL("/api/search", location.origin);
      u.searchParams.set("origin", origin);
      u.searchParams.set("destination", dest);
      const dIso = toISO(depart); if (dIso) u.searchParams.set("departure_at", dIso);
      const rIso = toISO(ret);    if (rIso) u.searchParams.set("return_at", rIso);
      u.searchParams.set("adults", String(ADULTS));
      u.searchParams.set("children", String(CHILDREN));
      u.searchParams.set("infants", String(INFANTS));
      u.searchParams.set("currency", CURRENCY);
      u.searchParams.set("direct", String(!!direct));

      const r = await fetch(u.toString(), { headers: { "accept": "application/json" } });
      const text = await r.text();
      let json;
      try { json = JSON.parse(text); } catch { console.error("❌ TravelPayouts JSON parse:", text); return []; }
      if (!r.ok) { console.error("❌ TravelPayouts HTTP", r.status, json); return []; }

      return normalizeData(json);
    } catch (err) {
      console.error("TravelPayouts error:", err);
      return [];
    }
  }

  async function callBookingComApi({ origin, dest, depart, ret }) {
    try {
      const u = new URL("/api/booking-com", location.origin);
      u.searchParams.set("origin", origin);
      u.searchParams.set("destination", dest);
      const dIso = toISO(depart); if (dIso) u.searchParams.set("depart", dIso);
      const rIso = toISO(ret);    if (rIso) u.searchParams.set("return", rIso);
      u.searchParams.set("adults", String(ADULTS));
      u.searchParams.set("currency", CURRENCY);

      const r = await fetch(u.toString(), { headers: { "accept": "application/json" } });
      const text = await r.text();
      let json;
      try { json = JSON.parse(text); } catch { console.error("❌ Booking JSON parse:", text); return []; }
      if (!r.ok) { console.error("❌ Booking HTTP", r.status, json); return []; }

      return normalizeData(json);
    } catch (err) {
      console.error("Booking.com error:", err);
      return [];
    }
  }

  // ---------- multi-source search ----------
  const SEARCH_CONFIG = { useTravelPayouts: true, useBookingCom: true };
  async function smartMultiApiSearch({ origin, dest, depart, ret, isReturn = false }) {
    const tasks = [];
    if (SEARCH_CONFIG.useTravelPayouts) {
      tasks.push(
        callTravelPayoutsApi({ origin, dest, depart, ret, direct: DIRECT_REQ })
          .then(arr => arr.map(f => ({ ...f, source: "travelpayouts" })))
          .catch(() => [])
      );
    }
    if (SEARCH_CONFIG.useBookingCom) {
      tasks.push(
        callBookingComApi({ origin, dest, depart, ret })
          .then(arr => arr.map(f => ({ ...f, source: "booking.com" })))
          .catch(() => [])
      );
    }

    const results = await Promise.all(tasks);
    let all = [];
    results.forEach(a => { all = all.concat(a); });

    // de-dupe
    const seen = new Set();
    const uniq = all.filter(f => {
      const key = [
        (f.origin || f.o || origin),
        (f.destination || f.d || dest),
        isoOnly(f.departure_at || depart),
        (String(f.airline || "")).toUpperCase(),
        Math.round(f.price || 0)
      ].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    uniq.sort((a,b) => (a.price || 0) - (b.price || 0));
    return uniq;
  }

  // ---------- build state ----------
  function buildStateFromFlights(outbound, retFlights) {
    const cy = CURRENCY;

    const outRows = outbound.map(f => ({
      kind: "out",
      price: f.price,
      cy,
      o: SANITIZE_CODE(f.origin_airport || f.origin || ORIGIN),
      d: SANITIZE_CODE(f.destination_airport || f.destination || DEST),
      depart: isoOnly(f.departure_at || DEPART),
      ret: "",
      airline: String(f.airline || "").toUpperCase().replace(/[^A-Z0-9/]/g,""),
      transfers: rowTransfers(f),
      duration: rowDuration(f),
      departure_time: f.departure_at,
      arrival_time: f.arrival_at,
      flight_number: f.flight_number,
      source: f.source || "unknown",
      affiliate_ready: true
    }));

    const backRows = retFlights.map(f => ({
      kind: "back",
      price: f.price,
      cy,
      o: SANITIZE_CODE(f.origin_airport || f.origin || DEST),
      d: SANITIZE_CODE(f.destination_airport || f.destination || ORIGIN),
      depart: isoOnly(f.departure_at || RETURN),
      ret: "",
      airline: String(f.airline || "").toUpperCase().replace(/[^A-Z0-9/]/g,""),
      transfers: rowTransfers(f),
      duration: rowDuration(f),
      departure_time: f.departure_at,
      arrival_time: f.arrival_at,
      flight_number: f.flight_number,
      source: f.source || "unknown",
      affiliate_ready: true
    }));

    const combos = [];
    if (outRows.length && backRows.length && outRows.length <= 10 && backRows.length <= 10) {
      const maxCombos = Math.min(outRows.length * backRows.length, 10);
      let c = 0;
      for (let i=0; i<outRows.length && c<maxCombos; i++) {
        for (let j=0; j<backRows.length && c<maxCombos; j++) {
          const o = outRows[i], r = backRows[j];
          combos.push({
            kind: "combo",
            price: (o.price || 0) + (r.price || 0),
            cy,
            o: o.o, d: o.d,
            depart: o.depart, ret: r.depart,
            airline: `${o.airline}${r.airline ? "/" + r.airline : ""}`,
            transfers: (o.transfers || 0) + (r.transfers || 0),
            duration: (o.duration || 0) + (r.duration || 0),
            sameCarrier: o.airline === r.airline,
            source: `combo:${o.source}+${r.source}`,
            affiliate_ready: true
          });
          c++;
        }
      }
    }

    state = {
      combos,
      outbound: outRows,
      back: backRows,
      tripType: RETURN ? "return" : "oneway"
    };
  }

  // ---------- ribbons ----------
  function getDayName(iso) {
    const d = new Date(iso + "T00:00:00Z");
    return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getUTCDay()];
  }
  function displayMD(iso) { return iso.slice(5).replace("-", "/"); }

  function findBestPriceForDate(dateISO, isReturn = false) {
    const key = isoOnly(dateISO);
    let best = null;
    const arr = isReturn ? state.back : state.outbound;
    arr.forEach(f => {
      if (isoOnly(f.depart) === key) best = best == null ? f.price : Math.min(best, f.price);
    });
    if (isReturn && state.combos.length) {
      state.combos.forEach(c => {
        if (isoOnly(c.ret) === key) best = best == null ? c.price : Math.min(best, c.price);
      });
    }
    return best;
  }

  function isLowPrice(baseISO, price, isReturn) {
    const prices = [];
    for (let i=-3; i<=3; i++) {
      const d = shiftISO(baseISO, i);
      const p = findBestPriceForDate(d, isReturn);
      if (p != null) prices.push(p);
    }
    if (!prices.length) return false;
    const min = Math.min(...prices);
    return price <= min * 1.05; // within 5%
  }

  function buildDateRibbons() {
    if (!departRibbon) return;
    departRibbon.textContent = "";
    if (returnRibbon) returnRibbon.textContent = "";

    const baseDepart = DEPART || shiftISO(new Date().toISOString().slice(0,10), 14);
    for (let i=-3; i<=3; i++) {
      const d = shiftISO(baseDepart, i);
      const best = findBestPriceForDate(d, false);

      const a = el("a","date-chip");
      a.href = buildRibbonURL(d, RETURN);
      a.appendChild(el("div","date-chip-day",  getDayName(d)));
      a.appendChild(el("div","date-chip-date", displayMD(d)));
      a.appendChild(el("div","date-chip-price", best != null ? nf(best, CURRENCY) : "—"));
      if (d === baseDepart) a.classList.add("active");
      if (best != null && isLowPrice(d, best, false)) a.classList.add("low-price");
      departRibbon.appendChild(a);
    }

    if (RETURN && returnRibbon && returnRibbonWrap) {
      returnRibbonWrap.style.display = "block";
      for (let i=-3; i<=3; i++) {
        const d = shiftISO(RETURN, i);
        const best = findBestPriceForDate(d, true);

        const a = el("a","date-chip");
        a.href = buildRibbonURL(DEPART, d);
        a.appendChild(el("div","date-chip-day",  getDayName(d)));
        a.appendChild(el("div","date-chip-date", displayMD(d)));
        a.appendChild(el("div","date-chip-price", best != null ? nf(best, CURRENCY) : "—"));
        if (d === RETURN) a.classList.add("active");
        if (best != null && isLowPrice(d, best, true)) a.classList.add("low-price");
        returnRibbon.appendChild(a);
      }
    } else if (returnRibbonWrap) {
      returnRibbonWrap.style.display = "none";
    }
  }

  function buildRibbonURL(departDate, returnDate) {
    const u = new URL("/flights/results.html", location.origin);
    u.searchParams.set("origin", ORIGIN);
    u.searchParams.set("destination", DEST);
    if (departDate) u.searchParams.set("departure_at", departDate);
    if (returnDate) u.searchParams.set("return_at", returnDate);
    u.searchParams.set("adults", String(ADULTS));
    u.searchParams.set("children", String(CHILDREN));
    u.searchParams.set("infants", String(INFANTS));
    u.searchParams.set("currency", CURRENCY);
    u.searchParams.set("direct", String(DIRECT_REQ));
    if (LANG) u.searchParams.set("lang", LANG);
    return u.toString();
  }

  // ---------- cards ----------
  function formatTime(ts) {
    if (!ts) return "—";
    try { return new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
    catch { return "—"; }
  }
  function formatDuration(min) {
    if (!min) return "—";
    const h = Math.floor(min / 60), m = min % 60;
    return `${h}h ${m}m`;
  }
  function formatDisplayDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00Z");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }

  function createProviderButtons(r) {
    const box = el("div","partner-row");
    const providers = [
      { label: "Aviasales", key: "avia", cls: "btn-avia" },
      { label: "Kiwi",      key: "kiwi", cls: "btn-kiwi" },
      { label: "WayAway",   key: "wayaway", cls: "btn-wayaway" }
    ];

    providers.forEach(p => {
      const a = el("a", `partner btn-partner ${p.cls}`, p.label);
      const u = new URL("/api/afflink", location.origin);
      u.searchParams.set("provider", p.key);
      u.searchParams.set("origin", r.o);
      u.searchParams.set("destination", r.d);
      if (r.depart) u.searchParams.set("depart", r.depart);
      if (r.ret)    u.searchParams.set("return", r.ret);
      u.searchParams.set("adults", String(ADULTS));
      u.searchParams.set("children", String(CHILDREN));
      u.searchParams.set("infants", String(INFANTS));
      u.searchParams.set("currency", r.cy || CURRENCY);
      u.searchParams.set("direct", String(DIRECT_REQ));
      if (r.flight_number) u.searchParams.set("flight_number", String(r.flight_number).replace(/[^A-Z0-9-]/ig,""));
      if (r.airline)       u.searchParams.set("airline", r.airline);

      a.href = u.toString();
      a.rel = "nofollow sponsored noopener";
      a.target = "_blank";
      box.appendChild(a);
    });
    return box;
  }

  function addBadges(article, r) {
    // Best price
    if (r.__bestPrice === true) {
      const b = el("div","best-price-badge","Best price");
      article.appendChild(b);
    }
    // Same airline for combos
    if (r.kind === "combo" && r.sameCarrier) {
      const s = el("div","same-airline-badge","Same airline");
      article.appendChild(s);
    }
  }

  function createFlightCard(r) {
    const article = el("article","result-card flight-card");

    // Source stripe
    if (r.source && r.source.includes("booking.com")) {
      article.style.borderLeft = "4px solid #003580";
    } else if (r.source && r.source.includes("travelpayouts")) {
      article.style.borderLeft = "4px solid #6A00FF";
    }

    const mainAir = String((r.airline || "").split("/")[0] || "").toUpperCase().replace(/[^A-Z0-9]/g,"");
    const isDirect = (r.transfers || 0) === 0;

    // Header
    const header = el("div","flight-card-header");
    const airlineInfo = el("div","flight-airline");
    if (mainAir) {
      const logo = el("img","airline-logo");
      logo.src = `https://pics.avs.io/200/75/${mainAir}.png`;
      logo.alt = `${mainAir} logo`;
      logo.loading = "lazy";
      airlineInfo.appendChild(logo);
    }
    airlineInfo.appendChild(el("span","airline-name", r.airline || "Multiple airlines"));
    const price = el("div","flight-price", nf(r.price, r.cy));
    header.appendChild(airlineInfo);
    header.appendChild(price);

    // Route block
    const route = el("div","flight-route");
    const origin = el("div","flight-origin");
    origin.appendChild(el("div","airport-code", r.o));
    origin.appendChild(el("div","flight-time", r.departure_time ? formatTime(r.departure_time) : "—"));
    const stops = el("div","flight-stops");
    if (isDirect) {
      stops.appendChild(el("div","direct-flight","Direct"));
      stops.appendChild(el("div","flight-duration", formatDuration(r.duration)));
    } else {
      const s = r.transfers || 0;
      stops.appendChild(el("div","stops", `${s} stop${s>1?"s":""}`));
      stops.appendChild(el("div","flight-duration", formatDuration(r.duration)));
    }
    const dest = el("div","flight-destination");
    dest.appendChild(el("div","airport-code", r.d));
    dest.appendChild(el("div","flight-time", r.arrival_time ? formatTime(r.arrival_time) : "—"));
    route.appendChild(origin);
    route.appendChild(stops);
    route.appendChild(dest);

    // Footer
    const footer = el("div","flight-card-footer");
    const dateInfo = el("div","flight-date");
    dateInfo.textContent = `Depart: ${formatDisplayDate(r.depart)}${r.ret ? ` · Return: ${formatDisplayDate(r.ret)}` : ""}`;
    if (r.source && !String(r.source).includes("combo")) {
      const src = el("div","search-source small muted");
      src.textContent = `Source: ${r.source}`;
      src.style.marginTop = "4px";
      src.style.fontSize = "12px";
      dateInfo.appendChild(src);
    }
    const booking = createProviderButtons(r);
    booking.className = "flight-booking";
    footer.appendChild(dateInfo);
    footer.appendChild(booking);

    article.appendChild(header);
    article.appendChild(route);
    article.appendChild(footer);

    // Badges (best price / same airline)
    addBadges(article, r);

    return article;
  }

  // ---------- render ----------
  function applyFiltersAndSort(rows) {
    let out = rows.slice();

    // stops
    out = out.filter(r => {
      const s = r.transfers || 0;
      if (stopsMode === "0") return s === 0;
      if (stopsMode === "1") return s <= 1;
      if (stopsMode === "2") return s >= 2;
      return true;
    });

    // airline
    if (airlineMode !== "any") {
      const a = airlineMode.toUpperCase();
      out = out.filter(r => String(r.airline || "").toUpperCase().split("/").includes(a));
    } else if (selAir && selAir.value && selAir.value !== "any") {
      const a = selAir.value.toUpperCase();
      out = out.filter(r => String(r.airline || "").toUpperCase().includes(a));
    }

    // sort
    if (sortMode === "duration") {
      out.sort((x,y) => (x.duration || 1e9) - (y.duration || 1e9));
    } else if (sortMode === "stops") {
      out.sort((x,y) => (x.transfers || 0) - (y.transfers || 0) || (x.price || 0) - (y.price || 0));
    } else {
      out.sort((x,y) => (x.price || 0) - (y.price || 0));
    }
    return out;
  }

  function renderAirlineChips() {
    if (!airChipsCard || !airChips) return;

    const set = new Set();
    [...state.combos, ...state.outbound, ...state.back].forEach(r => {
      String(r.airline || "").split("/").forEach(x => { if (x) set.add(x); });
    });
    const arr = [...set].filter(Boolean).sort();

    airChips.textContent = "";

    if (arr.length && arr.length <= 6) {
      airChipsCard.style.display = "";
      if (selAir) selAir.style.display = "none";

      const anyChip = el("button","chip" + (airlineMode === "any" ? " active" : ""), "Any");
      anyChip.setAttribute("data-air","any");
      anyChip.setAttribute("aria-pressed", airlineMode === "any" ? "true" : "false");
      airChips.appendChild(anyChip);

      arr.forEach(name => {
        const chip = el("button","chip" + (airlineMode === name ? " active" : ""), name);
        chip.setAttribute("data-air", name);
        chip.setAttribute("aria-pressed", airlineMode === name ? "true" : "false");
        airChips.appendChild(chip);
      });

      airChips.addEventListener("click", handleAirlineChipClick, { once: true });
    } else {
      airChipsCard.style.display = "none";
      if (selAir) {
        selAir.style.display = "";
        selAir.textContent = "";
        const any = el("option","", "Any"); any.value = "any";
        selAir.appendChild(any);
        arr.forEach(name => {
          const opt = el("option","", name); opt.value = name;
          selAir.appendChild(opt);
        });
        selAir.onchange = function(){ resetLoadState(); render(); };
      }
    }
  }

  function handleAirlineChipClick(e) {
    const btn = e.target.closest("[data-air]");
    if (!btn) return;
    airlineMode = btn.getAttribute("data-air");
    $$(".chip", airChips).forEach(c => {
      const on = c === btn;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    resetLoadState();
    render();
  }

  function renderStatusLine() {
    if (!status) return;
    const combos = applyFiltersAndSort(state.combos);
    const outs   = applyFiltersAndSort(state.outbound);
    const backs  = applyFiltersAndSort(state.back);
    let total = state.tripType === "oneway" ? outs.length : (combos.length || (outs.length + backs.length));

    const srcCount = {};
    [...state.outbound, ...state.back].forEach(f => {
      const s = f.source || "unknown";
      srcCount[s] = (srcCount[s] || 0) + 1;
    });
    const srcText = Object.keys(srcCount).length
      ? Object.keys(srcCount).map(k => `${srcCount[k]} from ${k}`).join(", ")
      : "no sources";

    status.textContent = `Found ${total} flights · Sources: ${srcText} · Currency: ${CURRENCY}`;
  }

  function sectionLoadMore(title, key) {
    const btn = el("button","load-more", `Load more ${title.toLowerCase()}`);
    btn.setAttribute("data-section", key);
    btn.addEventListener("click", function(){
      const p = PAGE();
      loadState[key] += p[key];
      render();
    });
    return btn;
  }

  function renderSection(title, rows, key) {
    if (!rows.length) return;

    const shown = Math.min(rows.length, loadState[key]);
    const bestPrice = rows.length ? Math.min(...rows.map(r => r.price || Infinity)) : null;

    // Heading
    const h = el("h3","", title);
    h.style.margin = "24px 0 8px 0";
    list.appendChild(h);

    rows.slice(0, shown).forEach(r => {
      const flagged = Object.assign({}, r, { __bestPrice: (bestPrice != null && r.price === bestPrice) });
      list.appendChild(createFlightCard(flagged));
    });

    if (rows.length > shown) {
      list.appendChild(sectionLoadMore(title, key));
    }
  }

  function render() {
    renderStatusLine();
    renderAirlineChips();

    if (!list) return;
    list.textContent = "";

    const combos = applyFiltersAndSort(state.combos);
    const outs   = applyFiltersAndSort(state.outbound);
    const backs  = applyFiltersAndSort(state.back);

    if (!combos.length && !outs.length && !backs.length) {
      list.appendChild(el("div","muted","No flights found. Try different dates or airports."));
      wireControlsOnce();
      return;
    }

    if (state.tripType === "return" && combos.length) {
      renderSection("Round-trip Combos", combos, "combos");
    }
    if (outs.length) {
      renderSection("Outbound Flights", outs, "outs");
    }
    if (state.tripType === "return" && backs.length) {
      renderSection("Return Flights", backs, "backs");
    }

    wireControlsOnce();
  }

  function wireControlsOnce() {
    if (wireControlsOnce._done) return;
    wireControlsOnce._done = true;

    if (sortGroup) {
      sortGroup.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-sort]");
        if (!chip) return;
        sortMode = chip.getAttribute("data-sort");
        $$(".chip", sortGroup).forEach(c => {
          const active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });
        resetLoadState();
        render();
      });
    }

    if (stopsGroup) {
      stopsGroup.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-stops]");
        if (!chip) return;
        stopsMode = chip.getAttribute("data-stops");
        $$(".chip", stopsGroup).forEach(c => {
          const active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });
        resetLoadState();
        render();
      });
    }

    // Always ensure partner links are noopener/sponsored
    document.addEventListener("click", function (e) {
      const a = e.target.closest("a.partner[href]");
      if (!a) return;
      a.setAttribute("rel","nofollow sponsored noopener");
      a.setAttribute("target","_blank");
    }, true);
  }

  function setStatus(text) { if (status) status.textContent = text; }

  // ---------- run ----------
  (function init(){
    ensureContainers();
    if (!validateParams()) {
      setStatus("Invalid search parameters. Please check your inputs.");
      return;
    }

    setStatus("Searching flights…");
    resetLoadState();

    const cityO = toCity(ORIGIN);
    const cityD = toCity(DEST);

    Promise.all([
      smartMultiApiSearch({ origin: cityO, dest: cityD, depart: DEPART, isReturn: false }),
      RETURN ? smartMultiApiSearch({ origin: cityD, dest: cityO, depart: RETURN, isReturn: true }) : Promise.resolve([])
    ]).then(([outbound, back]) => {
      buildStateFromFlights(outbound, back);
      buildDateRibbons();
      render();
    }).catch(err => {
      console.error("Search failed:", err);
      setStatus("Search failed. Please try again.");
    });
  })();
})();
