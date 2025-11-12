/**
 * Type definitions for the SabaiFly application
 */

// Flight data from Travelpayouts API
export interface TravelpayoutsFlight {
  id?: string;
  origin: string;
  destination: string;
  departure_at: string;
  return_at?: string;
  price: number;
  airline: string;
  flight_number?: number;
  transfers?: number;
  duration?: number;
  link?: string;
  [key: string]: unknown;
}

// Airport suggestion from Travelpayouts API
export interface AirportSuggestion {
  name: string;
  code: string;
  city_name: string;
  country_code?: string;
  country_name?: string;
}

// Flight status from AviationStack API
export interface FlightStatus {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal?: string;
    gate?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal?: string;
    gate?: string;
    baggage?: string;
    delay?: number;
    scheduled: string;
    estimated?: string;
    actual?: string;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
  };
  aircraft?: {
    registration?: string;
    iata?: string;
    icao?: string;
  };
}

// API Response types
export interface LivePricingResponse {
  success: boolean;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  currency: string;
  flights: TravelpayoutsFlight[];
  meta: {
    count: number;
    cachedAt: string;
  };
}

export interface ApiErrorResponse {
  error: string;
  status?: number;
  message?: string;
  required?: string[];
}

// Form state types
export interface SearchFormState {
  tripType: "round" | "oneway";
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  travellers: {
    adults: number;
    children: number;
    infants: number;
  };
}

export interface FilterState {
  stops: string[];
  timeOfDay: string[];
  baggage: string[];
}

// Search params types
export interface SearchParams {
  from: string;
  to: string;
  tripType?: string;
  departDate?: string;
  returnDate?: string;
  adults?: string;
  children?: string;
  infants?: string;
}

// Travelpayouts API response
export interface TravelpayoutsApiResponse {
  success: boolean;
  data: TravelpayoutsFlight[];
  currency?: string;
  error?: string;
}
