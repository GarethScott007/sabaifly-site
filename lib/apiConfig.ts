/**
 * API Configuration & Monetization Strategy
 *
 * This file lets you easily switch between different flight APIs
 * Just change the activeProvider to switch APIs!
 */

export type FlightAPIProvider =
  | "travelpayouts"  // FREE - Affiliate links (1-5% commission)
  | "kiwi"           // FREE - Affiliate links (2-5% commission)
  | "skyscanner"     // Need approval - Affiliate links (1-3% commission)
  | "duffel"         // $0.50-1.50/booking - You set markup (100% yours)
  | "amadeus"        // $1000 deposit - Pay per API call
  | "multi";         // Show multiple options (BEST for users!)

// ⚡ CHANGE THIS TO SWITCH APIs ⚡
export const ACTIVE_PROVIDER: FlightAPIProvider = "multi"; // Shows all options!

// API Keys & Credentials
export const API_CONFIG = {
  // ✅ Travelpayouts (ACTIVE - You have this!)
  travelpayouts: {
    enabled: true,
    token: process.env.TP_TOKEN || "1f932d3bd3f14daec9c428256567e8e6",
    marker: process.env.TP_MARKER || "670577",
    monetization: "affiliate", // You earn 1-5% commission
    cost: "$0/month",
    setupTime: "Done ✅",
  },

  // ⏳ Kiwi.com (Easy to add - just sign up)
  kiwi: {
    enabled: false, // Set to true when you get API key
    affiliateId: process.env.KIWI_AFFILIATE_ID || "sabaifly", // Get this from Kiwi
    monetization: "affiliate", // You earn 2-5% commission
    cost: "$0/month",
    setupTime: "1 hour (just sign up)",
  },

  // ⏳ Skyscanner (Need approval)
  skyscanner: {
    enabled: false, // Set to true when approved
    partnerId: process.env.SKYSCANNER_PARTNER_ID || "",
    monetization: "affiliate", // You earn 1-3% commission
    cost: "$0/month",
    setupTime: "1-2 days (application approval)",
  },

  // 🚀 Duffel (RECOMMENDED - Best option!)
  duffel: {
    enabled: false, // Set to true when you're ready
    apiKey: process.env.DUFFEL_API_KEY || "",
    monetization: "markup", // You add $10-50 per booking, keep 100%!
    cost: "$0.50-1.50 per COMPLETED booking (only if user books!)",
    setupTime: "3-5 days (easy integration)",
    commission: "YOU decide! Add $10, $20, $50 markup - you keep ALL of it!",
  },

  // 💰 Amadeus (Enterprise - not worth it yet)
  amadeus: {
    enabled: false,
    apiKey: process.env.AMADEUS_API_KEY || "",
    apiSecret: process.env.AMADEUS_API_SECRET || "",
    monetization: "markup", // You add markup to prices
    cost: "$1000 deposit + $0.01 per API call",
    setupTime: "1-2 weeks",
    recommendation: "Wait until you have 50k+ users",
  },
};

// How each API makes you money
export const MONETIZATION_GUIDE = {
  affiliate: {
    model: "Commission on bookings",
    howItWorks: "User clicks → Books on partner site → You earn %",
    earnings: "$10-50 per booking (1-5% of ticket price)",
    pros: "Zero cost, zero risk, easy setup",
    cons: "Users leave your site, lower margins",
  },

  markup: {
    model: "You add markup to flight prices",
    howItWorks: "API gives you $500 fare → You show $520 → Keep $20",
    earnings: "$10-100+ per booking (YOU decide!)",
    pros: "Higher margins, users stay on site, full control",
    cons: "Small cost per booking ($0.50-1.50)",
  },
};

// Revenue comparison
export const REVENUE_COMPARISON = {
  // With affiliate links (Travelpayouts, Kiwi, Skyscanner)
  affiliateModel: {
    booking: "$500 flight",
    commission: "3%",
    youEarn: "$15",
    cost: "$0",
    netProfit: "$15",
  },

  // With Duffel markup
  duffelModel: {
    booking: "$500 flight",
    yourMarkup: "$25", // YOU decide this!
    duffelFee: "$1.00",
    youEarn: "$24",
    cost: "$1.00",
    netProfit: "$23", // 50% more profit!
  },
};

// Which API should you use?
export const RECOMMENDATION = {
  NOW: "travelpayouts + multi (show all options)",
  MONTH_1_3: "Keep travelpayouts, add Kiwi affiliate",
  MONTH_3_6: "Add Duffel for premium routes",
  MONTH_6_12: "Apply for Skyscanner affiliate",
  YEAR_2_PLUS: "Consider Amadeus if 50k+ users",
};
