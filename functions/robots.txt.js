export async function onRequest({ request }) {
  const url = new URL(request.url);
  const isStage = url.hostname.startsWith('stage.');

  const body = isStage
    ? `User-agent: *
Disallow: /
`
    : `User-agent: *
Allow: /
Sitemap: https://www.sabaifly.com/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "max-age=3600"
    }
  });
}
