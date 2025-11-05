// /functions/sitemap.xml.js — correct namespaces + www host
export async function onRequest() {
  const HOST = "https://www.sabaifly.com";
  const ROUTES = [
    "/", "/flights/",
    "/routes/lon-bkk.html",
    "/routes/lon-nyc.html",
    "/routes/lon-dxb.html",
    "/routes/lon-sin.html",
    "/routes/lon-tyo.html",
    "/routes/lon-lax.html",
    "/routes/lon-syd.html",
    "/routes/lon-del.html"
  ];
  const lastmod = new Date().toISOString().slice(0,10);
  const urls = ROUTES.map(p => `  <url>
    <loc>${HOST}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=600"
    }
  });
}
