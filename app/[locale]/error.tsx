"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
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
            Go Home
          </a>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-left">
            <p className="font-mono text-xs text-red-800 break-all">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-xs text-gray-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
