// /js/home-init.js — unify hero logic (footer year, three deal pills, hero search → results)
(function(){function onReady(fn){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",fn,{once:true});}else{fn();}}
onReady(function(){var y=document.getElementById("y"); if(y) y.textContent=new Date().getFullYear();
var rawLang=new URL(location.href).searchParams.get("lang")||""; var lang=(rawLang==="en"||rawLang==="th")?rawLang:"";
function isoIn(d){var t=new Date(); t.setUTCHours(12,0,0,0); t.setUTCDate(t.getUTCDate()+d); return t.toISOString().slice(0,10);}
function dealHref(o,d){var depart=isoIn(60), ret=isoIn(67); var u=new URL("/flights/results.html", location.origin);
u.searchParams.set("origin",o); u.searchParams.set("destination",d); u.searchParams.set("departure_at",depart); u.searchParams.set("return_at",ret);
u.searchParams.set("adults","1"); u.searchParams.set("children","0"); u.searchParams.set("infants","0"); u.searchParams.set("currency","GBP"); u.searchParams.set("direct","false"); if(lang) u.searchParams.set("lang",lang); return u.toString();}
function wireDeal(id,o,d){var a=document.getElementById(id); if(!a) return; a.setAttribute("href", dealHref(o,d));}
wireDeal("deal-lon-bkk","LON","BKK"); wireDeal("deal-lon-nyc","LON","NYC"); wireDeal("deal-lon-dxb","LON","DXB");
var legacy=document.getElementById("route-lon-bkk"); if(legacy) legacy.remove();
var simpleForm=document.getElementById("flight-search"); if(simpleForm && simpleForm.querySelector("#origin")){ return; }
var form=document.querySelector("form.search-panel"); if(form){var fromEl=form.querySelector("input[name='from']"); var toEl=form.querySelector("input[name='to']"); var depEl=form.querySelector("input[name='depart']"); var retEl=form.querySelector("input[name='return']"); if(!fromEl||!toEl) return;
function pickIata(s){if(!s) return ""; var m=String(s).trim().match(/\(([A-Z]{3})\)/i); if(m) return m[1].toUpperCase(); if(/^[A-Za-z]{3}$/.test(s)) return String(s).toUpperCase();
var map={london:"LON",bangkok:"BKK","newyork":"NYC","new york":"NYC",dubai:"DXB",singapore:"SIN",tokyo:"TYO","losangeles":"LAX","los angeles":"LAX",sydney:"SYD",delhi:"DEL",phuket:"HKT","hongkong":"HKG","hong kong":"HKG",kul:"KUL",mumbai:"BOM"}; var key=String(s).toLowerCase().replace(/\s+/g,""); return map[key]||s;}
function fmtDate(d){ if(!d) return ""; var dt=new Date(d); if(isNaN(dt)) return ""; var y=dt.getFullYear(), m=String(dt.getMonth()+1).padStart(2,"0"), day=String(dt.getDate()).padStart(2,"0"); return y+"-"+m+"-"+day;}
form.addEventListener("submit", function(e){ e.preventDefault(); var origin=pickIata(fromEl.value), dest=pickIata(toEl.value), depart=fmtDate(depEl&&depEl.value), ret=fmtDate(retEl&&retEl.value);
var u=new URL("/flights/results.html", location.origin); if(origin)u.searchParams.set("origin",origin); if(dest)u.searchParams.set("destination",dest); if(depart)u.searchParams.set("departure_at",depart); if(ret)u.searchParams.set("return_at",ret); if(lang)u.searchParams.set("lang",lang);
u.searchParams.set("adults","1"); u.searchParams.set("children","0"); u.searchParams.set("infants","0"); u.searchParams.set("currency","GBP"); u.searchParams.set("direct","false");
window.location.assign(u.toString());});}});})();
