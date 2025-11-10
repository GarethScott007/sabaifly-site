import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white text-neutral-900 min-h-screen">
      {/* Header */}
      <Header className="h-32 shadow-md" />

      {/* Hero Section */}
      <section className="relative w-full h-[520px] md:h-[480px] lg:h-[520px] overflow-visible">
        {/* Background Image */}
        <Image
          src="/img/hero-home.jpg"
          alt="SabaiFly hero"
          fill
          priority
          className="object-cover object-center z-0"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 px-4">
          <h1 className="text-white text-4xl md:text-5xl font-semibold drop-shadow-lg mb-10 text-center">
            Find your next adventure
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-5">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 text-neutral-700">
        <h2 className="text-2xl font-semibold mb-4">Our mission</h2>
        <p className="leading-relaxed text-lg">
          Fast search. Clean results. Booking handled by trusted partners. We
          show you flights and fares from multiple sources, so you always get
          the best options without hidden fees. You always pay the airline or
          travel partner directly.
        </p>

        <p className="mt-4 leading-relaxed text-lg">
          Use smart filters or monthly price calendars to compare fares quickly.
          Book confidently with our partners — Kiwi, Aviasales, and Travelpayouts.
        </p>
      </section>

      {/* Popular Routes Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6">Popular routes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            ["LON", "BKK"],
            ["LON", "NYC"],
            ["LON", "SIN"],
            ["LON", "TYO"],
            ["LON", "SYD"],
            ["LON", "DEL"],
            ["LON", "HKT"],
            ["LON", "DXB"],
            ["LON", "KUL"],
            ["LON", "BOM"],
          ].map(([from, to]) => (
            <Link
              key={`${from}-${to}`}
              href={`/status/${from}-${to}`}
              className="bg-brand text-white font-medium py-3 rounded-full text-center hover:bg-brand-dark transition-all shadow-sm"
            >
              {from} → {to}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
