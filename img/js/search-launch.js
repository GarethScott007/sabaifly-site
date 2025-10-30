// /js/search-launch.js  v15 — XSS Secure
(function(){
  const $ = (s, r=document) => r.querySelector(s);

  // Safe datalist population
  function populateDatalist(datalistEl, items) {
    // Clear safely
    while (datalistEl.firstChild) datalistEl.removeChild(datalistEl.firstChild);
    
    items.forEach(it => {
      const option = document.createElement('option');
      option.value = it.code;
      option.label = it.label;
      datalistEl.appendChild(option);
    });
  }

  // [Rest of your existing code remains exactly the same]
  const form     = $("#flight-search");
  const tripGrp  = $("#trip-type");
  const retBlock = $("#return-block");

  const from   = $("#origin");
  const to     = $("#destination");
  const depart = $("#departure_at");
  const ret    = $("#return_at");
  const curSel = $("#currency");
  const adults = $("#adults");
  const children = $("#children");
  const infants  = $("#infants");
  const direct   = $("#direct");

  const listFrom = $("#origin-list");
  const listTo   = $("#destination-list");

  const LANG = new URL(location.href).searchParams.get("lang");

  const toISO = (s) => {
    s = String(s||"").trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (!m) return "";
    let [_, d, mo, y] = m; if (y.length===2) y="20"+y;
    return `${y.padStart(4,"0")}-${mo.padStart(2,"0")}-${d.padStart(2,"0")}`;
  };

  const SUGGEST_URL = "/api/suggest";
  let lastCtl = 0;
  async function fetchSuggest(q){
    const ctl = ++lastCtl;
    const u = new URL(SUGGEST_URL, location.origin);
    u.searchParams.set("q", q);
    u.searchParams.set("limit", "12");
    const r = await fetch(u.toString(), { headers: { accept: "application/json" }});
    if (!r.ok) return [];
    const json = await r.json().catch(()=>({data:[]}));
    if (ctl !== lastCtl) return [];
    const arr = Array.isArray(json?.data) ? json.data : [];
    return arr.map(x=>{
      const code = String(x.code||"").toUpperCase().slice(0,4);
      const label = [x.name||x.city||"", code ? `(${code})` : "", x.country ? `, ${x.country}` : ""].join("").trim();
      return { code, label };
    }).filter(x=>x.code);
  }

  function attachTypeahead(inputEl, datalistEl, nextFocusEl){
    let t = 0;
    inputEl.addEventListener("input", ()=>{
      const q = inputEl.value.trim();
      clearTimeout(t);
      if (q.length < 2){ 
        while (datalistEl.firstChild) datalistEl.removeChild(datalistEl.firstChild);
        return; 
      }
      t = setTimeout(async ()=>{
        const items = await fetchSuggest(q);
        populateDatalist(datalistEl, items);
      }, 180);
    });

    inputEl.addEventListener("change", ()=>{
      inputEl.value = String(inputEl.value||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4);
      if (nextFocusEl) nextFocusEl.focus();
    });

    inputEl.addEventListener("keydown", (e)=>{
      if (e.key === "Enter" && inputEl.value.trim()){
        e.preventDefault();
        inputEl.dispatchEvent(new Event("change"));
      }
    });
  }

  attachTypeahead(from, listFrom, to);
  attachTypeahead(to,   listTo,   depart);

  let trip = "return";
  tripGrp?.addEventListener("click", (e)=>{
    const chip = e.target.closest("[data-trip]"); if (!chip) return;
    trip = chip.getAttribute("data-trip");
    [...tripGrp.querySelectorAll(".chip")].forEach(c=>{
      const on = (c===chip);
      c.classList.toggle("active", on);
      c.setAttribute("aria-checked", on ? "true" : "false");
    });
    if (trip === "oneway"){ ret.value=""; retBlock.style.display="none"; }
    else { retBlock.style.display=""; ret.focus(); }
  });

  (function prefill(){
    const Q = new URLSearchParams(location.search);
    if (Q.get("origin"))       from.value   = Q.get("origin").toUpperCase();
    if (Q.get("destination"))  to.value     = Q.get("destination").toUpperCase();
    if (Q.get("departure_at")) depart.value = toISO(Q.get("departure_at"));
    if (Q.get("return_at"))   { ret.value   = toISO(Q.get("return_at")); retBlock.style.display=""; trip="return"; }
    curSel.value = (Q.get("currency") || "GBP").toUpperCase();
    adults.value = Q.get("adults")   || "1";
    children.value = Q.get("children") || "0";
    infants.value  = Q.get("infants")  || "0";
    if (String(Q.get("direct")||"false").toLowerCase() === "true") direct.checked = true;
  })();

  depart.addEventListener("change", ()=> (trip==="return" ? ret : curSel).focus());
  ret.addEventListener("change", ()=> curSel.focus());

  form?.addEventListener("submit", (e)=>{
    e.preventDefault();

    const ORI = (from.value||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4);
    const DES = (to.value||"").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4);
    if (!ORI || !DES) return alert("Please enter origin and destination IATA codes (e.g., LON, BKK).");

    const u = new URL("/flights/results.html", location.origin);
    u.searchParams.set("origin", ORI);
    u.searchParams.set("destination", DES);

    const depISO = toISO(depart.value);
    if (depISO) u.searchParams.set("departure_at", depISO);

    if (trip === "return") {
      const retISO = toISO(ret.value);
      if (retISO) u.searchParams.set("return_at", retISO);
    } else {
      u.searchParams.delete("return_at");
    }

    u.searchParams.set("currency", (curSel.value||"GBP").toUpperCase());
    u.searchParams.set("adults",   String(Math.max(1, Number(adults.value||1))));
    u.searchParams.set("children", String(Math.max(0, Number(children.value||0))));
    u.searchParams.set("infants",  String(Math.max(0, Number(infants.value ||0))));
    u.searchParams.set("direct", direct.checked ? "true" : "false");

    if (LANG) u.searchParams.set("lang", LANG);

    location.href = u.toString();
  });
})();
