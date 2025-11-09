import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const host = "https://www.sabaifly.com";
  const lastmod = new Date();
  const routes = ["/","/flights/","/routes/lon-bkk.html","/routes/lon-nyc.html","/routes/lon-dxb.html","/routes/lon-sin.html","/routes/lon-tyo.html","/routes/lon-lax.html","/routes/lon-syd.html","/routes/lon-del.html","/routes/lon-hkt.html","/routes/lon-hkg.html","/routes/lon-kul.html","/routes/lon-bom.html","/routes/bkk-hkt.html"];
  return routes.map((p) => ({ url: host + p, lastModified: lastmod, changeFrequency: p === "/" ? "daily" : "weekly", priority: p === "/" ? 1 : 0.8 }));
}
