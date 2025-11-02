export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // tolerate aliases: "kiwirent" → "kiwitaxi"
  const raw = (url.searchParams.get("provider") || "").toLowerCase();
  const provider = raw === "kiwirent" ? "kiwitaxi" : raw;

  const marker = env.TP_PARTNER_ID || env.TP_MARKER || "670577";
  const trs    = env.TP_TRS || "470518";

  const tpClick = p => `https://tp.media/click?${p}`;
  const tpR     = p => `https://tp.media/r?${p}`;

  let target;

  switch (provider) {
    case "kiwi": {
      // Kiwi (last-minute flights)
      const p = new URLSearchParams({
        shmarker: marker, promo_id: "8868", source_type: "link",
        type: "click", campaign_id: "111", trs
      }).toString();
      target = tpClick(p);
      break;
    }
    case "aviasales":
    case "flights": {
      // Country→country flights (Aviasales)
      const p = new URLSearchParams({
        shmarker: marker, promo_id: "8869", source_type: "link",
        type: "click", campaign_id: "111", trs
      }).toString();
      target = tpClick(p);
      break;
    }
    case "rentacar":
    case "getrentacar": {
      const p = new URLSearchParams({
        marker, trs, p: "5996", campaign_id: "222",
        u: encodeURIComponent("https://getrentacar.com")
      }).toString();
      target = tpR(p);
      break;
    }
    case "kiwitaxi": { // also reached via alias "kiwirent"
      const p = new URLSearchParams({
        marker, trs, p: "647", campaign_id: "1",
        u: encodeURIComponent("https://kiwitaxi.com")
      }).toString();
      target = tpR(p);
      break;
    }
    case "hotels": {
      // generic hotels landing (keeps your marker/trs)
      const p = new URLSearchParams({
        shmarker: marker, promo_id: "4040", source_type: "link",
        type: "click", campaign_id: "111", trs
      }).toString();
      target = tpClick(p);
      break;
    }
    default: {
      // safe default → Aviasales country→country
      const p = new URLSearchParams({
        shmarker: marker, promo_id: "8869", source_type: "link",
        type: "click", campaign_id: "111", trs
      }).toString();
      target = tpClick(p);
    }
  }

  return Response.redirect(target, 302);
}
