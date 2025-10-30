// /js/i18n.js  (v4)
// - ?lang= support + localStorage("lang")
// - Rewrites internal links with data-keep-lang="1"
// - Wires EN/TH pills (.lang-switch [data-lang])
// - Adds actions_back_to_results key and other labels.

const I18N = {
  en: {
    brand: "SabaiFly",
    nav_home: "Home",
    nav_flights: "Flights",
    nav_groups: "Group Trips",
    nav_contact: "Contact",
    nav_hotels: "Hotels",
    trip: "Trip",
    trip_return: "Return",
    trip_oneway: "One-way",
    from: "From",
    to: "To",
    depart: "Depart",
    ret: "Return",
    cabin: "Cabin",
    adults: "Adults",
    children: "Children",
    infants: "Infants",
    currency: "Currency",
    advanced: "Advanced",
    search: "Search",
    results: "Results",
    show_more: "Show more",

    results_title: "Flight results",
    results_subtitle: "Fast search. Clean results. Booking handled by trusted partners.",
    actions_back_to_search: "Back to search",
    actions_back_to_results: "Back to results",
    actions_view_calendar: "View calendar",
    actions_copy_api: "Copy API URL",
    price_calendar: "Price calendar",
    legal_terms: "Terms",
    legal_privacy: "Privacy",
    legal_cookies: "Cookies",
    status_searching: "Searching flights…",
    status_no_results: "No flights found for these dates.",
    status_failed: "Search failed."
  },
  th: {
    brand: "เพอร์เพิลไฟลท์",
    nav_home: "หน้าแรก",
    nav_flights: "ตั๋วเครื่องบิน",
    nav_groups: "ทริปสำหรับกลุ่ม",
    nav_contact: "ติดต่อ",
    nav_hotels: "ที่พัก",
    trip: "รูปแบบการเดินทาง",
    trip_return: "ไป-กลับ",
    trip_oneway: "เที่ยวเดียว",
    from: "ต้นทาง",
    to: "ปลายทาง",
    depart: "ออกเดินทาง",
    ret: "ขากลับ",
    cabin: "ชั้นโดยสาร",
    adults: "ผู้ใหญ่",
    children: "เด็ก",
    infants: "ทารก",
    currency: "สกุลเงิน",
    advanced: "ตัวเลือกเพิ่มเติม",
    search: "ค้นหา",
    results: "ผลลัพธ์",
    show_more: "แสดงเพิ่มเติม",

    results_title: "ผลการค้นหาเที่ยวบิน",
    results_subtitle: "ค้นหาอย่างรวดเร็ว แสดงผลชัดเจน การจองโดยพาร์ทเนอร์ที่เชื่อถือได้",
    actions_back_to_search: "กลับไปค้นหา",
    actions_back_to_results: "ย้อนกลับไปหน้าผลลัพธ์",
    actions_view_calendar: "ดูปฏิทินราคา",
    actions_copy_api: "คัดลอกลิงก์ API",
    price_calendar: "ปฏิทินราคา",
    legal_terms: "เงื่อนไข",
    legal_privacy: "ความเป็นส่วนตัว",
    legal_cookies: "คุกกี้",
    status_searching: "กำลังค้นหาเที่ยวบิน…",
    status_no_results: "ไม่พบเที่ยวบินสำหรับวันดังกล่าว",
    status_failed: "การค้นหาล้มเหลว"
  }
};

function t(key, lang){ return (I18N[lang]&&I18N[lang][key])||I18N.en[key]||key; }

function pickLang(){
  const u=new URL(location.href);
  const q=(u.searchParams.get("lang")||"").toLowerCase();
  const ls=(localStorage.getItem("lang")||"").toLowerCase();
  const nav=(navigator.language||"").toLowerCase();
  let lang=q||ls||(nav.startsWith("th")?"th":"en");
  if(!I18N[lang]) lang="en";
  if(q!==lang){ u.searchParams.set("lang",lang); history.replaceState(null,"",u.toString()); }
  localStorage.setItem("lang",lang);
  document.documentElement.setAttribute("lang",lang);
  window.PF_LANG=lang;
  return lang;
}

function applyI18n(lang){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.getAttribute("data-i18n"); el.textContent=t(key,lang);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"),lang));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el=>{
    el.innerHTML=t(el.getAttribute("data-i18n-html"),lang);
  });
  const ttl=document.querySelector("[data-i18n-title]");
  if(ttl) document.title=`${t(ttl.getAttribute("data-i18n-title"),lang)} — ${t("brand",lang)}`;
}

function rewriteLinks(lang){
  document.querySelectorAll("a[data-keep-lang='1']").forEach(a=>{
    const href=a.getAttribute("href")||"";
    try{
      const u=new URL(href,location.origin);
      if(u.origin!==location.origin) return;
      u.searchParams.set("lang",lang);
      a.setAttribute("href", u.pathname + (u.search? "?"+u.searchParams.toString() : ""));
    }catch{}
  });
}

function markActive(lang){
  document.querySelectorAll(".lang-switch [data-lang]").forEach(el=>{
    const is=el.getAttribute("data-lang")===lang;
    el.classList.toggle("solid",is);
    el.classList.toggle("ghost",!is);
    if(is) el.setAttribute("aria-current","true"); else el.removeAttribute("aria-current");
  });
}

function wirePills(){
  document.querySelectorAll(".lang-switch [data-lang]").forEach(el=>{
    el.addEventListener("click",(e)=>{
      e.preventDefault();
      const next=el.getAttribute("data-lang"); if(!I18N[next]) return;
      const u=new URL(location.href); u.searchParams.set("lang",next);
      localStorage.setItem("lang",next); location.href=u.toString();
    });
  });
}

function bootI18n(){ const lang=pickLang(); applyI18n(lang); rewriteLinks(lang); markActive(lang); wirePills(); }

export { t, applyI18n, pickLang, bootI18n };

if(!window.__PF_I18N_BOOTED__){ window.__PF_I18N_BOOTED__=true;
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bootI18n);
  else bootI18n();
}
