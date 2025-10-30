(function(){
  var MID = 'G-4ZS36EFVMC';
  // Load external gtag JS
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MID);
  document.head.appendChild(s);
  // Initialize dataLayer and config (no inline in HTML)
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MID, { 'anonymize_ip': true });
})();
