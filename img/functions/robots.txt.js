export async function onRequest({ request }) {
  const host = new URL(request.url).host.toLowerCase();
  const isStaging = host.startsWith('staging.');

  const body = isStaging
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\nSitemap: https://www.SabaiFly.com/sitemap.xml\n';

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
