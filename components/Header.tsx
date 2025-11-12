"use client";

import React from "react";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full h-16 bg-brand flex items-center justify-between px-6 md:px-10 shadow-md ${className}`}
    >
      {/* Left – Logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
        >
          SabaiFly
        </Link>
      </div>

      {/* Center – Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base font-medium text-white">
        <Link href="/" className="hover:underline underline-offset-4 transition">
          Home
        </Link>
        <Link href="/flights" className="hover:underline underline-offset-4 transition">
          Flights
        </Link>
        <Link href="/hotels" className="hover:underline underline-offset-4 transition">
          Hotels
        </Link>
        <Link href="/about" className="hover:underline underline-offset-4 transition">
          About
        </Link>
        <Link href="/privacy" className="hover:underline underline-offset-4 transition">
          Privacy
        </Link>
      </nav>

      {/* Right – Language Buttons (More Visible) */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          className="px-3 py-1.5 rounded-full bg-white text-brand font-semibold hover:bg-white/90 transition text-sm"
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          className="px-3 py-1.5 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition border border-white/30 text-sm"
          aria-label="Switch to Thai"
        >
          TH
        </button>
      </div>
    </header>
  );
}
