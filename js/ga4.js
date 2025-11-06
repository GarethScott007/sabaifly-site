(function(){
  var MID = 'G-4ZS36EFVMC'; // replace with your GA4 Measurement ID if needed
  var host = String(location.hostname||'').toLowerCase();
  var PROD = host === 'www.sabaifly.com' || host === 'sabaifly.com';
  if (!PROD) return; // don't run GA on staging/dev

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MID, { 'anonymize_ip': true });
})();
