// /js/route-init.js — reads #route-config JSON and fixes URL + cards (CSP-safe)
(function(){
  function isIATA(s){ return /^[A-Z0-9]{3}$/.test(String(s||'').toUpperCase()); }
  function city(code){
    const map = {
      BKK:"Bangkok", DMK:"Bangkok", HKT:"Phuket",
      LON:"London", LHR:"London", LGW:"London", STN:"London", LTN:"London", LCY:"London",
      NYC:"New York", JFK:"New York", EWR:"New York", LGA:"New York"
    };
    return map[code] || code;
  }
  function setURL(o,d){
    const u = new URL(location.href);
    if (!u.searchParams.get('origin')) u.searchParams.set('origin', o);
    if (!u.searchParams.get('destination')) u.searchParams.set('destination', d);
    history.replaceState(null,'',u);
  }
  function updateH1(o,d){
    const h1 = document.querySelector('h1');
    if (h1) h1.textContent = `${city(o)} (${o}) → ${city(d)} (${d}) flights`;
  }
  function findLabelEl(label){
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while(node = walker.nextNode()){
      const t = (node.textContent||'').trim().toLowerCase();
      if (t === label.toLowerCase()) return node;
    }
    return null;
  }
  function setFact(label, html){
    const labelEl = findLabelEl(label);
    if (!labelEl) return;
    let target = labelEl.nextElementSibling;
    if (!target || target.children.length === 0) target = labelEl.parentElement && labelEl.parentElement.lastElementChild;
    if (!target) target = labelEl.parentElement;
    if (target) target.innerHTML = html;
  }
  function applyCards(o,d,cfg){
    if (cfg && cfg.cards){
      const c = cfg.cards;
      if (c.airports_from && c.airports_to) setFact('Airports', `${c.airports_from} → ${c.airports_to}`);
      if (c.travel) setFact('Typical travel time', c.travel);
      if (c.strategy) setFact('Best strategy', c.strategy);
    }
  }
  function init(){
    const el = document.getElementById('route-config');
    if (!el) return;
    let cfg = null; try { cfg = JSON.parse(el.textContent); } catch { return; }
    const o = String(cfg.origin||'').toUpperCase();
    const d = String(cfg.destination||'').toUpperCase();
    if (!isIATA(o) || !isIATA(d)) return;
    setURL(o,d);
    updateH1(o,d);
    applyCards(o,d,cfg);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
