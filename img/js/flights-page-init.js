// /js/flights-page-init.js — set currency default from lang
(function(){
  const cur = document.getElementById("currency");
  if (!cur) return;
  const lang = new URL(location.href).searchParams.get("lang");
  cur.value = (lang === "th") ? "THB" : "GBP";
})();