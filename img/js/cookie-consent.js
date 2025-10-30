// /js/cookie-consent.js  (v4)
// Shows banner unless accepted; add ?cookies=reset to force-show once.

(function () {
  const KEY = "pf_cc_v1";
  const u = new URL(location.href);
  if (u.searchParams.get("cookies") === "reset") {
    try { localStorage.removeItem(KEY); } catch {}
  }
  try { if (localStorage.getItem(KEY) === "1") return; } catch {}

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;background:#111;color:#fff;border-radius:14px;padding:14px;box-shadow:0 12px 28px rgba(0,0,0,.2);display:flex;gap:12px;align-items:center;max-width:820px;margin-inline:auto";
  banner.innerHTML = `
    <div style="flex:1 1 auto;line-height:1.4">
      We use cookies to improve your experience and analyze traffic.
      See our <a href="/legal/cookies.html" data-keep-lang="1" style="color:#ffd666;text-decoration:underline">Cookies</a>
      and <a href="/legal/privacy.html" data-keep-lang="1" style="color:#ffd666;text-decoration:underline">Privacy</a>.
    </div>
    <div style="display:flex;gap:8px;flex:0 0 auto">
      <button id="pf-cc-accept" class="btn" style="background:#fff;color:#111;border:none;border-radius:10px;padding:10px 14px;cursor:pointer">Accept</button>
      <button id="pf-cc-close"  class="btn ghost" style="background:transparent;color:#fff;border:1px solid #fff;border-radius:10px;padding:10px 14px;cursor:pointer">Close</button>
    </div>
  `;
  function mount(){ document.body.appendChild(banner); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();

  function hide(){ banner.remove(); }
  banner.querySelector("#pf-cc-accept").addEventListener("click", ()=>{ try { localStorage.setItem(KEY,"1"); } catch {} hide(); });
  banner.querySelector("#pf-cc-close").addEventListener("click", hide);
})();
