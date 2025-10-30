// /js/home.js (ES module)
// Purpose: make the "Search flights" button actually navigate to /flights/.
// No HTML or style changes required.

function onReady(fn){ document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }

function findSearchCTA(){
  // 1) Explicit data-hook if your markup already has it
  let el = document.querySelector("[data-go='flights'], [data-nav='flights']");
  if (el) return el;

  // 2) Common class names you might already use
  el = document.querySelector(".btn-search, .search-btn, .cta-search");
  if (el) return el;

  // 3) Any <a> with href to flights
  el = document.querySelector("a[href='/flights/'], a[href='/flights']");
  if (el) return el;

  // 4) Fallback: a <button> whose text includes "search flights" (case-insensitive)
  const btns = Array.from(document.querySelectorAll("button, a, .btn"));
  const found = btns.find(b => (b.textContent || "").trim().toLowerCase().includes("search flights"));
  return found || null;
}

function wireClickToFlights(btn){
  if (!btn) return;
  const go = () => { window.location.href = "/flights/"; };
  // If it's an <a> without href, give it one; otherwise add a click handler.
  if (btn.tagName === "A") {
    if (!btn.getAttribute("href")) btn.setAttribute("href", "/flights/");
    // let the browser navigate normally
  } else {
    btn.addEventListener("click", (e) => { e.preventDefault(); go(); });
    btn.addEventListener("keydown", (e)=>{ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }});
    // Accessibility: ensure it's reachable with keyboard
    if (!btn.hasAttribute("tabindex")) btn.setAttribute("tabindex", "0");
    if (!btn.getAttribute("role")) btn.setAttribute("role", "button");
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Search flights");
  }
}

onReady(() => {
  const cta = findSearchCTA();
  wireClickToFlights(cta);
});
