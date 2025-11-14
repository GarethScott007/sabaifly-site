# 🎯 Google Analytics 4 (GA4) Setup Guide

## ✅ **WHAT'S ALREADY DONE**

✓ GA4 tracking code integrated into site
✓ Automatic page view tracking
✓ Event tracking for flight searches
✓ Cookie consent compliance
✓ Only loads on production domain (www.sabaifly.com)

---

## 🚀 **HOW TO ACTIVATE GA4 (3 MINUTES!)**

### **Step 1: Create GA4 Property** (2 minutes)

1. Go to https://analytics.google.com/
2. Click **Admin** (gear icon, bottom left)
3. Click **Create Property**
4. Fill in:
   - **Property name**: SabaiFly
   - **Time zone**: Select your timezone
   - **Currency**: USD (or your preference)
5. Click **Next**
6. Select business details (optional)
7. Click **Create**

### **Step 2: Create Data Stream** (1 minute)

1. In Property setup, click **Data Streams**
2. Click **Add Stream** → **Web**
3. Fill in:
   - **Website URL**: https://www.sabaifly.com
   - **Stream name**: SabaiFly Main Site
4. Click **Create Stream**
5. **COPY THE MEASUREMENT ID** (looks like: `G-XXXXXXXXXX`)

### **Step 3: Add Measurement ID to Your Site** (30 seconds)

1. Open `.env.local` file
2. Find the line: `NEXT_PUBLIC_GA4_ID=`
3. Paste your Measurement ID after the equals sign:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```
4. Save the file
5. Restart your dev server: `Ctrl+C` then `pnpm run dev`

**That's it!** 🎉

---

## 📊 **WHAT GA4 TRACKS FOR YOU**

### **Automatic Events:**
- ✓ Page views (every page load)
- ✓ Session starts
- ✓ User engagement
- ✓ Scroll depth
- ✓ Outbound clicks

### **Custom Events (Already Implemented):**
- ✓ **search_click**: When user clicks a flight search button
  - Tracks which partner (Kiwi, Skyscanner, Google Flights)
  - Tracks which route (LON-BKK, TYO-BKK, etc.)
- ✓ **Language changes**: When user switches languages
- ✓ **Route views**: Which destination pages are most popular

---

## 📈 **KEY METRICS YOU'LL SEE**

### **Traffic Metrics:**
- **Users**: How many people visit your site
- **Sessions**: Total visits to your site
- **Page views**: Total pages viewed
- **Avg session duration**: How long users stay
- **Bounce rate**: % who leave after one page

### **Engagement Metrics:**
- **Top pages**: Which routes are most popular
- **Traffic sources**: Google, Direct, Social, etc.
- **Device breakdown**: Mobile vs Desktop
- **Countries**: Where your users are from
- **Languages**: Which languages users prefer

### **Conversion Metrics:**
- **Search clicks**: How many users click flight search buttons
- **Partner comparison**: Kiwi vs Skyscanner vs Google Flights
- **Route conversion**: Which routes convert best
- **Language conversion**: Which languages convert best

---

## 🎯 **HOW TO VIEW YOUR DATA**

### **Real-Time Report** (See live traffic!)
1. Go to Google Analytics
2. Click **Reports** → **Realtime**
3. See users on your site RIGHT NOW!

### **Traffic Report** (See where users come from)
1. Click **Reports** → **Acquisition** → **Traffic acquisition**
2. See breakdown by:
   - Google Search
   - Direct traffic
   - Social media
   - Referrals

### **Engagement Report** (See what users do)
1. Click **Reports** → **Engagement** → **Pages and screens**
2. See:
   - Most popular routes
   - Average time on page
   - User journey flow

### **Custom Events Report** (See flight searches!)
1. Click **Reports** → **Engagement** → **Events**
2. Look for `search_click` event
3. Click it to see:
   - Which partner users prefer
   - Which routes get most searches
   - Conversion rate by route

---

## 💡 **PRO TIPS**

### **Tip 1: Set Up Enhanced Measurement** (Free features!)
1. Go to **Admin** → **Data Streams** → Your stream
2. Click **Enhanced Measurement**
3. Enable:
   - ✓ Scroll tracking
   - ✓ Outbound clicks
   - ✓ Site search
   - ✓ Video engagement
   - ✓ File downloads

### **Tip 2: Create Custom Audiences**
Create audiences to retarget users:
- "Users who viewed Tokyo routes" → Show Tokyo ads
- "Users who didn't click search" → Show special offer
- "Japanese language users" → Target with Japanese ads

### **Tip 3: Set Up Conversion Goals**
1. Go to **Admin** → **Events**
2. Mark `search_click` as a **Conversion**
3. Now you can track "conversion rate" (% who click search)

### **Tip 4: Connect to Google Ads** (When ready)
1. Go to **Admin** → **Google Ads Links**
2. Link your Google Ads account
3. Use GA4 data to optimize ad campaigns

---

## 🔒 **PRIVACY & COMPLIANCE**

### **Already Implemented:**
✓ Cookie consent banner (asks before tracking)
✓ Only loads on production domain
✓ No personal data collected without consent
✓ GDPR compliant

### **Recommended Settings:**
1. Go to **Admin** → **Data Settings** → **Data Collection**
2. Enable:
   - ✓ Google signals data collection (for remarketing)
   - ✓ Enhanced measurement
3. Disable:
   - ✗ User-ID tracking (not needed yet)

---

## 📊 **REVENUE TRACKING (ADVANCED - FOR LATER)**

When you're ready to track affiliate earnings:

### **Option 1: Manual Revenue Entry**
Track estimated earnings from Travelpayouts dashboard

### **Option 2: Automated Revenue Tracking** (Future with Duffel)
When you add Duffel API, we can automatically track:
- Booking value
- Your markup amount
- Net profit per booking
- Conversion rate by route

---

## 🆘 **TROUBLESHOOTING**

### **"I don't see any data"**
**Check:**
1. Did you add the Measurement ID to `.env.local`?
2. Did you restart the dev server after adding it?
3. Are you visiting `www.sabaifly.com` (production domain)?
4. GA4 only loads on production, NOT localhost!

**Solution:** Deploy to Vercel, then visit www.sabaifly.com

### **"Data is delayed"**
**Normal!** GA4 updates every 24-48 hours
- Real-time data: Instant
- Reports: 24-48 hour delay

### **"How do I test it works?"**
1. Deploy to production
2. Visit www.sabaifly.com
3. Go to GA4 → **Realtime** report
4. You should see yourself in the report!

---

## 📈 **SUCCESS METRICS (YOUR TARGETS)**

### **Month 1:**
- **Goal**: 1,000 monthly users
- **Focus**: SEO, content creation

### **Month 3:**
- **Goal**: 5,000 monthly users
- **Focus**: Conversion rate optimization
- **Target**: 10% of users click search buttons

### **Month 6:**
- **Goal**: 20,000 monthly users
- **Focus**: Revenue optimization
- **Target**: 15% search click rate
- **Revenue**: $2,000-5,000/month from affiliates

### **Year 1:**
- **Goal**: 100,000 monthly users
- **Focus**: Scale & profitability
- **Revenue**: $20,000-50,000/month
- **Add**: Duffel API for higher margins

---

## 🎯 **KEY REPORTS TO CHECK WEEKLY**

1. **Realtime Report**: See live traffic
2. **Traffic Acquisition**: Where users come from
3. **Pages Report**: Top routes
4. **Events Report**: Search clicks by partner
5. **Countries Report**: Geographic distribution
6. **Languages Report**: Locale performance

---

## ✅ **CHECKLIST**

- [ ] Created GA4 property
- [ ] Created data stream
- [ ] Copied Measurement ID (G-XXXXXXXXXX)
- [ ] Added to `.env.local` file
- [ ] Restarted dev server
- [ ] Deployed to production
- [ ] Verified tracking in Realtime report
- [ ] Marked `search_click` as conversion event
- [ ] Set up weekly report check routine

---

## 🚀 **YOU'RE ALL SET!**

Google Analytics 4 is now tracking:
- ✓ Every visitor
- ✓ Every page view
- ✓ Every search click
- ✓ Every partner preference
- ✓ Every route performance

**Use this data to:**
- Optimize your best routes
- Focus on high-converting partners
- Target the right languages
- Scale what works!

**Let's make data-driven decisions!** 📊💰
