SabaiFly overlay — FINAL index + sitemap safety + /img cleanup

Included:
- index.html — merged with Guardrails CSS order + photo-only hero.
- css/ux-tweaks.css — current + curated additions (no gradients).
- functions/_middleware.js — canonical Link header; param allowlist.
- functions/sitemap.xml.js — correct namespaces + www host.
- _headers — security + caching.
- .cfignore + rename-sitemap.* — prevents static sitemap.xml from overshadowing the function.
- img-duplicates-found.txt + cleanup scripts (cmd/ps1/sh) — SAFE cleanup: move duplicates from /img to a timestamped backup folder inside the repo. Review, then commit. Optional delete-backup.sh to remove later.

How to apply (staging branch):
1) Copy everything to the repo root (allow overwrite).
2) (Optional) Run rename-sitemap.cmd to rename sitemap.xml → sitemap.static.xml.
3) Run one of the cleanup scripts to move /img duplicates into a backup folder (Windows: .cmd; macOS/Linux: .sh).
4) Commit & push. Cloudflare Pages deploys.
5) Visit /sitemap.xml → should be served by the function. Verify Guardrails (hero + CSS order) and Runbook headers.

Notes:
- The cleanup scripts **move** files into img-dup-backup-YYYYMMDD-HHMMSS (they do NOT delete), so it's safe.
- If you want to revert any file, just move it back from the backup folder.
