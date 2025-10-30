// /js/routes-wire.js — robust Popular Routes (XSS-safe, cache-proof)
(function () {
  const TOP_ID  = "popular-routes";
  const FOOT_ID = "popular-routes-footer";

  // Safe defaults in case CDN returns 304-without-body or JSON is missing
  const DEFAULT_LIST = [
    { label: "London → Bangkok", origin: "LON", destination: "BKK", slug: "/routes/lon-bkk.html" },
    { label: "Bangkok → Phuket", origin: "BKK", destination: "HKT", slug: "/routes/bkk-hkt.html" },
    { label: "New York → London", origin: "NYC", destination: "LON", slug: "/routes/nyc-lon.html" }
  ];

  const isIATA = s => /^[A-Z0-9]{3}$/.test(String(s||"").toUpperCase());
  const isSlug = s => /^\/[a-z0-9\-\/]+\/?$/i.test(String(s||"").trim());
  const keepLangSuffix = () => {
    const lang = new URL(location.href).searchParams.get("lang");
    return lang ? `?lang=${encodeURIComponent(lang)}` : "";
  };
  const ready = fn => (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", fn, { once:true })
    : fn();

  async function loadPopularRoutes() {
    // Try fresh — avoid revalidation that can yield 304 without body
    try {
      const r = await fetch("/data/popular-routes.json", {
        headers: { accept: "application/json" },
        cache: "no-store"
      });
      if (r.ok) return await r.json();
    } catch {}
    // Retry with cache-buster
    try {
      const r2 = await fetch(`/data/popular-routes.json?ts=${Date.now()}`, {
        headers: { accept: "application/json" },
        cache: "reload"
      });
      if (r2.ok) return await r2.json();
    } catch {}
    // Fallback defaults (so chips always render)
    return DEFAULT_LIST;
  }

  function render(list, root) {
    if (!root) return;
    root.textContent = "";
    list.forEach(item => {
      const label = String(item?.label || "").trim();
      const origin = String(item?.origin || "").toUpperCase();
      const dest   = String(item?.destination || "").toUpperCase();
      const slug   = String(item?.slug || "").trim();
      if (!label || !isIATA(origin) || !isIATA(dest) || !isSlug(slug)) return;

      const a = document.createElement("a");
      a.className = "pill gradient";
      a.href = slug.replace(/\/+$/,"/") + keepLangSuffix();
      a.textContent = label;
      a.rel = "noopener";
      a.setAttribute("data-origin", origin);
      a.setAttribute("data-destination", dest);
      a.setAttribute("aria-label", `Open ${label} route page`);
      root.appendChild(a);
    });
  }

  ready(async () => {
    const topRoot  = document.getElementById(TOP_ID);
    const footRoot = document.getElementById(FOOT_ID);
    if (!topRoot && !footRoot) return;

    const list = await loadPopularRoutes();
    render(list, topRoot);
    render(list, footRoot);
  });
})();
