# 🚀 Flight API Setup Guide - SabaiFly

## 🎯 **CURRENT STATUS**

✅ **ACTIVE NOW:** Travelpayouts Affiliate Links
- Cost: **$0/month**
- Earnings: **1-5% commission per booking**
- Setup: **DONE** ✓

---

## 💰 **HOW YOU MAKE MONEY (EXPLAINED SIMPLY!)**

### **Option 1: Affiliate Model** (What you have NOW)

**How it works:**
```
User visits your site → Clicks "Search Flights" → Goes to Kiwi.com/Skyscanner
→ Books flight for $500 → You earn $15-25 (3-5% commission)
```

**Pros:**
- $0 cost to you
- Zero risk
- Works immediately

**Cons:**
- Lower margins (only 1-5%)
- User leaves your site

---

### **Option 2: Markup Model** (With Duffel API)

**How it works:**
```
Duffel API says: "Flight costs $500"
You show on your site: "$525"
User books → You earn: $24 profit ($25 markup - $1 Duffel fee)
```

**Pros:**
- Higher margins (YOU decide markup!)
- Users stay on your site
- Professional booking experience

**Cons:**
- $0.50-1.50 per COMPLETED booking (only if user actually books!)

---

## 📊 **PROFIT COMPARISON**

| Scenario | Affiliate (NOW) | Duffel Markup (Later) |
|----------|----------------|----------------------|
| **Flight Price** | $500 | $500 |
| **You Show** | $500 (redirect) | $525 (on your site) |
| **Commission/Markup** | 3% = $15 | $25 (your choice!) |
| **API Cost** | $0 | $1.00 |
| **Your Profit** | **$15** | **$24** |

**Duffel = 60% more profit per booking!**

---

## 🔧 **HOW TO SWITCH APIS (SUPER EASY!)**

### **Step 1: Open `.env.local` file**

### **Step 2: Add your API keys when you get them:**

```bash
# ✅ Travelpayouts (ACTIVE NOW)
TP_TOKEN=1f932d3bd3f14daec9c428256567e8e6
TP_MARKER=670577

# Add these when you get them:

# Kiwi.com (Sign up at: https://www.kiwi.com/affiliates)
KIWI_AFFILIATE_ID=your_kiwi_id_here

# Skyscanner (Apply at: https://www.partners.skyscanner.net)
SKYSCANNER_PARTNER_ID=your_skyscanner_id_here

# Duffel (Sign up at: https://duffel.com)
DUFFEL_API_KEY=your_duffel_key_here

# Amadeus (Not recommended yet - needs $1000 deposit!)
AMADEUS_API_KEY=your_key_here
AMADEUS_API_SECRET=your_secret_here
```

### **Step 3: Open `lib/apiConfig.ts`**

### **Step 4: Change `enabled: false` to `enabled: true` for each API:**

```typescript
// When you get Kiwi API key:
kiwi: {
  enabled: true,  // ← Change this from false to true!
  ...
},

// When you get Duffel API key:
duffel: {
  enabled: true,  // ← Change this from false to true!
  ...
},
```

**That's it!** No coding needed. Just flip the switch!

---

## 🚀 **DUFFEL SETUP (You Asked About This!)**

### **Timeline:** 3-5 days (NOT 2 weeks!)

**Day 1:** Sign up at https://duffel.com
- Get API key instantly
- Free test environment

**Day 2-3:** I integrate the API
- Add search functionality
- Add booking system
- Test with fake bookings

**Day 4-5:** Polish & Launch
- Style the results page
- Add error handling
- Go live!

**Total:** Under 1 week, not 2!

---

## 💡 **HOW TO MONETIZE DUFFEL (You Asked!)**

### **Strategy 1: Fixed Markup**
```typescript
// In your code:
const apiPrice = 500;  // What Duffel charges
const markup = 25;     // Your profit
const showPrice = 525; // What user sees

// User books → You earn $24 ($25 markup - $1 Duffel fee)
```

### **Strategy 2: Percentage Markup**
```typescript
const apiPrice = 500;
const markupPercent = 5; // 5% markup
const showPrice = 525;   // $500 * 1.05

// Cheaper flights = small markup
// Expensive flights = bigger markup
```

### **Strategy 3: Dynamic Pricing** (Advanced)
```typescript
// Economy class: +3% markup
// Business class: +5% markup
// First class: +7% markup
// Peak season: +10% markup
```

**YOU CONTROL IT ALL!**

---

## 📈 **MY RECOMMENDATION FOR YOU**

### **Phase 1 (NOW - Month 3): Affiliate Only**

**What to do:**
- ✅ Keep using Travelpayouts (FREE)
- ✅ Sign up for Kiwi affiliate (5 minutes)
- ✅ Apply for Skyscanner (1-2 days approval)
- ✅ Focus on traffic (SEO, content)

**Goal:** Prove the model, earn first $10k-20k

---

### **Phase 2 (Month 3-6): Add Duffel**

**When:**
- You have 5,000+ monthly visitors
- You're earning $2k+/month from affiliates
- You want higher margins

**What to do:**
- Sign up for Duffel ($0 to start)
- I integrate it (3-5 days)
- Test on 10-20% of traffic
- Compare: Affiliate vs Duffel
- Scale what works better

**Goal:** Double your earnings with same traffic

---

### **Phase 3 (Month 6-12): Optimize**

**What to do:**
- Show BOTH options: "Book Now" (Duffel) + "Compare Prices" (Affiliates)
- A/B test markup amounts
- Focus on high-value routes (business class, long-haul)
- Add hotels & car rentals (more commission)

**Goal:** $50k-100k annual revenue

---

## 🎯 **ACTION PLAN FOR YOU**

### **This Week:**
1. ✅ Keep using current setup (works great!)
2. ✅ Sign up for Kiwi affiliate: https://www.kiwi.com/affiliates
3. ✅ Apply for Skyscanner: https://www.partners.skyscanner.net

### **Month 1-3:**
1. Focus on SEO (87 routes × 9 languages = massive reach)
2. Build traffic to 5k+ monthly visitors
3. Track which routes convert best
4. Earn your first $5k-10k

### **Month 3-6 (When Ready):**
1. Tell me "I'm ready for Duffel"
2. I'll integrate it in 3-5 days
3. You start earning 60% more per booking

---

## 🤔 **FAQ**

### **Q: Why not use Duffel NOW?**
**A:** You CAN! But:
- Affiliate = $0 cost, perfect for testing
- Duffel = Small cost per booking, better when you have traffic
- Smart to prove model with $0 cost first

### **Q: How much does Duffel REALLY cost?**
**A:**
- $0 to sign up
- $0 for testing
- $0.50-1.50 ONLY when user completes a booking
- If user books $500 flight, you add $25 markup, you net $23+ profit

### **Q: Can I use MULTIPLE APIs at once?**
**A:** YES! Best strategy:
- Show Duffel price: "$525 - Book Now"
- Show affiliate buttons: "Compare prices on Kiwi.com / Skyscanner"
- User picks what they trust = more conversions!

### **Q: What about Amadeus ($1000 deposit)?**
**A:** SKIP IT until you have:
- 50,000+ monthly users
- $100k+ annual revenue
- Proven business model
- Not worth it for startups

### **Q: How do I track earnings?**
**A:**
- Travelpayouts: Dashboard shows clicks + bookings
- Kiwi: Affiliate dashboard
- Skyscanner: Impact.com dashboard
- Duffel: Real-time API shows every booking + your profit

---

## ✅ **WHAT'S ALREADY DONE**

✅ Travelpayouts integrated (earning money NOW!)
✅ Kiwi.com deep links ready (just need your affiliate ID)
✅ Skyscanner links ready (just need approval)
✅ Google Flights links ready (free!)
✅ Multi-partner search buttons on ALL pages (top + bottom)
✅ Smart routing (European users → Skyscanner, Asian → Kiwi)
✅ Analytics tracking (see which partner converts best)
✅ Easy API switching (just change one line in config!)

**You're READY to earn!** 🚀

---

## 🆘 **NEED HELP?**

Just ask me:
- "Add Duffel API" (when you're ready)
- "How do I get Kiwi affiliate ID?" (I'll guide you)
- "Show me my earnings" (I'll explain dashboards)
- "Which API should I use?" (I'll recommend based on your traffic)

**Let's make money!** 💰
