// /functions/api/booking-com.js
// Booking.com API for flight search (but booking happens via your affiliate links)

export async function onRequestGet(context) {
  try {
    const { request } = context;
    const url = new URL(request.url);
    
    // Get search parameters
    const origin = url.searchParams.get('origin');
    const destination = url.searchParams.get('destination');
    const departDate = url.searchParams.get('depart');
    const returnDate = url.searchParams.get('return');
    const adults = url.searchParams.get('adults') || '1';
    const currency = url.searchParams.get('currency') || 'GBP';
    
    if (!origin || !destination || !departDate) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`🔍 Booking.com Search: ${origin}→${destination} ${departDate}`);
    
    // Search for flights using Booking.com API
    const flights = await searchBookingFlights(origin, destination, departDate, returnDate, adults, currency);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: flights,
      source: 'booking.com',
      note: 'Use affiliate links for actual booking'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Booking.com API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Search failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function searchBookingFlights(origin, destination, departDate, returnDate, adults, currency) {
  // Use your actual RapidAPI key
  const RAPIDAPI_KEY = '3bcef303d4mshd95e0a34dd90cd4p108f08jsn8ee1670731ab';
  
  try {
    // Build the API URL for flights search
    const apiUrl = new URL('https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights');
    apiUrl.searchParams.set('from', origin);
    apiUrl.searchParams.set('to', destination);
    apiUrl.searchParams.set('departure', departDate);
    if (returnDate) apiUrl.searchParams.set('return', returnDate);
    apiUrl.searchParams.set('adults', adults);
    apiUrl.searchParams.set('currency', currency);
    
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Booking.com API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Booking.com results to match your app format
    return transformBookingResults(data, origin, destination);
    
  } catch (error) {
    console.error('Booking.com search error:', error);
    return []; // Return empty array if search fails
  }
}

function transformBookingResults(apiData, origin, destination) {
  if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
    return [];
  }

  const flights = [];
  
  apiData.data.forEach(flight => {
    if (!flight || !flight.offers || !Array.isArray(flight.offers)) return;
    
    // Get the best (lowest price) offer
    const bestOffer = flight.offers[0];
    if (!bestOffer || !bestOffer.price) return;
    
    // Extract flight segments to determine if direct
    const segments = flight.segments || [];
    const isDirect = segments.length === 1;
    const transfers = Math.max(0, segments.length - 1);
    
    // Calculate total duration
    let totalDuration = 0;
    segments.forEach(segment => {
      if (segment.duration) totalDuration += segment.duration;
    });
    
    flights.push({
      // Core flight data
      price: bestOffer.price,
      currency: bestOffer.currency || 'GBP',
      airline: extractAirlines(segments),
      origin: origin,
      destination: destination,
      departure_at: extractDepartureDate(segments),
      duration: totalDuration,
      transfers: transfers,
      direct: isDirect,
      
      // Metadata
      provider: 'booking.com',
      search_source: 'booking.com',
      
      // Your affiliate links will be used for actual booking
      affiliate_ready: true, // This tells the frontend to use your affiliate links
      
      // Keep original data for debugging
      _raw: {
        segments: segments.length,
        offer_count: flight.offers.length
      }
    });
  });

  return flights;
}

function extractAirlines(segments) {
  const airlines = new Set();
  segments.forEach(segment => {
    if (segment.airline && segment.airline.name) {
      airlines.add(segment.airline.name);
    }
  });
  return Array.from(airlines).join(' / ') || 'Multiple Airlines';
}

function extractDepartureDate(segments) {
  if (!segments.length) return '';
  const firstSegment = segments[0];
  if (firstSegment.departure && firstSegment.departure.time) {
    return firstSegment.departure.time.split('T')[0];
  }
  return '';
}
