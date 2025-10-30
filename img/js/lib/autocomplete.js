// js/lib/autocomplete.js - FIXED
const cache = new Map();

function makeMenu(input) {
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  input.parentNode.insertBefore(wrap, input);
  wrap.appendChild(input);

  const menu = document.createElement('div');
  menu.style.position = 'absolute';
  menu.style.left = '0'; menu.style.right = '0';
  menu.style.top = 'calc(100% + 6px)';
  menu.style.background = '#fff';
  menu.style.border = '1px solid #e5e7eb';
  menu.style.borderRadius = '12px';
  menu.style.boxShadow = '0 12px 24px rgba(0,0,0,.08)';
  menu.style.maxHeight = '280px';
  menu.style.overflow = 'auto';
  menu.hidden = true;
  wrap.appendChild(menu);
  return menu;
}

async function query(term) {
  const key = term.toLowerCase();
  if (cache.has(key)) return cache.get(key);
  // FIXED: Use correct endpoint /api/suggest
  const r = await fetch('/api/suggest?q=' + encodeURIComponent(term) + '&v=3', { cache: 'no-store' });
  const j = await r.json();
  cache.set(key, j);
  return j;
}

// ... rest of the file remains the same
