"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Plane, MapPin, Clock, AlertCircle } from "lucide-react";

interface FlightData {
  flight: {
    iata: string;
    status: string;
  };
  airline: {
    name: string;
    iata: string;
  };
  aircraft: any;
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    actual: string | null;
  };
  arrival: {
    airport: string;
    iata: string;
    estimated: string | null;
    actual: string | null;
  };
}

export default function LiveFlightsPage() {
  const t = useTranslations();
  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber.trim()) return;

    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const response = await fetch(`/api/status?flight_iata=${flightNumber.toUpperCase()}&fresh=true`);

      if (!response.ok) {
        if (response.status === 404) {
          setError(t("liveFlights.notFound"));
        } else {
          setError(t("liveFlights.error"));
        }
        return;
      }

      const data = await response.json();
      setFlightData(data);
    } catch (err) {
      setError(t("liveFlights.error"));
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "active") return "bg-green-100 text-green-800 border-green-300";
    if (statusLower === "landed") return "bg-blue-100 text-blue-800 border-blue-300";
    if (statusLower === "scheduled") return "bg-gray-100 text-gray-800 border-gray-300";
    if (statusLower === "cancelled") return "bg-red-100 text-red-800 border-red-300";
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  };

  const getStatusText = (status: string) => {
    const statusLower = status.toLowerCase();
    return t(`liveFlights.statuses.${statusLower}` as any) || status;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("liveFlights.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("liveFlights.subtitle")}
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder={t("liveFlights.searchPlaceholder")}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Plane className="w-5 h-5" />
              {loading ? t("liveFlights.loading") : t("liveFlights.searchButton")}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Flight Data Display */}
        {flightData && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Flight Header */}
            <div className="bg-brand text-white p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">{t("liveFlights.flightNumber")}</p>
                  <h2 className="text-3xl font-bold">{flightData.flight.iata}</h2>
                  <p className="text-lg mt-1">{flightData.airline.name}</p>
                </div>
                <div className={`inline-block px-6 py-3 rounded-full border-2 font-semibold ${getStatusColor(flightData.flight.status)}`}>
                  {getStatusText(flightData.flight.status)}
                </div>
              </div>
            </div>

            {/* Flight Route */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Departure */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand">
                    <MapPin className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{t("liveFlights.departure")}</h3>
                  </div>
                  <div className="pl-9 space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{flightData.departure.iata}</p>
                    <p className="text-gray-600">{flightData.departure.airport}</p>
                    <div className="pt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">{t("liveFlights.scheduled")}:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatDateTime(flightData.departure.scheduled)}
                        </span>
                      </div>
                      {flightData.departure.actual && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t("liveFlights.actual")}:</span>
                          <span className="text-sm font-medium text-green-600">
                            {formatDateTime(flightData.departure.actual)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand">
                    <MapPin className="w-6 h-6" />
                    <h3 className="text-xl font-semibold">{t("liveFlights.arrival")}</h3>
                  </div>
                  <div className="pl-9 space-y-2">
                    <p className="text-2xl font-bold text-gray-900">{flightData.arrival.iata}</p>
                    <p className="text-gray-600">{flightData.arrival.airport}</p>
                    <div className="pt-2 space-y-1">
                      {flightData.arrival.estimated && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t("liveFlights.estimated")}:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatDateTime(flightData.arrival.estimated)}
                          </span>
                        </div>
                      )}
                      {flightData.arrival.actual && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">{t("liveFlights.actual")}:</span>
                          <span className="text-sm font-medium text-green-600">
                            {formatDateTime(flightData.arrival.actual)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Aircraft Info */}
              {flightData.aircraft && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-700 mb-3">
                    <Plane className="w-5 h-5" />
                    <h4 className="font-semibold">{t("liveFlights.aircraft")}</h4>
                  </div>
                  <p className="text-gray-600 pl-8">
                    {flightData.aircraft.registration || flightData.aircraft.iata || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!flightData && !loading && !error && (
          <div className="text-center py-16">
            <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {t("liveFlights.enterFlightNumber")}
            </p>
          </div>
        )}

        {/* Info Note */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-medium mb-1">Real-time Flight Tracking</p>
              <p className="text-blue-700 text-sm">
                Flight data is updated in real-time and cached for 10 minutes for optimal performance.
                Search for any commercial flight worldwide by its flight number (e.g., BA123, EK203, TG920).
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
