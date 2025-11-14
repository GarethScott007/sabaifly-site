"use client";

import { getBestAffiliateLink } from "@/lib/affiliateLinks";
import { Plane } from "lucide-react";

interface AffiliateSearchButtonProps {
  from: string;
  to: string;
  departDate?: string;
  returnDate?: string;
  label?: string;
  variant?: "primary" | "secondary";
}

export default function AffiliateSearchButton({
  from,
  to,
  departDate,
  returnDate,
  label = "Search Flights",
  variant = "primary",
}: AffiliateSearchButtonProps) {
  const { url, partner } = getBestAffiliateLink({
    from,
    to,
    departDate,
    returnDate,
  });

  const handleClick = () => {
    // Track the click (you can add analytics here)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "affiliate_click", {
        partner: partner,
        route: `${from}-${to}`,
      });
    }

    // Open in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isPrimary = variant === "primary";

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold
        transition-all duration-200 shadow-md hover:shadow-lg
        ${
          isPrimary
            ? "bg-brand hover:bg-brand-dark text-white"
            : "bg-white hover:bg-gray-50 text-brand border-2 border-brand"
        }
      `}
    >
      <Plane className="w-5 h-5" />
      {label}
    </button>
  );
}
