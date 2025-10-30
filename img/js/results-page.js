// /js/results-page.js - COMPLETE XSS SAFE VERSION WITH PARAMETER FIXES
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Safe DOM creation - XSS PROTECTED
  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text; // SAFE: textContent prevents XSS
    return el;
  }

  // Get URL parameters safely
  const Q = new URLSearchParams(location.search);
  const ORIGIN = (Q.get("origin") || "").toUpperCase();
  const DEST = (Q.get("destination") || "").toUpperCase();
  const DEPART = Q.get("departure_at") || "";
  const RETURN = Q.get("return_at") || "";
  const ADULTS = Q.get("adults") || "1";
  const CHILDREN = Q.get("children") || "0";
  const INFANTS = Q.get("infants") || "0";
  const DIRECT_REQ = String(Q.get("direct") || "false").toLowerCase() === "true";
  const CURRENCY = (Q.get("currency") || "GBP").toUpperCase();

  // DOM elements
  const list = $("#results-list");
  const status = $("#results-status");
  const sortGroup = $("#sort-group");
  const stopsGroup = $("#stops-group");
  const selAir = $("#filter-airline");
  const airChipsCard = $("#airline-chips-card");
  const airChips = $("#airline-chips");
  const departRibbon = $("#depart-chips");
  const returnRibbon = $("#return-chips");
  const returnRibbonWrap = $("#return-ribbon");

  // State
  let sortMode = "price";
  let stopsMode = "any";
  let airlineMode = "any";
  let state = { combos: [], outbound: [], back: [], tripType: "oneway" };

  const SYMBOL = { GBP: "£", USD: "$", EUR: "€", THB: "฿" };

  // FIXED: Robust date parsing function
  const toISO = s => {
    if (!s) return '';
    
    s = String(s || "").trim();
    
    // Already in correct format
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    
    // Try different date formats
    const formats = [
      /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/,  // DD/MM/YYYY or DD-MM-YYYY
      /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/,    // YYYY/MM/DD or YYYY-MM-DD
    ];
    
    for (const regex of formats) {
      const m = s.match(regex);
      if (m) {
        let d, mo, y;
        
        if (m[3].length === 4) {
          // YYYY-MM-DD format
          y = m[1];
          mo = m[2];
          d = m[3];
        } else {
          // DD/MM/YYYY format  
          d = m[1];
          mo = m[2];
          y = m[3];
        }
        
        // Handle 2-digit years
        if (y.length === 2) y = "20" + y;
        
        // Validate date components
        const month = parseInt(mo, 10);
        const day = parseInt(d, 10);
        const year = parseInt(y, 10);
        
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 2020 && year <= 2030) {
          return `${y.padStart(4, "0")}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
        }
      }
    }
    
    console.error('❌ Invalid date format:', s);
    return '';
  };

  const isoOnly = s => (String(s || "").match(/^(\d{4}-\d{2}-\d{2})/) || ["", ""])[1];
  
  const shift = (s, d) => {
    if (!s) return "";
    const t = new Date(s + "T00:00:00Z");
    t.setUTCDate(t.getUTCDate() + d);
    return t.toISOString().slice(0, 10);
  };

  const nf = (v, cy = CURRENCY) => {
    try {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: cy,
        maximumFractionDigits: 0
      }).format(v);
    } catch {
      return (SYMBOL[cy] || "") + Number(v || 0).toFixed(0);
    }
  };

  const CITY = {
    LON: ["LHR", "LGW", "LTN", "LCY", "STN", "SEN"],
    NYC: ["JFK", "EWR", "LGA"],
    PAR: ["CDG", "ORY", "BVA"],
    TYO: ["HND", "NRT"],
    SEL: ["ICN", "GMP"],
    ROM: ["FCO", "CIA"],
    MIL: ["MXP", "LIN", "BGY"],
    SAO: ["GRU", "CGH", "VCP"],
    BUE: ["EZE", "AEP"],
    MOW: ["SVO", "DME", "VKO"]
  };

  const toCity = code => {
    code = (code || "").toUpperCase();
    for (const c in CITY) {
      if (c === code || CITY[c].includes(code)) return c;
    }
    return code;
  };

  // SMART SEARCH CONFIGURATION
  const SEARCH_CONFIG = {
    maxRetries: 2,
    delayBetweenCalls: 200,
    useBookingCom: true,
    useTravelPayouts: true,
    preferDirectFlights: true
  };

  // NEW: Parameter validation function
  function validateAndFixParameters() {
    console.log('🔍 Validating URL parameters...');
    
    // Log original parameters for debugging
    console.log('Original params:', {
      origin: ORIGIN,
      destination: DEST, 
      departure: DEPART,
      return: RETURN,
      adults: ADULTS,
      children: CHILDREN,
      infants: INFANTS,
      currency: CURRENCY,
      direct: DIRECT_REQ
    });
    
    // Validate required parameters
    if (!ORIGIN || !DEST) {
      console.error('❌ Missing origin or destination');
      return false;
    }
    
    // Validate airport codes (basic check)
    if (ORIGIN.length < 2 || ORIGIN.length > 4 || DEST.length < 2 || DEST.length > 4) {
      console.error('❌ Invalid airport codes:', ORIGIN, DEST);
      return false;
    }
    
    // Validate dates
    if (DEPART && !toISO(DEPART)) {
      console.error('❌ Invalid departure date:', DEPART);
      return false;
    }
    
    if (RETURN && !toISO(RETURN)) {
      console.error('❌ Invalid return date:', RETURN);
      return false;
    }
    
    // Validate numbers
    if (isNaN(ADULTS) || ADULTS < 1 || ADULTS > 10) {
      console.error('❌ Invalid adults count:', ADULTS);
      return false;
    }
    
    if (isNaN(CHILDREN) || CHILDREN < 0 || CHILDREN > 10) {
      console.error('❌ Invalid children count:', CHILDREN);
      return false;
    }
    
    if (isNaN(INFANTS) || INFANTS < 0 || INFANTS > 10) {
      console.error('❌ Invalid infants count:', INFANTS);
      return false;
    }
    
    console.log('✅ All parameters validated successfully');
    return true;
  }

  // Ensure DOM elements exist
  function ensureElements() {
    if (!list) {
      const el = createElement("div", "results-list");
      el.id = "results-list";
      (document.querySelector("main") || document.body).appendChild(el);
    }
    if (!status) {
      const el = createElement("div", "results-status");
      el.id = "results-status";
      (document.querySelector("main") || document.body).appendChild(el);
    }
  }

  // API functions
  function normalizeData(json) {
    if (Array.isArray(json?.data)) return json.data;
    if (json?.data && typeof json.data === "object") return Object.values(json.data).flat();
    if (Array.isArray(json)) return json;
    return [];
  }

  function rowDuration(it) {
    return it.duration || it.duration_to || 0;
  }

  function rowTransfers(it) {
    return typeof it.transfers === "number" ? it.transfers : (it.transfers_count ?? it.number_of_changes ?? 0);
  }

  // DELAY FUNCTION FOR RATE LIMITING
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // SMART MULTI-API SEARCH
  async function smartMultiApiSearch({ origin, dest, depart, ret, isReturn = false }) {
    console.log(`🚀 SMART MULTI-API SEARCH: ${origin}→${dest} ${depart}`);
    
    let allFlights = [];
    const searchPromises = [];

    // 1. Always try TravelPayouts first (your current revenue source)
    if (SEARCH_CONFIG.useTravelPayouts) {
      searchPromises.push(
        callTravelPayoutsApi({ origin, dest, depart, ret, direct: DIRECT_REQ })
          .then(results => {
            console.log(`✅ TravelPayouts: ${results.length} flights`);
            return results.map(f => ({ ...f, source: 'travelpayouts' }));
          })
          .catch(error => {
            console.error('❌ TravelPayouts failed:', error);
            return [];
          })
      );
    }

    // 2. Try Booking.com API for more options
    if (SEARCH_CONFIG.useBookingCom) {
      searchPromises.push(
        callBookingComApi({ origin, dest, depart, ret })
          .then(results => {
            console.log(`✅ Booking.com: ${results.length} flights`);
            return results.map(f => ({ ...f, source: 'booking.com' }));
          })
          .catch(error => {
            console.error('❌ Booking.com failed:', error);
            return [];
          })
      );
    }

    // Wait for all API calls to complete
    const results = await Promise.all(searchPromises);
    
    // Combine all results
    results.forEach(apiResults => {
      allFlights = allFlights.concat(apiResults);
    });

    // Remove duplicates and sort
    const uniqueFlights = removeDuplicates(allFlights);
    uniqueFlights.sort((a, b) => (a.price || 0) - (b.price || 0));

    console.log(`🎊 Multi-API complete: ${allFlights.length} total → ${uniqueFlights.length} unique flights`);
    
    return uniqueFlights;
  }

  // FIXED: TRAVELPAYOUTS API CALL with proper parameter encoding
  async function callTravelPayoutsApi({ origin, dest, depart, ret, direct }) {
    try {
      const u = new URL("/api/search", location.origin);
      
      // FIXED: Proper parameter encoding
      u.searchParams.set("origin", encodeURIComponent(origin));
      u.searchParams.set("destination", encodeURIComponent(dest));
      
      if (depart) {
        const fixedDepart = toISO(depart);
        if (fixedDepart) u.searchParams.set("departure_at", fixedDepart);
      }
      
      if (ret) {
        const fixedRet = toISO(ret);
        if (fixedRet) u.searchParams.set("return_at", fixedRet);
      }
      
      // FIXED: Proper number parameters
      u.searchParams.set("adults", String(ADULTS || '1'));
      u.searchParams.set("children", String(CHILDREN || '0'));
      u.searchParams.set("infants", String(INFANTS || '0'));
      u.searchParams.set("currency", String(CURRENCY || 'GBP'));
      u.searchParams.set("direct", String(!!direct));
      
      console.log('🔧 TravelPayouts API URL:', u.toString());
      
      const r = await fetch(u.toString(), { 
        headers: { accept: "application/json" } 
      });
      
      const text = await r.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error('❌ TravelPayouts JSON parse error:', text);
        json = { error: text, data: [] };
      }
      
      if (!r.ok) {
        console.error(`❌ TravelPayouts HTTP error ${r.status}:`, json);
        return [];
      }
      
      const rows = normalizeData(json);
      console.log(`📊 TravelPayouts raw: ${rows.length} flights`);
      
      return rows;
    } catch (error) {
      console.error("TravelPayouts API call failed:", error);
      return [];
    }
  }

  // FIXED: BOOKING.COM API CALL with proper parameter encoding
  async function callBookingComApi({ origin, dest, depart, ret }) {
    try {
      const u = new URL("/api/booking-com", location.origin);
      
      // FIXED: Proper parameter encoding
      u.searchParams.set("origin", encodeURIComponent(origin));
      u.searchParams.set("destination", encodeURIComponent(dest));
      
      if (depart) {
        const fixedDepart = toISO(depart);
        if (fixedDepart) u.searchParams.set("depart", fixedDepart);
      }
      
      if (ret) {
        const fixedRet = toISO(ret);
        if (fixedRet) u.searchParams.set("return", fixedRet);
      }
      
      // FIXED: Proper number parameters
      u.searchParams.set("adults", String(ADULTS || '1'));
      u.searchParams.set("currency", String(CURRENCY || 'GBP'));
      
      console.log('🔧 Booking.com API URL:', u.toString());
      
      const r = await fetch(u.toString(), { headers: { accept: "application/json" } });
      
      if (!r.ok) {
        console.error(`❌ Booking.com HTTP error ${r.status}`);
        return [];
      }
      
      const text = await r.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error('❌ Booking.com JSON parse error:', text);
        json = { data: [] };
      }
      
      const rows = normalizeData(json);
      console.log(`📊 Booking.com raw: ${rows.length} flights`);
      
      return rows;
    } catch (error) {
      console.error("Booking.com API call failed:", error);
      return [];
    }
  }

  // REMOVE DUPLICATES
  function removeDuplicates(flights) {
    const seen = new Set();
    return flights.filter(flight => {
      const key = [
        flight.origin || flight.o,
        flight.destination || flight.d,
        isoOnly(flight.departure_at || flight.depart),
        flight.airline || "",
        Math.round(flight.price || 0)
      ].join("|");
      
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // FIXED: MAIN SEARCH FUNCTION with parameter validation
  async function search() {
    ensureElements();
    
    // VALIDATE parameters before proceeding
    if (!validateAndFixParameters()) {
      setStatus("Invalid search parameters. Please check your inputs.");
      return;
    }
    
    setStatus("Smart multi-source flight search in progress…");

    console.log("🚀 ========== SMART MULTI-API SEARCH START ==========");
    console.log(`📍 Search: ${ORIGIN} → ${DEST}, Depart: ${DEPART}, Return: ${RETURN}`);

    const cityO = toCity(ORIGIN);
    const cityD = toCity(DEST);
    
    console.log(`🏙️ City mapping: ${ORIGIN}→${cityO}, ${DEST}→${cityD}`);
    
    // Search outbound flights using multi-API approach
    const outboundFlights = await smartMultiApiSearch({
      origin: cityO,
      dest: cityD,
      depart: DEPART,
      isReturn: false
    });

    // Search return flights if round trip
    let returnFlights = [];
    if (RETURN) {
      returnFlights = await smartMultiApiSearch({
        origin: cityD,
        dest: cityO,
        depart: RETURN,
        isReturn: true
      });
    }

    console.log(`📦 Final results - Outbound: ${outboundFlights.length}, Return: ${returnFlights.length}`);

    // Build state from results
    buildStateFromFlights(outboundFlights, returnFlights);
    buildDateRibbons();
    render();
  }

  // BUILD STATE FROM FLIGHTS
  function buildStateFromFlights(outbound, returnFlights) {
    console.log(`🛠️ Building state from ${outbound.length} outbound + ${returnFlights.length} return flights`);
    
    const cy = CURRENCY;
    
    // Process outbound flights
    const outRows = outbound.map(flight => ({
      kind: "out",
      price: flight.price,
      cy,
      o: flight.origin_airport || flight.origin || ORIGIN,
      d: flight.destination_airport || flight.destination || DEST,
      depart: isoOnly(flight.departure_at || DEPART),
      ret: "",
      airline: (flight.airline || "").toUpperCase(),
      transfers: rowTransfers(flight),
      duration: rowDuration(flight),
      departure_time: flight.departure_at,
      flight_number: flight.flight_number,
      source: flight.source || 'unknown',
      affiliate_ready: true
    }));

    // Process return flights
    const backRows = returnFlights.map(flight => ({
      kind: "back",
      price: flight.price,
      cy,
      o: flight.origin_airport || flight.origin || DEST,
      d: flight.destination_airport || flight.destination || ORIGIN,
      depart: isoOnly(flight.departure_at || RETURN),
      ret: "",
      airline: (flight.airline || "").toUpperCase(),
      transfers: rowTransfers(flight),
      duration: rowDuration(flight),
      departure_time: flight.departure_at,
      flight_number: flight.flight_number,
      source: flight.source || 'unknown',
      affiliate_ready: true
    }));

    // Generate combos only if we have good flight data
    const combos = [];
    if (outRows.length > 0 && backRows.length > 0 && outRows.length <= 10 && backRows.length <= 10) {
      console.log(`🔗 Generating combos from ${outRows.length} outbound × ${backRows.length} return`);
      
      // Create reasonable number of combos
      const maxCombos = Math.min(outRows.length * backRows.length, 10);
      let generated = 0;
      
      for (let i = 0; i < outRows.length && generated < maxCombos; i++) {
        for (let j = 0; j < backRows.length && generated < maxCombos; j++) {
          const o = outRows[i];
          const r = backRows[j];
          
          const combo = {
            kind: "combo",
            price: (o.price || 0) + (r.price || 0),
            cy,
            o: o.o,
            d: o.d,
            depart: o.depart,
            ret: r.depart,
            airline: `${o.airline}${r.airline ? "/" + r.airline : ""}`,
            transfers: (o.transfers || 0) + (r.transfers || 0),
            duration: (o.duration || 0) + (r.duration || 0),
            sameCarrier: o.airline === r.airline,
            source: `combo:${o.source}+${r.source}`,
            affiliate_ready: true
          };
          
          combos.push(combo);
          generated++;
        }
      }
      
      console.log(`✅ Generated ${combos.length} combos`);
    }

    state = { 
      combos: combos,
      outbound: outRows, 
      back: backRows,
      tripType: RETURN ? "return" : "oneway"
    };
    
    console.log(`🏗️ Final state: ${state.combos.length} combos, ${state.outbound.length} outbound, ${state.back.length} return`);
  }

  // ENHANCED: Build date ribbons like Skyscanner with prices
  function buildDateRibbons() {
    if (!departRibbon) return;
    
    // Clear existing ribbons
    while (departRibbon.firstChild) departRibbon.removeChild(departRibbon.firstChild);
    if (returnRibbon) {
      while (returnRibbon.firstChild) returnRibbon.removeChild(returnRibbon.firstChild);
    }
    
    // Helper function to find best price for a date
    const findBestPriceForDate = (date, isReturn = false) => {
      const searchDate = isoOnly(date);
      let bestPrice = null;
      
      // Search through available flights for this date
      const flightsToCheck = isReturn ? state.back : state.outbound;
      
      flightsToCheck.forEach(flight => {
        const flightDate = isoOnly(flight.depart);
        if (flightDate === searchDate) {
          if (bestPrice === null || flight.price < bestPrice) {
            bestPrice = flight.price;
          }
        }
      });
      
      // Also check combos for return trips
      if (isReturn && state.combos.length) {
        state.combos.forEach(combo => {
          const comboDate = isoOnly(combo.ret);
          if (comboDate === searchDate) {
            if (bestPrice === null || combo.price < bestPrice) {
              bestPrice = combo.price;
            }
          }
        });
      }
      
      return bestPrice;
    };
    
    // Build depart date ribbon (-3 to +3 days) with prices
    const baseDepart = DEPART || shift(new Date().toISOString().slice(0, 10), 14);
    for (let i = -3; i <= 3; i++) {
      const date = shift(baseDepart, i);
      const bestPrice = findBestPriceForDate(date, false);
      
      const chip = createElement("a", "date-chip", "");
      chip.href = buildRibbonURL(date, RETURN);
      
      // Create date and price structure
      const dateDiv = createElement("div", "date-chip-day", getDayName(date));
      const dateNum = createElement("div", "date-chip-date", formatDateForDisplay(date));
      
      const priceDiv = createElement("div", "date-chip-price", 
        bestPrice ? nf(bestPrice, CURRENCY) : "—"
      );
      
      chip.appendChild(dateDiv);
      chip.appendChild(dateNum);
      chip.appendChild(priceDiv);
      
      // Highlight current selected date
      if (date === baseDepart) {
        chip.classList.add("active");
      }
      
      // Add low price indicator
      if (bestPrice && isLowPrice(date, bestPrice, false)) {
        chip.classList.add("low-price");
      }
      
      departRibbon.appendChild(chip);
    }
    
    // Build return date ribbon if return trip
    if (RETURN && returnRibbon && returnRibbonWrap) {
      returnRibbonWrap.style.display = "block";
      const baseReturn = RETURN;
      for (let i = -3; i <= 3; i++) {
        const date = shift(baseReturn, i);
        const bestPrice = findBestPriceForDate(date, true);
        
        const chip = createElement("a", "date-chip", "");
        chip.href = buildRibbonURL(DEPART, date);
        
        // Create date and price structure
        const dateDiv = createElement("div", "date-chip-day", getDayName(date));
        const dateNum = createElement("div", "date-chip-date", formatDateForDisplay(date));
        
        const priceDiv = createElement("div", "date-chip-price", 
          bestPrice ? nf(bestPrice, CURRENCY) : "—"
        );
        
        chip.appendChild(dateDiv);
        chip.appendChild(dateNum);
        chip.appendChild(priceDiv);
        
        // Highlight current selected date
        if (date === baseReturn) {
          chip.classList.add("active");
        }
        
        // Add low price indicator
        if (bestPrice && isLowPrice(date, bestPrice, true)) {
          chip.classList.add("low-price");
        }
        
        returnRibbon.appendChild(chip);
      }
    } else if (returnRibbonWrap) {
      returnRibbonWrap.style.display = "none";
    }
  }
  
  // Helper functions for date formatting
  function getDayName(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString + 'T00:00:00Z');
    return days[date.getUTCDay()];
  }

  function formatDateForDisplay(dateString) {
    return dateString.slice(5).replace('-', '/'); // Shows "MM/DD"
  }

  // Helper to determine if price is low compared to other dates
  function isLowPrice(date, price, isReturn) {
    const dates = [];
    const baseDate = isReturn ? RETURN : DEPART;
    
    // Get prices for all dates in the ribbon
    for (let i = -3; i <= 3; i++) {
      const checkDate = shift(baseDate, i);
      const checkPrice = findBestPriceForDate(checkDate, isReturn);
      if (checkPrice !== null) {
        dates.push({ date: checkDate, price: checkPrice });
      }
    }
    
    // Find the minimum price
    const minPrice = Math.min(...dates.map(d => d.price));
    
    // Consider it low price if within 5% of the minimum
    return price <= minPrice * 1.05;
  }

  // Helper function to find best price (needs to be accessible)
  function findBestPriceForDate(date, isReturn = false) {
    const searchDate = isoOnly(date);
    let bestPrice = null;
    
    // Search through available flights for this date
    const flightsToCheck = isReturn ? state.back : state.outbound;
    
    flightsToCheck.forEach(flight => {
      const flightDate = isoOnly(flight.depart);
      if (flightDate === searchDate) {
        if (bestPrice === null || flight.price < bestPrice) {
          bestPrice = flight.price;
        }
      }
    });
    
    // Also check combos for return trips
    if (isReturn && state.combos.length) {
      state.combos.forEach(combo => {
        const comboDate = isoOnly(combo.ret);
        if (comboDate === searchDate) {
          if (bestPrice === null || combo.price < bestPrice) {
            bestPrice = combo.price;
          }
        }
      });
    }
    
    return bestPrice;
  }

  function buildRibbonURL(departDate, returnDate) {
    const url = new URL("/flights/results.html", location.origin);
    url.searchParams.set("origin", ORIGIN);
    url.searchParams.set("destination", DEST);
    if (departDate) url.searchParams.set("departure_at", departDate);
    if (returnDate) url.searchParams.set("return_at", returnDate);
    url.searchParams.set("adults", ADULTS);
    url.searchParams.set("children", CHILDREN);
    url.searchParams.set("infants", INFANTS);
    url.searchParams.set("currency", CURRENCY);
    url.searchParams.set("direct", String(DIRECT_REQ));
    
    // Preserve language
    const lang = Q.get("lang");
    if (lang) url.searchParams.set("lang", lang);
    
    return url.toString();
  }

  // FIXED: XSS SAFE SKYSCANNER-STYLE FLIGHT CARD
  function createFlightCard(r) {
    const article = createElement("article", "result-card flight-card");
    
    // Add source indicator
    if (r.source && r.source.includes('booking.com')) {
      article.style.borderLeft = "4px solid #003580";
    } else if (r.source && r.source.includes('travelpayouts')) {
      article.style.borderLeft = "4px solid #6A00FF";
    }
    
    const mainAir = (r.airline || "").split("/")[0] || "";
    const isDirect = (r.transfers || 0) === 0;
    
    // Card header with airline and price
    const header = createElement("div", "flight-card-header");
    
    const airlineInfo = createElement("div", "flight-airline");
    if (mainAir) {
      const logo = createElement("img", "airline-logo");
      logo.src = `https://pics.avs.io/200/75/${mainAir}.png`;
      logo.alt = `${mainAir} logo`;
      logo.loading = "lazy";
      airlineInfo.appendChild(logo);
    }
    
    const airlineName = createElement("span", "airline-name", r.airline || "Multiple airlines");
    airlineInfo.appendChild(airlineName);
    
    const price = createElement("div", "flight-price", nf(r.price, r.cy));
    
    header.appendChild(airlineInfo);
    header.appendChild(price);
    
    // Flight route and times - FIXED: No innerHTML
    const route = createElement("div", "flight-route");
    
    const origin = createElement("div", "flight-origin");
    const originCode = createElement("div", "airport-code", r.o);
    const originTime = createElement("div", "flight-time", r.departure_time ? formatTime(r.departure_time) : "—");
    origin.appendChild(originCode);
    origin.appendChild(originTime);
    
    const stops = createElement("div", "flight-stops");
    
    // FIXED: Using safe DOM methods instead of innerHTML
    if (isDirect) {
      const directText = createElement("div", "direct-flight", "Direct");
      const durationText = createElement("div", "flight-duration", formatDuration(r.duration));
      stops.appendChild(directText);
      stops.appendChild(durationText);
    } else {
      const stopsText = createElement("div", "stops", 
        `${r.transfers} stop${r.transfers > 1 ? 's' : ''}`
      );
      const durationText = createElement("div", "flight-duration", formatDuration(r.duration));
      stops.appendChild(stopsText);
      stops.appendChild(durationText);
    }
    
    const destination = createElement("div", "flight-destination");
    const destCode = createElement("div", "airport-code", r.d);
    const destTime = createElement("div", "flight-time", r.arrival_time ? formatTime(r.arrival_time) : "—");
    destination.appendChild(destCode);
    destination.appendChild(destTime);
    
    route.appendChild(origin);
    route.appendChild(stops);
    route.appendChild(destination);
    
    // Date and booking section
    const footer = createElement("div", "flight-card-footer");
    
    const dateInfo = createElement("div", "flight-date");
    const dateText = `Depart: ${formatDisplayDate(r.depart)}${r.ret ? ` · Return: ${formatDisplayDate(r.ret)}` : ''}`;
    dateInfo.textContent = dateText; // SAFE: textContent
    
    // Show data source if available
    if (r.source && !r.source.includes('combo')) {
      const source = createElement("div", "search-source small muted");
      source.textContent = `Source: ${r.source}`; // SAFE: textContent
      source.style.marginTop = "4px";
      source.style.fontSize = "12px";
      dateInfo.appendChild(source);
    }
    
    const booking = createProviderButtons(r);
    booking.className = "flight-booking";
    
    footer.appendChild(dateInfo);
    footer.appendChild(booking);
    
    // Assemble card
    article.appendChild(header);
    article.appendChild(route);
    article.appendChild(footer);
    
    return article;
  }

  function formatTime(dateTimeString) {
    if (!dateTimeString) return "—";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return "—";
    }
  }

  function formatDuration(minutes) {
    if (!minutes) return "—";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr + 'T00:00:00Z');
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  // ENHANCED PROVIDER BUTTONS - USE YOUR AFFILIATE LINKS
  function createProviderButtons(r) {
    const container = createElement("div", "partner-row");
    
    const providers = [
      { 
        name: "Aviasales", 
        class: "btn-avia", 
        provider: "avia",
        color: "avia"
      },
      { 
        name: "Kiwi", 
        class: "btn-kiwi", 
        provider: "kiwi",
        color: "kiwi"
      },
      { 
        name: "WayAway", 
        class: "btn-wayaway", 
        provider: "wayaway",
        color: "wayaway"
      }
    ];

    providers.forEach(({ name, class: className, provider, color }) => {
      const btn = createElement("a", `partner btn-partner btn-${color}`, name);
      
      // USE YOUR EXISTING AFFILIATE LINK SYSTEM
      const url = new URL("/api/afflink", location.origin);
      url.searchParams.set("provider", provider);
      url.searchParams.set("origin", r.o);
      url.searchParams.set("destination", r.d);
      if (r.depart) url.searchParams.set("depart", r.depart);
      if (r.ret) url.searchParams.set("return", r.ret);
      url.searchParams.set("adults", ADULTS);
      url.searchParams.set("children", CHILDREN);
      url.searchParams.set("infants", INFANTS);
      url.searchParams.set("currency", r.cy || CURRENCY);
      url.searchParams.set("direct", String(DIRECT_REQ));
      
      // Add flight details for better pre-fill
      if (r.flight_number) url.searchParams.set("flight_number", r.flight_number);
      if (r.airline) url.searchParams.set("airline", r.airline);
      
      btn.href = url.toString();
      btn.rel = "nofollow sponsored";
      btn.target = "_blank";
      
      container.appendChild(btn);
    });

    return container;
  }

  function renderStatusLine() {
    if (!status) return;
    
    const combos = applyFiltersAndSort(state.combos);
    const outs = applyFiltersAndSort(state.outbound);
    const backs = applyFiltersAndSort(state.back);
    
    let totalResults = 0;
    if (state.tripType === "oneway") {
      totalResults = outs.length;
    } else {
      totalResults = combos.length > 0 ? combos.length : (outs.length + backs.length);
    }
    
    // Count sources
    const sources = {};
    [...state.outbound, ...state.back].forEach(f => {
      const source = f.source || 'unknown';
      sources[source] = (sources[source] || 0) + 1;
    });
    
    const sourceText = Object.keys(sources).map(s => `${sources[s]} from ${s}`).join(', ');
    
    status.textContent = `Found ${totalResults} flights · Sources: ${sourceText} · Currency: ${CURRENCY}`;
  }

  function render() {
    renderStatusLine();
    renderAirlineChips();

    if (!list) return;

    // Clear list safely
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    const combos = applyFiltersAndSort(state.combos);
    const outs = applyFiltersAndSort(state.outbound);
    const backs = applyFiltersAndSort(state.back);

    if (!combos.length && !outs.length && !backs.length) {
      const noResults = createElement("div", "muted", "No flights found. Try different dates or airports.");
      list.appendChild(noResults);
      wireControlsOnce();
      return;
    }

    let allResults = [];
    
    if (state.tripType === "oneway") {
      allResults = outs;
    } else {
      // For return trips, show combos first, then individual legs
      allResults = combos.length > 0 ? combos : [...outs, ...backs];
    }

    // Show all available results
    if (allResults.length === 0) {
      const noResults = createElement("div", "muted", "No flights match your current filters.");
      list.appendChild(noResults);
    } else {
      // Group by type for better display
      if (combos.length > 0 && state.tripType === "return") {
        const comboHeading = createElement("h3", "", "Round-trip Combos");
        comboHeading.style.margin = "16px 0 8px 0";
        list.appendChild(comboHeading);
        
        combos.forEach(r => {
          list.appendChild(createFlightCard(r));
        });
      }
      
      if (outs.length > 0) {
        const outHeading = createElement("h3", "", "Outbound Flights");
        outHeading.style.margin = combos.length > 0 ? "24px 0 8px 0" : "16px 0 8px 0";
        list.appendChild(outHeading);
        
        outs.forEach(r => {
          list.appendChild(createFlightCard(r));
        });
      }
      
      if (backs.length > 0 && state.tripType === "return") {
        const backHeading = createElement("h3", "", "Return Flights");
        backHeading.style.margin = "24px 0 8px 0";
        list.appendChild(backHeading);
        
        backs.forEach(r => {
          list.appendChild(createFlightCard(r));
        });
      }
    }

    wireControlsOnce();
  }

  function applyFiltersAndSort(rows) {
    // Stops filter
    let out = rows.filter(r => {
      const s = r.transfers || 0;
      if (stopsMode === "0") return s === 0;
      if (stopsMode === "1") return s <= 1;
      if (stopsMode === "2") return s >= 2;
      return true;
    });

    // Airline filter
    if (airlineMode !== "any") {
      out = out.filter(r => (r.airline || "").toUpperCase().split("/").includes(airlineMode));
    } else if (selAir && selAir.value !== "any") {
      const a = selAir.value.toUpperCase();
      out = out.filter(r => (r.airline || "").toUpperCase().includes(a));
    }

    // Sort
    if (sortMode === "duration") {
      out.sort((x, y) => (x.duration || 1e9) - (y.duration || 1e9));
    } else if (sortMode === "stops") {
      out.sort((x, y) => (x.transfers || 0) - (y.transfers || 0) || (x.price || 0) - (y.price || 0));
    } else {
      out.sort((x, y) => (x.price || 0) - (y.price || 0));
    }

    return out;
  }

  function renderAirlineChips() {
    if (!airChipsCard || !airChips) return;

    const set = new Set();
    [...state.combos, ...state.outbound, ...state.back].forEach(r => {
      (r.airline || "").split("/").forEach(x => {
        if (x) set.add(x);
      });
    });

    const arr = [...set].filter(Boolean).sort();

    // Clear existing chips safely
    while (airChips.firstChild) {
      airChips.removeChild(airChips.firstChild);
    }

    if (arr.length && arr.length <= 6) {
      airChipsCard.style.display = "";
      if (selAir) selAir.style.display = "none";

      // Create chips using safe DOM methods
      const anyChip = createElement("button", "chip" + (airlineMode === 'any' ? ' active' : ''), "Any");
      anyChip.setAttribute("data-air", "any");
      anyChip.setAttribute("aria-pressed", airlineMode === 'any' ? "true" : "false");
      airChips.appendChild(anyChip);

      arr.forEach(airline => {
        const chip = createElement("button", "chip" + (airlineMode === airline ? ' active' : ''), airline);
        chip.setAttribute("data-air", airline);
        chip.setAttribute("aria-pressed", airlineMode === airline ? "true" : "false");
        airChips.appendChild(chip);
      });

      // Add event listener
      airChips.addEventListener("click", handleAirlineChipClick);
    } else {
      airChipsCard.style.display = "none";
      if (selAir) {
        selAir.style.display = "";
        // Safe select population
        while (selAir.firstChild) selAir.removeChild(selAir.firstChild);
        const anyOption = createElement("option", "", "Any");
        anyOption.value = "any";
        selAir.appendChild(anyOption);
        arr.forEach(airline => {
          const option = createElement("option", "", airline);
          option.value = airline;
          selAir.appendChild(option);
        });
        if ([...arr, "any"].includes(selAir.value)) selAir.value = selAir.value;
        selAir.onchange = render;
      }
    }
  }

  function handleAirlineChipClick(e) {
    const btn = e.target.closest("[data-air]");
    if (!btn) return;

    airlineMode = btn.getAttribute("data-air");
    $$(".chip", airChips).forEach(c => {
      const on = c === btn;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    render();
  }

  function wireControlsOnce() {
    if (wireControlsOnce._done) return;
    wireControlsOnce._done = true;

    // Sort chips
    if (sortGroup) {
      sortGroup.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-sort]");
        if (!chip) return;

        sortMode = chip.getAttribute("data-sort");
        $$(".chip", sortGroup).forEach(c => {
          const active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });
        render();
      });
    }

    // Stops chips
    if (stopsGroup) {
      stopsGroup.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-stops]");
        if (!chip) return;

        stopsMode = chip.getAttribute("data-stops");
        $$(".chip", stopsGroup).forEach(c => {
          const active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", active ? "true" : "false");
        });
        render();
      });
    }
  }

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  // Start the smart multi-API search
  console.log("🚀 Initializing XSS-SAFE smart multi-API flight search...");
  search().catch((error) => {
    console.error("Search failed:", error);
    setStatus("Search failed. Please try again.");
  });
})();
