// Cloudflare Pages Function: sitemap.xml
// Generates a simple XML sitemap, anchored to the canonical host.
const HOST = "https://sabaifly.com";

const ROUTES = [
  "/", 
  "/flights/",
  // Route spotlights
  "/routes/lon-bkk.html",
  "/routes/lon-nyc.html",
  "/routes/lon-dxb.html",
  "/routes/lon-sin.html",
  "/routes/lon-tyo.html",
  "/routes/lon-lax.html",
  "/routes/lon-syd.html",
  "/routes/lon-del.html",
  "/routes/lon-hkt.html",
  // Extras seen in repo
  "/routes/bkk-hkt.html",
  "/routes/lon-bom.html",
  "/routes/lon-hkg.html",
  "/routes/lon-kul.html"
];

export const onRequestGet = async () => {
  const lastmod = "2025-10-27";
  const urls = ROUTES.map(p => `  <url>\n    <loc>${HOST}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
               `<urlset xmlns="https://sabaifly.com">\n` +
               urls + "\n</urlset>\n";

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=600"
    }
  });
};
