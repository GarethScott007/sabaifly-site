// /js/home-init.js — unify hero logic (footer year, three deal pills, hero search → results)
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

    // 2) Current language (propagate if present, clamp to supported)
    var rawLang = new URL(location.href).searchParams.get("lang") || "";
    var lang = (rawLang === "en" || rawLang === "th") ? rawLang : "";

    // -----------------------------
    // Helpers
    // -----------------------------
    // UTC noon → ISO YYYY-MM-DD (avoids DST weirdness)
    function isoIn(daysFromToday) {
      var t = new Date();
      t.setUTCHours(12, 0, 0, 0);
      t.setUTCDate(t.getUTCDate() + daysFromToday);
      return t.toISOString().slice(0, 10);
    }

    // Deal link builder (kept exactly like your original)
    function dealHref(origin, dest) {
      var depart = isoIn(60); // ~2 months out
      var ret    = isoIn(67); // +7 days
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

    // Basic name→IATA helper so free-typed names still work
    var TOP_IATA = {
      london: "LON", bangkok: "BKK", "newyork": "NYC", "new york": "NYC",
      dubai: "DXB", singapore: "SIN", tokyo: "TYO", "losangeles": "LAX",
      "los angeles": "LAX", sydney: "SYD", delhi: "DEL", phuket: "HKT",
      hongkong: "HKG", "hong kong": "HKG", kuala: "KUL", kul: "KUL",
      mumbai: "BOM"
    };

    function pickIata(str) {
      if (!str) return "";
      var s = String(str).trim();
      var m = s.match(/\(([A-Z]{3})\)/i);      // “Bangkok (BKK)”
      if (m) return m[1].toUpperCase();
      if (/^[A-Za-z]{3}$/.test(s)) return s.toUpperCase(); // already a code
      var key = s.toLowerCase().replace(/\s+/g, "");
      return TOP_IATA[key] || s; // fallback: pass through
    }

    function fmtDate(d) {
      if (!d) return "";
      var dt = new Date(d);
      if (isNaN(dt.getTime())) return "";
      var y = dt.getFullYear();
      var m = String(dt.getMonth() + 1).padStart(2, "0");
      var day = String(dt.getDate()).padStart(2, "0");
      return y + "-" + m + "-" + day;
    }

    // -----------------------------
    // 3) Wire EXACTLY these three hero deal pills
    // -----------------------------
    wireDeal("deal-lon-bkk", "LON", "BKK");
    wireDeal("deal-lon-nyc", "LON", "NYC");
    wireDeal("deal-lon-dxb", "LON", "DXB");

    // Defensive: remove any legacy single-route chip if present in hero
    var legacy = document.getElementById("route-lon-bkk");
    if (legacy) legacy.remove();

    // -----------------------------
    // 4) Wire the HERO SEARCH FORM to go straight to results
    //    Supports both param styles so the results page can read either.
    // -----------------------------
    var form = document.querySelector("form.search-panel");
    if (form) {
      var fromEl = form.querySelector("input[name='from']");
      var toEl   = form.querySelector("input[name='to']");
      var depEl  = form.querySelector("input[name='depart']");
      var retEl  = form.querySelector("input[name='return']");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var origin = pickIata(fromEl && fromEl.value);
        var dest   = pickIata(toEl && toEl.value);
        var depart = fmtDate(depEl && depEl.value);
        var ret    = fmtDate(retEl && retEl.value);

        var u = new URL("/flights/results.html", location.origin);

        // Your current scheme (from deals):
        if (origin) u.searchParams.set("origin", origin);
        if (dest)   u.searchParams.set("destination", dest);
        if (depart) u.searchParams.set("departure_at", depart);
        if (ret)    u.searchParams.set("return_at", ret);

        // Also set alt names (some pages/scripts may expect these)
        if (origin) u.searchParams.set("from", origin);
        if (dest)   u.searchParams.set("to", dest);
        if (depart) u.searchParams.set("depart", depart);
        if (ret)    u.searchParams.set("return", ret);

        if (lang)   u.searchParams.set("lang", lang);

        // optional defaults you may want to keep aligned with deals:
        u.searchParams.set("adults", "1");
        u.searchParams.set("children", "0");
        u.searchParams.set("infants", "0");
        u.searchParams.set("currency", "GBP");
        u.searchParams.set("direct", "false");

        window.location.assign(u.toString());
      });
    }
  });
})();
