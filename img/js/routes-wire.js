// /js/routes-wire.js — Build popular-route chips (no HTML injection)
(function () {
  const topId = "popular-routes";
  const footId = "popular-routes-footer";
  const topRoot  = document.getElementById(topId);
  const footRoot = document.getElementById(footId);
  if (!topRoot && !footRoot) return;

  const isIATA = s => /^[A-Z0-9]{3}$/.test(String(s||"").toUpperCase());
  const isSlug = s => /^\/[a-z0-9\-\/]+\/?$/i.test(String(s||"").trim());
  const keepLangSuffix = () => {
    const lang = new URL(location.href).searchParams.get("lang");
    return lang ? `?lang=${encodeURIComponent(lang)}` : "";
  };

  fetch("/data/popular-routes.json", { headers: { "accept":"application/json" } })
    .then(r => r.ok ? r.json() : [])
    .then(list => Array.isArray(list) ? list : [])
    .then(list => {
      [topRoot, footRoot].forEach(root => {
        if (!root) return;
        root.textContent = "";
        list.forEach(item => {
          const label = String(item.label||"").trim();
          const origin = String(item.origin||"").toUpperCase();
          const dest   = String(item.destination||"").toUpperCase();
          const slug   = String(item.slug||"").trim();
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
      });
    })
    .catch(()=>{});
})();