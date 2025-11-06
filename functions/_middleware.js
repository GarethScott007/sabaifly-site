export async function onRequest(context){
  const {request,next}=context; const url=new URL(request.url); const host=url.hostname.toLowerCase();
  const PROD=new Set(["www.sabaifly.com","sabaifly.com","sabaifly-site.pages.dev"]); const isProd=PROD.has(host);
  let res=await next(); try{
    const ct=res.headers.get("content-type")||""; const isHtml=ct.includes("text/html"); const is2xx=res.status>=200&&res.status<300;
    if(isProd&&isHtml&&is2xx){ const canonical=new URL(url.toString()); canonical.protocol="https:"; canonical.hostname="www.sabaifly.com";
      const allow=new Set(["origin","destination","departure_at","return_at","adults","children","infants","direct","lang","currency","calendar","month"]);
      for(const [k] of canonical.searchParams){ if(!allow.has(k)) canonical.searchParams.delete(k); }
      const existing=res.headers.get("Link")||""; if(!/rel="?canonical"?/i.test(existing)){ res.headers.append("Link", `<${canonical.toString()}>; rel="canonical"`); } }
    res.headers.set("X-Env-Mode", isProd ? "prod" : "stage");
  }catch(_){} return res;
}