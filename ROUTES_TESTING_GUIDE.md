# SabaiFly Routes Testing Guide

## Total Routes: 87

### Testing Checklist

#### London Routes (8)
- [ ] lon-to-bkk - London → Bangkok
- [ ] lon-to-nyc - London → New York
- [ ] lon-to-sin - London → Singapore
- [ ] lon-to-dxb - London → Dubai
- [ ] lon-to-syd - London → Sydney
- [ ] lon-to-lax - London → Los Angeles
- [ ] lon-to-tyo - London → Tokyo
- [ ] lon-to-hkg - London → Hong Kong

#### Reverse UK Routes (3)
- [ ] bkk-to-lon - Bangkok → London
- [ ] sin-to-lon - Singapore → London
- [ ] tyo-to-lon - Tokyo → London

#### North America Routes (10)
- [ ] nyc-to-lon - New York → London
- [ ] nyc-to-par - New York → Paris
- [ ] nyc-to-tyo - New York → Tokyo
- [ ] sfo-to-lon - San Francisco → London
- [ ] sfo-to-sin - San Francisco → Singapore
- [ ] sfo-to-tyo - San Francisco → Tokyo
- [ ] lax-to-bkk - Los Angeles → Bangkok
- [ ] lax-to-hkg - Los Angeles → Hong Kong
- [ ] lax-to-sin - Los Angeles → Singapore
- [ ] lax-to-tyo - Los Angeles → Tokyo

#### Bangkok Hub Routes (14)
- [ ] bkk-to-del - Bangkok → Delhi
- [ ] bkk-to-dxb - Bangkok → Dubai
- [ ] bkk-to-fra - Bangkok → Frankfurt
- [ ] bkk-to-hkg - Bangkok → Hong Kong
- [ ] bkk-to-kul - Bangkok → Kuala Lumpur
- [ ] bkk-to-mad - Bangkok → Madrid
- [ ] bkk-to-par - Bangkok → Paris
- [ ] bkk-to-sel - Bangkok → Seoul
- [ ] bkk-to-sha - Bangkok → Shanghai
- [ ] bkk-to-sin - Bangkok → Singapore
- [ ] bkk-to-syd - Bangkok → Sydney
- [ ] bkk-to-tyo - Bangkok → Tokyo
- [ ] kul-to-bkk - Kuala Lumpur → Bangkok
- [ ] del-to-bkk - Delhi → Bangkok

#### Singapore Hub Routes (13)
- [ ] sin-to-bkk - Singapore → Bangkok
- [ ] sin-to-dxb - Singapore → Dubai
- [ ] sin-to-hkg - Singapore → Hong Kong
- [ ] sin-to-syd - Singapore → Sydney
- [ ] sin-to-tyo - Singapore → Tokyo
- [ ] fra-to-sin - Frankfurt → Singapore
- [ ] par-to-sin - Paris → Singapore
- [ ] hkg-to-sin - Hong Kong → Singapore
- [ ] sel-to-sin - Seoul → Singapore
- [ ] sha-to-sin - Shanghai → Singapore
- [ ] del-to-sin - Delhi → Singapore
- [ ] dxb-to-sin - Dubai → Singapore
- [ ] syd-to-sin - Sydney → Singapore

#### Tokyo Hub Routes (12)
- [ ] tyo-to-bkk - Tokyo → Bangkok
- [ ] tyo-to-hkg - Tokyo → Hong Kong
- [ ] tyo-to-sel - Tokyo → Seoul
- [ ] tyo-to-sin - Tokyo → Singapore
- [ ] fra-to-tyo - Frankfurt → Tokyo
- [ ] par-to-tyo - Paris → Tokyo
- [ ] hkg-to-tyo - Hong Kong → Tokyo
- [ ] sel-to-tyo - Seoul → Tokyo
- [ ] sha-to-tyo - Shanghai → Tokyo
- [ ] dxb-to-tyo - Dubai → Tokyo
- [ ] syd-to-lon - Sydney → London
- [ ] syd-to-bkk - Sydney → Bangkok

#### Hong Kong Routes (6)
- [ ] hkg-to-bkk - Hong Kong → Bangkok
- [ ] hkg-to-sel - Hong Kong → Seoul
- [ ] hkg-to-tyo - Hong Kong → Tokyo
- [ ] sha-to-hkg - Shanghai → Hong Kong

#### European Routes (9)
- [ ] fra-to-bkk - Frankfurt → Bangkok
- [ ] fra-to-dxb - Frankfurt → Dubai
- [ ] par-to-bkk - Paris → Bangkok
- [ ] par-to-dxb - Paris → Dubai
- [ ] mad-to-bkk - Madrid → Bangkok
- [ ] bcn-to-bkk - Barcelona → Bangkok

#### Dubai Routes (3)
- [ ] dxb-to-bkk - Dubai → Bangkok
- [ ] dxb-to-lon - Dubai → London

#### India Routes (4)
- [ ] del-to-bkk - Delhi → Bangkok
- [ ] bom-to-bkk - Mumbai → Bangkok

#### Seoul/Shanghai Routes (6)
- [ ] sel-to-bkk - Seoul → Bangkok
- [ ] sel-to-hkg - Seoul → Hong Kong
- [ ] sha-to-bkk - Shanghai → Bangkok

#### NEW: Australia Extended Routes (5)
- [ ] syd-to-hkg - Sydney → Hong Kong
- [ ] syd-to-tyo - Sydney → Tokyo
- [ ] mel-to-sin - Melbourne → Singapore
- [ ] mel-to-bkk - Melbourne → Bangkok
- [ ] mel-to-hkg - Melbourne → Hong Kong

#### NEW: Vietnam Routes (3)
- [ ] sgn-to-bkk - Ho Chi Minh City → Bangkok
- [ ] sgn-to-sin - Ho Chi Minh City → Singapore
- [ ] han-to-bkk - Hanoi → Bangkok

#### NEW: China Routes (2)
- [ ] pek-to-sin - Beijing → Singapore
- [ ] pek-to-tyo - Beijing → Tokyo

#### NEW: Bali Routes (2)
- [ ] dps-to-sin - Bali → Singapore
- [ ] dps-to-syd - Bali → Sydney

---

## What to Test on Each Page

### 1. Content Accuracy
- [ ] City names and airport codes are correct
- [ ] Flight times are realistic
- [ ] Festival dates and names are accurate
- [ ] Temperature ranges match the destination
- [ ] Timezone information is correct
- [ ] Currency is correct

### 2. Functionality
- [ ] **Flight Search CTA buttons** appear at TOP and BOTTOM of page
- [ ] Flight search buttons work (Kiwi.com, Skyscanner, Google Flights)
- [ ] Links open in new tabs
- [ ] Visa/embassy information displays correctly
- [ ] Page loads without errors

### 3. SEO/Metadata
- [ ] Page title is descriptive and includes route
- [ ] Meta description is present and compelling
- [ ] URL slug matches the route format

### 4. Mobile Responsiveness
- [ ] Page looks good on mobile
- [ ] Buttons are clickable on touch devices
- [ ] Content is readable on small screens

---

## How to Run Tests

### Local Development
```bash
cd C:\sabaifly-sync
git fetch origin
git checkout claude/review-main-branch-011CV3SbvCLqtKAjLsyMfh8i
npm install
npm run dev
```

Visit: http://localhost:3000/en/destinations/[route-slug]

### Build Test (Static Generation)
```bash
npm run build
```

This will generate all 87 × 2 languages = **174+ static pages**

---

## Key Features to Verify

1. ✅ **Dual Flight Search CTAs** - Buttons at top AND bottom of every page
2. ✅ **Multi-Partner Search** - Kiwi, Skyscanner, Google Flights options
3. ✅ **Locale-Aware Visa Info** - Shows relevant embassy based on user's language
4. ✅ **Factual Content** - All festivals, dates, times, and facts are verified
5. ✅ **Next-Intl Ready** - All content will translate when locale changes

---

## Common Issues to Watch For

- 404 errors on any route
- Missing or incorrect flight times
- Broken affiliate links
- Console errors in browser
- Build failures during static generation
- Missing translation keys

---

## After Testing

Once satisfied, you can merge this branch to `main` with:
```bash
git checkout main
git merge claude/review-main-branch-011CV3SbvCLqtKAjLsyMfh8i
git push origin main
```

Or create a Pull Request on GitHub for review before merging.
