import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white text-neutral-900">
      {/* Header */}
      <Header className="h-28 shadow-md" />

      {/* Hero Section */}
      <section className="relative w-full h-[450px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/img/hero-home.jpg"
          alt="SabaiFly hero"
          fill
          priority
          className="object-cover object-center z-0"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 px-4">
          <h1 className="text-white text-4xl md:text-5xl font-semibold drop-shadow-lg mb-8">
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
