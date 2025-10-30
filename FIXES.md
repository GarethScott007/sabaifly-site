
# SabaiFly Staging — Fixes Applied (2025-10-22)

This patch addresses two issues:

1. **Flag flash on navigation** (Union Jack flashes briefly):
   - Added a tiny *self-removing* style guard in `js/i18n.js` that hides `.flag` elements until the DOM is ready.
   - Once ready, the style node is removed, revealing the language pills without visible switching.
   - Zero HTML changes required.

2. **Popular routes chips not showing**:
   - Hardened `js/routes-wire.js` root discovery. It now renders into any of:
     - `#popular-routes`
     - `#popular-routes-footer`
     - `.popular-routes`
     - `nav[aria-label="Popular routes"]`
   - If none exist, it creates a small footer section and injects a `.popular-routes` chip group there.
   - Keeps the default-list fallback and safe rendering.

> No breaking HTML/CSS changes. Safe to drop these JS files into existing pages.
