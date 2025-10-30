// /js/results-wire.js — make every "View calendar" button work with real params
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function geoCurrency() {
    var m = document.cookie.match(/(?:^|;\s*)pf_geo=([^;]+)/);
    var cc = m ? decodeURIComponent(m[1]).toUpperCase() : "";
    if (cc === "GB") return "GBP";
    if (cc === "TH") return "THB";
    if (cc === "AE") return "AED";
    if (cc === "US") return "USD";
    if (["DE","FR","ES","IT","NL","IE","PT","AT","BE","FI","GR","LU","LT","LV","EE","SK","SI","MT","CY"].includes(cc)) return "EUR";
    return "USD";
  }

  function baseParamsFromURL() {
    var url = new URL(location.href), q = url.searchParams;
    return {
      origin:       q.get("origin") || "",
      destination:  q.get("destination") || "",
      departure_at: q.get("departure_at") || "",
      return_at:    q.get("return_at") || "",
      adults:       q.get("adults") || "1",
      children:     q.get("children") || "0",
      infants:      q.get("infants") || "0",
      direct:       q.get("direct") || "false",
      currency:     q.get("currency") || "",
      lang:         q.get("lang") || ""
    };
  }

  function monthFromYYYYMMDD(d) {
    return (d && d.length >= 7) ? d.slice(0,7) : "";
  }

  function buildCalendarURL(base, override) {
    var u = new URL("/flights/calendar.html", location.origin);
    var set = (k,v)=>{ if (v!==undefined && v!==null && v!=="") u.searchParams.set(k,v); };
    var origin = override.origin || base.origin;
    var dest   = override.dest   || base.destination;

    set("origin", origin);
    set("destination", dest);
    set("departure_at", base.departure_at);
    set("return_at", base.return_at);
    set("adults", base.adults);
    set("children", base.children);
    set("infants", base.infants);
    set("direct", base.direct);
    set("currency", base.currency || geoCurrency());
    set("lang", base.lang);
    set("calendar", "1");
    var m = monthFromYYYYMMDD(base.departure_at);
    if (m) u.searchParams.set("month", m);
    return u.toString();
  }

  function candidates() {
    // Any of these will be wired:
    // - explicit class
    // - explicit role
    // - i18n key you use on the header button (also works for card buttons)
    return document.querySelectorAll(
      'a.js-view-calendar, a[data-role="view-calendar"], a[data-action="view-calendar"], a[data-i18n="actions_view_calendar"]'
    );
  }

  function wireAll() {
    var base = baseParamsFromURL();
    candidates().forEach(function (a) {
      if (a.__pf_wired) return;
      var o = a.getAttribute("data-origin") || base.origin;
      var d = a.getAttribute("data-destination") || base.destination;
      a.setAttribute("href", buildCalendarURL(base, { origin: o, dest: d }));
      // Safety: fix first click if some template still has href="#"
      a.addEventListener("click", function () {
        if (!a.href || a.getAttribute("href") === "#") {
          a.setAttribute("href", buildCalendarURL(base, { origin: o, dest: d }));
        }
      }, { once: true, passive: true });
      a.__pf_wired = true;
    });
  }

  onReady(function () {
    // Footer year – harmless convenience
    var y = document.getElementById("y");
    if (y) y.textContent = new Date().getFullYear();

    wireAll();

    // If your results list renders later or updates via XHR, catch new buttons
    var mo = new MutationObserver(wireAll);
    mo.observe(document.body, { childList: true, subtree: true });

    // Partner links always open in a new tab (belt & braces)
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a.partner[href]");
      if (!a) return;
      e.preventDefault();
      window.open(a.href, "_blank", "noopener");
    }, true);
  });
})();
