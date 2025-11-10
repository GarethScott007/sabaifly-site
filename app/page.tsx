import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white text-neutral-900">
      {/* Header */}
      <Header className="h-24 shadow-sm" />

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto h-[600px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-3xl">
        <Image
          src="/img/hero-home.jpg"
          alt="SabaiFly hero"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Centered Search Form */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-semibold mb-6 drop-shadow-md">
            Find your next adventure
          </h1>

          <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Optional content below hero */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 text-neutral-700">
        <h2 className="text-xl font-semibold mb-4">Our mission</h2>
        <p className="leading-relaxed">
          Fast search. Clean results. Booking handled by trusted partners. We
          show you flights and fares from multiple sources, so you always get
          the best options without hidden fees.
        </p>
      </section>
    </main>
  );
}
