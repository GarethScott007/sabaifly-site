// /js/route-cta.js v2 — builds route CTAs; light GEO currency
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else { fn(); }
  }
  function getCookie(name) {
    return document.cookie.split(";").map(s=>s.trim())
      .find(s => s.startsWith(name+"="))?.split("=")[1] || "";
  }
  function mapCurrency(cc) {
    cc = (cc || "").toUpperCase();
    if (cc === "GB") return "GBP";
    if (cc === "TH") return "THB";
    if (["US"].includes(cc)) return "USD";
    if (["EU","DE","FR","ES","IT","NL","IE","PT","AT","BE","FI","GR","LU","LT","LV","EE","SK","SI","MT","CY"].includes(cc)) return "EUR";
    return "USD";
  }

  onReady(function () {
    var origin = (document.querySelector('meta[name="route-origin"]') || {}).content || "";
    var dest   = (document.querySelector('meta[name="route-destination"]') || {}).content || "";
    origin = origin.toUpperCase().trim(); dest = dest.toUpperCase().trim();
    if (!origin || !dest) return;

    var rawLang = new URL(location.href).searchParams.get("lang") || "";
    var lang = (rawLang === "en" || rawLang === "th") ? rawLang : "";

    // GEO-aware currency (from cookie set by middleware)
    var cc = getCookie("pf_geo");
    var currency = mapCurrency(cc);

    function iso(daysFromToday) {
      var t = new Date();
      t.setUTCHours(12,0,0,0);
      t.setUTCDate(t.getUTCDate() + daysFromToday);
      return t.toISOString().slice(0,10);
    }
    var depart = iso(30), ret = iso(37);

    function buildResults(directOnly) {
      var u = new URL("/flights/results.html", location.origin);
      u.searchParams.set("origin", origin);
      u.searchParams.set("destination", dest);
      u.searchParams.set("departure_at", depart);
      u.searchParams.set("return_at", ret);
      u.searchParams.set("adults", "1");
      u.searchParams.set("children", "0");
      u.searchParams.set("infants", "0");
      u.searchParams.set("currency", currency);
      u.searchParams.set("direct", String(!!directOnly));
      if (lang) u.searchParams.set("lang", lang);
      return u.toString();
    }
    function buildCalendar() {
      var u = new URL("/flights/calendar.html", location.origin);
      u.searchParams.set("origin", origin);
      u.searchParams.set("destination", dest);
      if (lang) u.searchParams.set("lang", lang);
      return u.toString();
    }

    var elCal   = document.getElementById("cta-calendar");
    var elRes   = document.getElementById("cta-results");
    var elDir   = document.getElementById("cta-direct");
    if (elCal) elCal.href = buildCalendar();
    if (elRes) elRes.href = buildResults(false);
    if (elDir) elDir.href = buildResults(true);

    // Footer year
    var y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
