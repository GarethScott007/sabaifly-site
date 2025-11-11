"use client";

import React from "react";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`w-full bg-brand flex items-center justify-between px-10 ${className}`}
    >
      {/* Left – Logo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-4xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
        >
          SabaiFly
        </Link>
      </div>

      {/* Center – Navigation */}
      <nav className="hidden md:flex items-center gap-10 text-base font-medium text-white/90">
        <Link href="/" className="hover:underline underline-offset-4">
          Home
        </Link>
        <Link href="/flights" className="hover:underline underline-offset-4">
          Flights
        </Link>
        <Link href="/hotels" className="hover:underline underline-offset-4">
          Hotels (partner)
        </Link>
        <Link href="/about" className="hover:underline underline-offset-4">
          About
        </Link>
      </nav>

      {/* Right – Language Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition">
          EN
        </button>
        <button className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition">
          TH
        </button>
      </div>
    </header>
  );
}
