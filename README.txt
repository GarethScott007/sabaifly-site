SabaiFly overlay — Align header/hero/cards + preserve 13 routes + expanded hero search

What’s inside
- index.html: hero updated to use the same flight search as /flights/, preserving your Route Spotlights (13 items).
- css/ux-tweaks.css: container alignment + search grid + chip styles (calm).
- js/ga4.js: GA4 runs only on production hosts.
- functions/api/suggest.js: server endpoint powering autocomplete (Travelpayouts) — no front-end dataset needed.

How to apply
1) Unzip into your repo root (overwrite). Commit & push (staging).
2) Verify home page: header, hero and cards align; route grid unchanged (13 pills).
3) Try search: type “LON” / “BKK” — autocomplete appears; submit → /flights/results.html with params.

Notes
- We did NOT remove any functionality. Route grid remains exactly as before.
- If you want JSON-LD inline + strict CSP nonce in a later pass, I can ship that too.
