// /js/calendar-page.js  (v5 — XSS-hardened + Aviasales primary)
(function () {
  const $ = (s, r=document) => r.querySelector(s);
  const params = new URLSearchParams(location.search);

  // --- helpers to constrain input ---
  const safeIATA = (s) => {
    s = String(s || "").toUpperCase().trim();
    return /^[A-Z0-9]{3}$/.test(s) ? s : "";
  };
  const safeCurrency = (s) => {
    s = String(s || "GBP").toUpperCase().trim();
    return /^[A-Z]{3}$/.test(s) ? s : "GBP";
  };
  const clampAdults = (s) => {
    const n = Math.max(1, Math.min(9, parseInt(String(s || "1"), 10) || 1));
    return String(n);
  };
  const safeBool = (s) => String((String(s || "false").toLowerCase() === "true"));

  const ORIGIN   = safeIATA(params.get("origin"));
  const DEST     = safeIATA(params.get("destination"));
  const ADULTS   = clampAdults(params.get("adults"));
  const CURRENCY = safeCurrency(params.get("currency"));
  const DIRECT   = (safeBool(params.get("direct")) === "true");

  const dep0 = toISO(params.get("departure_at") || "");
  const ret0 = toISO(params.get("return_at") || "");
  const STAY = (dep0 && ret0) ? daysBetween(dep0, ret0) : null;

  const ym = params.get("month");
  const base = ym
    ? new Date(Date.UTC(+ym.slice(0,4), +ym.slice(5,7)-1, 1))
    : dep0
      ? new Date(dep0 + "T00:00:00Z")
      : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
  const YEAR  = base.getUTCFullYear();
  const MONTH = base.getUTCMonth();

  const calTitle = $("#cal-title");
  const backResults = $("#back-results");
  const status = $("#cal-status");
  const grid = $("#cal-grid");
  const legend = $("#legend");

  calTitle.textContent = `${ORIGIN || "?"} → ${DEST || "?"} · ${labelYM(YEAR, MONTH)} · ${CURRENCY}${DIRECT ? " · direct only" : ""}`;
  backResults.href = linkToResults({ dep: dep0 || iso(new Date(Date.UTC(YEAR, MONTH, 15))) });

  $("#prev-month").onclick = () => nav(-1);
  $("#next-month").onclick = () => nav(+1);

  // Safe DOM helpers
  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function createDayElement(dateIso, data, pMin, pMax) {
    const day = +dateIso.slice(8, 10);

    const container = createElement("div", "cal-day");
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "12px";
    container.style.minHeight = "120px";
    container.style.padding = "10px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "space-between";

    const topRow = createElement("div", "row spread cal-day-head");
    const dayNumber = createElement("div", "cal-day-num", String(day));
    dayNumber.style.fontWeight = "600";
    topRow.appendChild(dayNumber);

    const bottomRow = createElement("div", "cal-day-foot");

    if (data && typeof data.price === "number") {
      container.style.background = shade(data.price, pMin, pMax);

      const priceEl = createElement("div", "cal-day-price", money(data.price, data.currency || CURRENCY));
      priceEl.style.fontWeight = "700";
      priceEl.style.fontSize = "18px";

      const actions = createActions(dateIso);
      bottomRow.appendChild(priceEl);
      bottomRow.appendChild(actions);
    } else {
      const unavailable = createElement("div", "muted", "–");
      unavailable.style.fontSize = "13px";

      const naBtn = createElement("span", "btn ghost", "N/A");
      naBtn.setAttribute("aria-disabled", "true");
      naBtn.style.padding = "8px 12px";
      naBtn.style.borderRadius = "10px";
      naBtn.style.opacity = "0.6";
      naBtn.style.cursor = "not-allowed";

      bottomRow.appendChild(unavailable);
      bottomRow.appendChild(naBtn);
    }

    container.appendChild(topRow);
    container.appendChild(bottomRow);
    return container;
  }

  function createActions(dateIso) {
    const actionsContainer = createElement("div", "cal-actions row gap");

    const retForCell = (STAY !== null) ? addDays(dateIso, STAY) : (ret0 || "");

    // Primary: Aviasales (same size as others; SEO-safe rel)
    const aviaBtn = createElement("a", "btn cal-btn", "Aviasales");
    aviaBtn.href = buildAfflinkURL("avia", dateIso, retForCell);
    aviaBtn.target = "_blank";
    aviaBtn.rel = "nofollow sponsored noopener";
    aviaBtn.title = `Open Aviasales for ${ORIGIN} → ${DEST} on ${dateIso}${retForCell ? " · return " + retForCell : ""}`;
    aviaBtn.setAttribute("aria-label", aviaBtn.title);
    aviaBtn.dataset.provider = "aviasales";

    // Secondary: Kiwi
    const kiwiBtn = createElement("a", "btn ghost cal-btn", "Kiwi");
    kiwiBtn.href = buildAfflinkURL("kiwi", dateIso, retForCell);
    kiwiBtn.target = "_blank";
    kiwiBtn.rel = "nofollow sponsored noopener";
    kiwiBtn.title = `Open Kiwi for ${ORIGIN} → ${DEST} on ${dateIso}${retForCell ? " · return " + retForCell : ""}`;
    kiwiBtn.setAttribute("aria-label", kiwiBtn.title);
    kiwiBtn.dataset.provider = "kiwi";

    // View results on-site
    const viewBtn = createElement("a", "btn ghost cal-btn", "View");
    viewBtn.href = buildResultsURL(dateIso, retForCell);
    viewBtn.title = `View full results for ${ORIGIN} → ${DEST} (${dateIso}${retForCell ? " → " + retForCell : ""})`;
    viewBtn.setAttribute("aria-label", viewBtn.title);

    actionsContainer.appendChild(aviaBtn);
    actionsContainer.appendChild(kiwiBtn);
    actionsContainer.appendChild(viewBtn);

    return actionsContainer;
  }

  function buildAfflinkURL(provider, depart, ret) {
    const u = new URL("/api/afflink", location.origin);
    u.searchParams.set("provider", provider); // "avia" (Aviasales) or "kiwi"
    u.searchParams.set("origin", ORIGIN);
    u.searchParams.set("destination", DEST);
    u.searchParams.set("depart", depart);
    if (ret) u.searchParams.set("return", ret);
    u.searchParams.set("adults", ADULTS);
    u.searchParams.set("currency", CURRENCY);
    u.searchParams.set("direct", String(DIRECT));
    return u.toString();
  }

  // week headers
  function initCalendarGrid() {
    const wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    grid.innerHTML = "";
    wd.forEach(day => {
      const dayEl = createElement("div", "small muted", day);
      dayEl.style.textAlign = "center";
      grid.appendChild(dayEl);
    });
  }

  (async function run() {
    status.textContent = "Loading prices…";
    initCalendarGrid();

    const first = new Date(Date.UTC(YEAR, MONTH, 1));
    const days = new Date(Date.UTC(YEAR, MONTH + 1, 0)).getUTCDate();
    const leading = ((first.getUTCDay() + 6) % 7);

    for (let i = 0; i < leading; i++) {
      const blank = createElement("div");
      blank.style.border = "1px dashed #e5e7eb";
      blank.style.borderRadius = "12px";
      blank.style.height = "90px";
      blank.style.opacity = ".5";
      grid.appendChild(blank);
    }

    const dayDates = [];
    for (let d = 1; d <= days; d++) dayDates.push(iso(new Date(Date.UTC(YEAR, MONTH, d))));

    const tasks = dayDates.map(dateIso => async () => ({ dateIso, data: await fetchDay(dateIso) }));
    const results = await pool(tasks, 6);

    const prices = results.filter(x => x.data && typeof x.data.price === "number").map(x => x.data.price);
    const [pMin, pMax] = prices.length ? [Math.min(...prices), Math.max(...prices)] : [0, 0];

    results.forEach(({ dateIso, data }) => {
      const dayEl = createDayElement(dateIso, data, pMin, pMax);
      grid.appendChild(dayEl);
    });

    status.textContent = `${prices.length || 0} priced day(s) in ${labelYM(YEAR, MONTH)} · currency ${CURRENCY}${DIRECT ? " · direct only" : ""}`;

    if (prices.length > 1) {
      legend.textContent = `Cheapest ${money(pMin)} — Most expensive ${money(pMax)} · Click Aviasales to book direct with partner, or View to see full results.`;
    }
  })().catch(() => { status.textContent = "Failed to load prices."; });

  // --- helpers ---
  function toISO(s) {
    s = String(s || "").trim();
    if (!s) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (!m) return "";
    let [_, d, mo, y] = m;
    if (y.length === 2) y = "20" + y;
    return `${y.padStart(4, "0")}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  function daysBetween(a, b) { const A = new Date(a + "T00:00:00Z"), B = new Date(b + "T00:00:00Z"); return Math.round((B - A) / 86400000); }
  function addDays(a, n) { const d = new Date(a + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function labelYM(y, m) { return new Date(Date.UTC(y, m, 1)).toLocaleString("en-GB", { year: "numeric", month: "long", timeZone: "UTC" }); }
  function nav(delta) {
    const t = new Date(Date.UTC(YEAR, MONTH + delta, 1));
    const u = new URL(location.pathname, location.origin);
    ["origin", "destination", "adults", "currency", "direct", "return_at", "subid", "sub_id"].forEach(k => { if (params.has(k)) u.searchParams.set(k, params.get(k)); });
    u.searchParams.set("departure_at", iso(new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), 15))));
    u.searchParams.set("month", `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}`);
    location.assign(u.toString());
  }
  function linkToResults({ dep, ret }) {
    const u = new URL("/flights/results.html", location.origin);
    u.searchParams.set("origin", ORIGIN);
    u.searchParams.set("destination", DEST);
    if (dep) u.searchParams.set("departure_at", dep);
    if (ret) u.searchParams.set("return_at", ret);
    u.searchParams.set("adults", ADULTS);
    u.searchParams.set("currency", CURRENCY);
    u.searchParams.set("direct", String(DIRECT));
    return u.toString();
  }
  function buildResultsURL(dep, ret) { return linkToResults({ dep, ret }); }
  function money(v, cy = CURRENCY) {
    try { return new Intl.NumberFormat("en-GB", { style: "currency", currency: cy, maximumFractionDigits: 0 }).format(v); }
    catch { return `${cy} ${Number(v || 0).toFixed(0)}`; }
  }
  function shade(price, pMin, pMax) {
    if (pMax === pMin) return "#fff";
    const t = Math.max(0, Math.min(1, (price - pMin) / (pMax - pMin)));
    const h = 150 + (28 - 150) * t, s = 70, l = 95 - 20 * t;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  async function fetchDay(dateIso) {
    const key = `pf_cal_${ORIGIN}_${DEST}_${CURRENCY}_${DIRECT}_${dateIso}`;
    try { const c = sessionStorage.getItem(key); if (c) return JSON.parse(c); } catch {}
    const u = new URL("/api/search", location.origin);
    u.searchParams.set("origin", ORIGIN);
    u.searchParams.set("destination", DEST);
    u.searchParams.set("departure_at", dateIso);
    u.searchParams.set("adults", ADULTS);
    u.searchParams.set("currency", CURRENCY);
    u.searchParams.set("direct", String(DIRECT));
    u.searchParams.set("limit", "1");
    const r = await fetch(u.toString(), { headers: { accept: "application/json" } });
    const text = await r.text(); let j; try { j = JSON.parse(text); } catch { j = {}; }
    const rows = Array.isArray(j?.data) ? j.data
      : (j?.data && typeof j.data === "object") ? Object.values(j.data).flat()
      : Array.isArray(j) ? j : [];
    const first = rows[0] ? { price: rows[0].price, currency: (j.currency || CURRENCY), airline: rows[0].airline || "" } : null;
    try { sessionStorage.setItem(key, JSON.stringify(first)); } catch {}
    return first;
  }

  async function pool(tasks, limit = 6) {
    const out = new Array(tasks.length); let i = 0;
    const workers = new Array(limit).fill(0).map(async () => {
      while (i < tasks.length) {
        const idx = i++;
        try { out[idx] = await tasks[idx](); }
        catch { out[idx] = { dateIso: "", data: null }; }
      }
    });
    await Promise.all(workers);
    return out;
  }
})();
