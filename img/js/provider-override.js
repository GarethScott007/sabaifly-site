// /js/provider-override.js  v4 — safe rewrite using data-provider; skip rows with dates
(function(){
  function isoOnly(s){ return (String(s||'').match(/^(\d{4}-\d{2}-\d{2})/)||['',''])[1]; }

  // Metro → city mapping
  const CITY = {
    LON:["LHR","LGW","LTN","LCY","STN","SEN"], NYC:["JFK","EWR","LGA"],
    PAR:["CDG","ORY","BVA"], TYO:["HND","NRT"], SEL:["ICN","GMP"],
    WAS:["IAD","DCA","BWI"], SAO:["GRU","CGH","VCP"], RIO:["GIG","SDU"],
    BUE:["EZE","AEP"], MOW:["SVO","DME","VKO"], YTO:["YYZ","YTZ","YHM"],
    YMQ:["YUL","YHU"], BKK:["BKK","DMK"]
  };
  function toCity(code){
    const c = String(code||'').toUpperCase();
    for (const k in CITY) if (k===c || CITY[k].includes(c)) return k;
    return c;
  }

  const Q = new URLSearchParams(location.search);
  const ORIGIN   = toCity(Q.get('origin'));
  const DEST     = toCity(Q.get('destination'));
  const DEPART   = isoOnly(Q.get('departure_at'));
  const RETURN   = isoOnly(Q.get('return_at'));
  const ADULTS   = Q.get('adults')   || '1';
  const CHILDREN = Q.get('children') || '0';
  const INFANTS  = Q.get('infants')  || '0';
  const CUR      = (Q.get('currency')||'GBP').toUpperCase();

  function rewrite(){
    document.querySelectorAll('.partner-row a[href*="/api/afflink"]').forEach(a=>{
      try{
        const url = new URL(a.href, location.origin);

        // If the link already carries row-level dates, keep it.
        if (url.searchParams.get('depart') || url.searchParams.get('return')) return;

        // Determine provider safely
        const prov = url.searchParams.get('provider') || (a.dataset.provider || 'avia');

        const u = new URL('/api/afflink', location.origin);
        u.searchParams.set('provider', prov);
        if (ORIGIN) u.searchParams.set('origin', ORIGIN);
        if (DEST)   u.searchParams.set('destination', DEST);
        if (DEPART) u.searchParams.set('depart', DEPART);
        if (RETURN) u.searchParams.set('return', RETURN);
        u.searchParams.set('adults',   ADULTS);
        u.searchParams.set('children', CHILDREN);
        u.searchParams.set('infants',  INFANTS);
        u.searchParams.set('currency', CUR);

        a.href = u.toString();
      }catch(e){}
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rewrite);
  else rewrite();

  const list = document.querySelector('#results-list');
  if (list && 'MutationObserver' in window){
    new MutationObserver(rewrite).observe(list, { childList:true, subtree:true });
  }
})();
