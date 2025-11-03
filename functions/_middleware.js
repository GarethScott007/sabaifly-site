export async function onRequest(context) {
  const url  = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // Treat these as production
  const PROD_HOSTS = new Set([
    "SabaiFly.com",
    "www.SabaiFly.com",
    "SabaiFlys.pages.dev" // prod Pages domain (double 'ss')
  ]);
  const isProd = PROD_HOSTS.has(host);

  // GEO (from Cloudflare edge)
  const cf = context.request.cf || {};
  const country = (cf.country || "").toUpperCase(); // e.g., "GB", "TH"
  const reqCookie = context.request.headers.get("cookie") || "";
  const hasGeoCookie = /(?:^|;\s*)pf_geo=/.test(reqCookie);

  // Get the origin response
  const res = await context.next();
  // Canonical Link header (prod HTML 2xx only)
  try {
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const isHtml = ct.includes('text/html');
    const is2xx  = res.status >= 200 && res.status < 300;
    if (isProd && isHtml && is2xx) {
      const canonical = new URL(url.toString());
      canonical.protocol = 'https:';
      canonical.hostname = 'www.sabaifly.com';
      const allow = new Set(['origin','destination','departure_at','return_at','adults','children','infants','direct','lang','currency','calendar','month']);
      for (const [k] of canonical.searchParams) { if (!allow.has(k)) canonical.searchParams.delete(k); }
      const existing = res.headers.get('Link') || '';
      if (!/rel="?canonical"?/i.test(existing)) res.headers.append('Link', `<${canonical.toString()}>; rel="canonical"`);
    }
  } catch(e) {}


  // Env marker
  res.headers.set("X-Env-Mode", isProd ? "prod" : "staging");

  // Security hygiene (don’t fight existing headers if already present upstream)
  res.headers.set("X-Content-Type-Options", "nosniff");
  if (!res.headers.has("Referrer-Policy")) {
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }

  // Indexing + transport
  if (isProd) {
    res.headers.delete("X-Robots-Tag");
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  } else {
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.delete("Strict-Transport-Security");
  }

  // GEO cookie (30 days) — used client-side to pick a sensible currency, etc.
  if (country && !hasGeoCookie) {
    res.headers.append(
      "Set-Cookie",
      `pf_geo=${country}; Max-Age=2592000; Path=/; SameSite=Lax; Secure`
    );
  }

  return res;
}
