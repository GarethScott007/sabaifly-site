"use client";

import { useEffect } from "react";

export default function ResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Results page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Flights</h1>
        <p className="text-gray-600 mb-6">
          We couldn't load flight results. This might be due to invalid search parameters or a temporary
          issue with our flight data provider.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-brand text-white rounded-full hover:bg-brand-dark transition"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
          >
            New Search
          </a>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded text-left">
            <p className="font-mono text-xs text-orange-800 break-all">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
