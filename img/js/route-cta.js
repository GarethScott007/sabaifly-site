// /js/route-cta.js — Wire CTAs on /routes/* from body data- attributes
(function () {
  const b = document.body;
  const ORI = String(b.getAttribute("data-origin")||"").toUpperCase();
  const DES = String(b.getAttribute("data-destination")||"").toUpperCase();
  if (!/^[A-Z0-9]{3}$/.test(ORI) || !/^[A-Z0-9]{3}$/.test(DES)) return;

  const u = new URL(location.href);
  const lang = u.searchParams.get("lang") || "";
  const keep = url => { if (lang) url.searchParams.set("lang", lang); return url.toString(); };

  const base = new URLSearchParams({ origin: ORI, destination: DES, adults: "1",
    currency: (lang === "th" ? "THB" : "GBP"), direct: "false" });

  const cal = new URL("/flights/calendar.html", location.origin);
  base.forEach((v,k)=>cal.searchParams.set(k,v));
  cal.searchParams.set("month", new Date().toISOString().slice(0,7));

  const res = new URL("/flights/results.html", location.origin);
  base.forEach((v,k)=>res.searchParams.set(k,v));

  const resDirect = new URL(res.toString());
  resDirect.searchParams.set("direct","true");

  const set = (id, url) => { const el=document.getElementById(id); if (el) el.href = keep(url); };
  set("cta-calendar", cal);
  set("cta-results",  res);
  set("cta-direct",   resDirect);

  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();