export async function onRequest({ request }) {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();
  const isStaging = host.endsWith('.pages.dev');
  const body = isStaging
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nSitemap: https://sabaifly.com/sitemap.xml\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
