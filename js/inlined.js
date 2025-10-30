document.addEventListener('DOMContentLoaded', function(){
// flights/calendar.html
// year
  (function(){ var y=document.getElementById("y"); if (y) y.textContent=new Date().getFullYear(); })();

  // back to results with params (keeps origin/destination/pax/currency/lang/direct)
  (function(){
    var here = new URL(location.href), q = here.searchParams;
    // Build results URL
    var u = new URL("/flights/results.html", location.origin);
    ["origin","destination","departure_at","return_at","adults","children","infants","currency","direct","lang"]
      .forEach(k => { if (q.has(k)) u.searchParams.set(k, q.get(k)); });
    // calendar-specific params are ignored by results page
    var back = document.getElementById("back-results");
    if (back) back.href = u.toString();
  })();

  // direct-only toggle (keeps lang)
  (function () {
    const u = new URL(location.href);
    const t = document.getElementById("toggle-direct");
    if (!t) return;
    const direct = (u.searchParams.get("direct") || "false").toLowerCase() === "true";
    t.classList.toggle("active", direct);
    t.setAttribute("aria-pressed", String(direct));
    t.addEventListener("click", (e)=>{
      e.preventDefault();
      const next = !((u.searchParams.get("direct") || "false").toLowerCase() === "true");
      u.searchParams.set("direct", String(next));
      const lang = (new URL(location.href)).searchParams.get("lang");
      if (lang) u.searchParams.set("lang", lang);
      location.href = u.toString();
    });
  })();

// flights/results-template.html
(function(){
    const btn = document.getElementById('btn-filters');
    const drw = document.getElementById('filters-drawer');
    if (!btn || !drw) return;
    btn.addEventListener('click', ()=>{
      const open = drw.style.display !== 'none';
      drw.style.display = open ? 'none' : '';
      btn.setAttribute('aria-expanded', String(!open));
    });
  })();

// flights/results-template.html
(function(){
    const pad = 8;
    function setOffset(){
      const bar = document.querySelector('.topbar');
      const sticky = document.querySelector('.sticky-controls');
      if (!bar || !sticky) return;
      const h = Math.ceil(bar.getBoundingClientRect().height);
      sticky.style.top = (h + pad) + 'px';
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setOffset);
    else setOffset();
    window.addEventListener('resize', () => { requestAnimationFrame(setOffset); }, { passive: true });
  })();

// flights/results-template.html
(function () {
    const u = new URL(location.href);
    const cal = new URL("/flights/calendar.html", location.origin);
    ["origin","destination","adults","currency","direct","return_at","departure_at","lang"].forEach(k=>{
      if (u.searchParams.has(k)) cal.searchParams.set(k, u.searchParams.get(k));
    });
    const d = u.searchParams.get("departure_at");
    if (d) cal.searchParams.set("month", d.slice(0,7));
    const el = document.getElementById("view-calendar");
    if (el) el.href = cal.toString();
    document.getElementById("y").textContent = new Date().getFullYear();
  })();

  document.addEventListener("click", function (e) {
    const a = e.target.closest("a.partner[href]"); if (!a) return;
    e.preventDefault(); window.open(a.href, "_blank", "noopener");
  }, true);

// flights/results.html
(function(){
    const btn = document.getElementById('btn-filters');
    const drw = document.getElementById('filters-drawer');
    if (!btn || !drw) return;
    btn.addEventListener('click', ()=>{
      const open = drw.style.display !== 'none';
      drw.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!open));
    });
  })();

// flights/results.html
(function(){
    const pad = 8;
    function setOffset(){
      const bar = document.querySelector('.topbar');
      const sticky = document.querySelector('.sticky-controls');
      if (!bar || !sticky) return;
      const h = Math.ceil(bar.getBoundingClientRect().height);
      sticky.style.top = (h + pad) + 'px';
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setOffset);
    else setOffset();
    window.addEventListener('resize', () => { requestAnimationFrame(setOffset); }, { passive: true });
  })();

// img/index.html
(function () {
  // Footer year
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // Current lang (if any)
  var current = new URL(location.href);
  var lang = current.searchParams.get("lang") || "";

  // Keep ?lang on the direct route link
  (function () {
    var r = document.getElementById("route-lon-bkk");
    if (r && lang) {
      var ru = new URL(r.href, location.origin);
      ru.searchParams.set("lang", lang);
      r.href = ru.toString();
    }
  })();

  // Helper: YYYY-MM-DD some days from today (use UTC noon to avoid DST weirdness)
  function iso(daysFromToday) {
    var t = new Date();
    t.setUTCHours(12, 0, 0, 0);
    t.setUTCDate(t.getUTCDate() + daysFromToday);
    return t.toISOString().slice(0, 10);
  }
  var depart = iso(60);   // ~2 months from now
  var ret    = iso(67);   // +7 days

  // Wire a deals pill to /flights/results.html with params
  function wireDeal(id, origin, dest) {
    var a = document.getElementById(id);
    if (!a) return;

    var u = new URL("/flights/results.html", location.origin);
    u.searchParams.set("origin", origin);
    u.searchParams.set("destination", dest);
    u.searchParams.set("departure_at", depart);
    u.searchParams.set("return_at", ret);
    u.searchParams.set("adults", "1");
    u.searchParams.set("children", "0");
    u.searchParams.set("infants", "0");
    u.searchParams.set("currency", "GBP");
    u.searchParams.set("direct", "false");
    if (lang) u.searchParams.set("lang", lang);

    a.href = u.toString();
  }

  // Existing + new pills
  wireDeal("deal-lon-bkk", "LON", "BKK");
  wireDeal("deal-lon-nyc", "LON", "NYC");
  wireDeal("deal-lon-dxb", "LON", "DXB");
  wireDeal("deal-bkk-hkt", "BKK", "HKT");
})();

// img/flights/calendar.html
// year stamp
  document.getElementById("y").textContent = new Date().getFullYear();

  // ▼▼ DIRECT-ONLY TOGGLE SCRIPT (place this right before the Cloudflare beacon) ▼▼
  (function () {
    const u = new URL(location.href);
    const t = document.getElementById("toggle-direct");
    if (!t) return;
    const direct = (u.searchParams.get("direct") || "false").toLowerCase() === "true";
    t.classList.toggle("active", direct);
    t.setAttribute("aria-pressed", String(direct));
    t.addEventListener("click", (e)=>{
      e.preventDefault();
      const next = !((u.searchParams.get("direct") || "false").toLowerCase() === "true");
      u.searchParams.set("direct", String(next));
      // keep lang param if present
      const lang = (new URL(location.href)).searchParams.get("lang");
      if (lang) u.searchParams.set("lang", lang);
      location.href = u.toString(); // reload with new direct flag
    });
  })();
  // ▲▲ DIRECT-ONLY TOGGLE SCRIPT ▲▲

// img/flights/results-template.html
(function(){
    const btn = document.getElementById('btn-filters');
    const drw = document.getElementById('filters-drawer');
    if (!btn || !drw) return;
    btn.addEventListener('click', ()=>{
      const open = drw.style.display !== 'none';
      drw.style.display = open ? 'none' : '';
      btn.setAttribute('aria-expanded', String(!open));
    });
  })();

// img/flights/results-template.html
(function(){
    const pad = 8;
    function setOffset(){
      const bar = document.querySelector('.topbar');
      const sticky = document.querySelector('.sticky-controls');
      if (!bar || !sticky) return;
      const h = Math.ceil(bar.getBoundingClientRect().height);
      sticky.style.top = (h + pad) + 'px';
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setOffset);
    else setOffset();
    window.addEventListener('resize', () => { requestAnimationFrame(setOffset); }, { passive: true });
  })();

// img/flights/results-template.html
(function () {
    const u = new URL(location.href);
    const cal = new URL("/flights/calendar.html", location.origin);
    ["origin","destination","adults","currency","direct","return_at","departure_at","lang"].forEach(k=>{
      if (u.searchParams.has(k)) cal.searchParams.set(k, u.searchParams.get(k));
    });
    const d = u.searchParams.get("departure_at");
    if (d) cal.searchParams.set("month", d.slice(0,7));
    const el = document.getElementById("view-calendar");
    if (el) el.href = cal.toString();
    document.getElementById("y").textContent = new Date().getFullYear();
  })();

  document.addEventListener("click", function (e) {
    const a = e.target.closest("a.partner[href]"); if (!a) return;
    e.preventDefault(); window.open(a.href, "_blank", "noopener");
  }, true);

// img/flights/results.html
(function(){
    const btn = document.getElementById('btn-filters');
    const drw = document.getElementById('filters-drawer');
    if (!btn || !drw) return;
    btn.addEventListener('click', ()=>{
      const open = drw.style.display !== 'none';
      drw.style.display = open ? 'none' : '';
      btn.setAttribute('aria-expanded', String(!open));
    });
  })();

// img/flights/results.html
(function(){
    const pad = 8;
    function setOffset(){
      const bar = document.querySelector('.topbar');
      const sticky = document.querySelector('.sticky-controls');
      if (!bar || !sticky) return;
      const h = Math.ceil(bar.getBoundingClientRect().height);
      sticky.style.top = (h + pad) + 'px';
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setOffset);
    else setOffset();
    window.addEventListener('resize', () => { requestAnimationFrame(setOffset); }, { passive: true });
  })();

// img/flights/results.html
(function () {
    const u = new URL(location.href);
    const cal = new URL("/flights/calendar.html", location.origin);
    ["origin","destination","adults","currency","direct","return_at","departure_at","lang"].forEach(k=>{
      if (u.searchParams.has(k)) cal.searchParams.set(k, u.searchParams.get(k));
    });
    const d = u.searchParams.get("departure_at");
    if (d) cal.searchParams.set("month", d.slice(0,7));
    const el = document.getElementById("view-calendar");
    if (el) el.href = cal.toString();
    document.getElementById("y").textContent = new Date().getFullYear();
  })();

  document.addEventListener("click", function (e) {
    const a = e.target.closest("a.partner[href]"); if (!a) return;
    e.preventDefault(); window.open(a.href, "_blank", "noopener");
  }, true);

// img/legal/terms.html
const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

// img/routes/bkk-hkt.html
{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://SabaiFly.com/"},
      {"@type":"ListItem","position":2,"name":"Routes","item":"https://SabaiFly.com/routes/"},
      {"@type":"ListItem","position":3,"name":"London to Bangkok","item":"https://SabaiFly.com/routes/bkk-hkt.html"}
    ]
  }

// img/routes/bkk-hkt.html
{
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {
        "@type":"Question",
        "name":"What’s the cheapest time to fly from London to Bangkok?",
        "acceptedAnswer":{"@type":"Answer","text":"Prices vary by season, but shoulder months outside major holidays often drop the most. Use the monthly price calendar to spot the cheapest days for your dates."}
      },
      {
        "@type":"Question",
        "name":"Which airports are served on this route?",
        "acceptedAnswer":{"@type":"Answer","text":"London flights typically depart from LHR, LGW, STN, LTN, or LCY. Bangkok has two main airports: HKT (Suvarnabhumi) and DMK (Don Mueang)."}
      },
      {
        "@type":"Question",
        "name":"How far in advance should I book?",
        "acceptedAnswer":{"@type":"Answer","text":"For economy, booking several weeks in advance is common; last-minute deals appear but are less predictable. Compare several dates on the calendar and watch for sales."}
      }
    ]
  }

// img/routes/lon-bkk.html
{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://SabaiFly.com/"},
      {"@type":"ListItem","position":2,"name":"Routes","item":"https://SabaiFly.com/routes/"},
      {"@type":"ListItem","position":3,"name":"London to Bangkok","item":"https://SabaiFly.com/routes/lon-bkk.html"}
    ]
  }

// img/routes/lon-bkk.html
{
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {
        "@type":"Question",
        "name":"What’s the cheapest time to fly from London to Bangkok?",
        "acceptedAnswer":{"@type":"Answer","text":"Prices vary by season, but shoulder months outside major holidays often drop the most. Use the monthly price calendar to spot the cheapest days for your dates."}
      },
      {
        "@type":"Question",
        "name":"Which airports are served on this route?",
        "acceptedAnswer":{"@type":"Answer","text":"London flights typically depart from LHR, LGW, STN, LTN, or LCY. Bangkok has two main airports: BKK (Suvarnabhumi) and DMK (Don Mueang)."}
      },
      {
        "@type":"Question",
        "name":"How far in advance should I book?",
        "acceptedAnswer":{"@type":"Answer","text":"For economy, booking several weeks in advance is common; last-minute deals appear but are less predictable. Compare several dates on the calendar and watch for sales."}
      }
    ]
  }

// img/routes/nyc-lon.html
{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://SabaiFly.com/"},
      {"@type":"ListItem","position":2,"name":"Routes","item":"https://SabaiFly.com/routes/"},
      {"@type":"ListItem","position":3,"name":"London to Bangkok","item":"https://SabaiFly.com/routes/nyc-lon.html"}
    ]
  }

// img/routes/nyc-lon.html
{
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {
        "@type":"Question",
        "name":"What’s the cheapest time to fly from London to Bangkok?",
        "acceptedAnswer":{"@type":"Answer","text":"Prices vary by season, but shoulder months outside major holidays often drop the most. Use the monthly price calendar to spot the cheapest days for your dates."}
      },
      {
        "@type":"Question",
        "name":"Which airports are served on this route?",
        "acceptedAnswer":{"@type":"Answer","text":"London flights typically depart from LHR, LGW, STN, LTN, or LCY. Bangkok has two main airports: LON (Suvarnabhumi) and DMK (Don Mueang)."}
      },
      {
        "@type":"Question",
        "name":"How far in advance should I book?",
        "acceptedAnswer":{"@type":"Answer","text":"For economy, booking several weeks in advance is common; last-minute deals appear but are less predictable. Compare several dates on the calendar and watch for sales."}
      }
    ]
  }

// legal/terms.html
const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

});
