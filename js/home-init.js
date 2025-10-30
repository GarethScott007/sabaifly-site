// /js/home-init.js — keep year; wire EXACTLY three hero deal pills (CSP-safe)
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(function () {
    // 1) Footer year
    var y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    // 2) Current language (propagate if present, clamped to supported)
    var rawLang = new URL(location.href).searchParams.get("lang") || "";
    var lang = (rawLang === "en" || rawLang === "th") ? rawLang : "";

    // 3) Date helpers (UTC noon avoids DST weirdness)
    function iso(daysFromToday) {
      var t = new Date();
      t.setUTCHours(12, 0, 0, 0);
      t.setUTCDate(t.getUTCDate() + daysFromToday);
      return t.toISOString().slice(0, 10);
    }

    function dealHref(origin, dest) {
      var depart = iso(60); // ~2 months out
      var ret    = iso(67); // +7 days
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
      return u.toString();
    }

    function wireDeal(id, origin, dest) {
      var a = document.getElementById(id);
      if (!a) return;
      a.setAttribute("href", dealHref(origin, dest));
    }

    // 4) Wire exactly these three hero deal pills
    wireDeal("deal-lon-bkk", "LON", "BKK");
    wireDeal("deal-lon-nyc", "LON", "NYC");
    wireDeal("deal-lon-dxb", "LON", "DXB");

    // 5) Defensive: remove any legacy single-route chip if present in hero
    var legacy = document.getElementById("route-lon-bkk");
    if (legacy) legacy.remove();
  });
})();
