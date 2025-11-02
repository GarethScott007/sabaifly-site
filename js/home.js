// /js/home.js (safe no-op if unified hero form exists)
(function () {
  const hasUnifiedForm = document.getElementById('home-search');
  if (hasUnifiedForm) return; // don't interfere with the hero form

  function onReady(fn){ document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function findSearchCTA(){
    let el = document.querySelector("[data-go='flights'], [data-nav='flights']");
    if (el) return el;
    el = document.querySelector(".btn-search, .search-btn, .cta-search");
    if (el) return el;
    el = document.querySelector("a[href='/flights/'], a[href='/flights']");
    if (el) return el;
    const btns = Array.from(document.querySelectorAll("button, a, .btn"));
    return btns.find(b => (b.textContent || "").trim().toLowerCase().includes("search flights")) || null;
  }
  function wireClickToFlights(btn){
    if (!btn) return;
    const go = () => { window.location.href = "/flights/"; };
    if (btn.tagName === "A") {
      if (!btn.getAttribute("href")) btn.setAttribute("href", "/flights/");
    } else {
      btn.addEventListener("click", (e) => { e.preventDefault(); go(); });
      btn.addEventListener("keydown", (e)=>{ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }});
      if (!btn.hasAttribute("tabindex")) btn.setAttribute("tabindex", "0");
      if (!btn.getAttribute("role")) btn.setAttribute("role", "button");
      if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Search flights");
    }
  }
  onReady(() => wireClickToFlights(findSearchCTA()));
})();
