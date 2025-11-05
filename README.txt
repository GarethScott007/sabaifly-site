SabaiFly Patch Bundle — drop-in overlay

CONTENTS (top-level)
- css/ux-tweaks.css
- functions/_middleware.js
- functions/sitemap.xml.js
- _headers
- index.patched.html
- docs/*
- patches/*

HOW TO APPLY
1) Copy these into your repo root (allow overwrite).
2) Commit & push. Cloudflare Pages deploys automatically.
3) Keep CSS order on every page:
   /css/home-hero.css
   /css/ux-tweaks.css
   /css/inlined.css
   /css/theme.css
   /css/calm.css   (LAST)
4) Delete duplicate site content under /img/ listed in docs/remove-these-from-img-duplicates.txt
5) Run docs/verify-commands.txt and disable the temp-noindex header rule in Cloudflare before launch.
