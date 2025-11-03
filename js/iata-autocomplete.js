
(function(){
  function onReady(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  function el(tag, attrs){ var e=document.createElement(tag); for (var k in attrs||{}) e.setAttribute(k, attrs[k]); return e; }
  function install(inputId){
    var input=document.getElementById(inputId); if(!input) return;
    var listId=inputId+'-list';
    input.setAttribute('list', listId);
    var dl=el('datalist', {id:listId});
    document.body.appendChild(dl);
    fetch('/data/airports-min.json', {credentials:'same-origin'}).then(r=>r.ok?r.json():[]).then(function(arr){
      dl.innerHTML=''; arr.forEach(function(a){ var opt=el('option',{value:a.code}); opt.label=a.label; dl.appendChild(opt); });
    }).catch(function(){});
    input.addEventListener('change', function(){
      var v=input.value.trim(); var m=v.match(/\(([A-Za-z]{3})\)$/);
      if(m) input.value=m[1].toUpperCase();
      else if(/^[A-Za-z]{3}$/.test(v)) input.value=v.toUpperCase();
    });
  }
  onReady(function(){ install('origin'); install('destination'); });
})();
