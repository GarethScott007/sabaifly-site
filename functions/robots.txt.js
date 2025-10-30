export async function onRequest({ request }) {
  const host = new URL(request.url).hostname.toLowerCase();
  const isPreview =
    host.endsWith('.pages.dev') || host.startsWith('stage.') || host.startsWith('staging.');
  const body = isPreview
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nSitemap: https://sabaifly.com/sitemap.xml\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
