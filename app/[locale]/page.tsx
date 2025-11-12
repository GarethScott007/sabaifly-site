import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center bg-white text-neutral-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[420px] md:h-[400px] overflow-visible">
        {/* Background Image */}
        <Image
          src="/img/hero-home.jpg"
          alt="SabaiFly hero"
          fill
          priority
          className="object-cover object-center z-0"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-semibold drop-shadow-lg mb-6 text-center">
            {t("home.heroTitle")}
          </h1>

          {/* Search Bar */}
          <div className="w-[92%] md:w-[88%] lg:w-[82%] bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-2 md:p-3 translate-y-[-150px]">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 text-neutral-700">
        <h2 className="text-2xl font-semibold mb-4">{t("home.missionTitle")}</h2>
        <p className="leading-relaxed text-lg">{t("home.missionText1")}</p>

        <p className="mt-4 leading-relaxed text-lg">{t("home.missionText2")}</p>
      </section>

      {/* Popular Routes */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6">
          {t("home.popularRoutesTitle")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { from: "LHR", to: "BKK", label: "London → Bangkok" },
            { from: "LHR", to: "JFK", label: "London → New York" },
            { from: "LHR", to: "SIN", label: "London → Singapore" },
            { from: "LHR", to: "HND", label: "London → Tokyo" },
            { from: "LHR", to: "SYD", label: "London → Sydney" },
            { from: "LHR", to: "DEL", label: "London → Delhi" },
            { from: "LHR", to: "HKT", label: "London → Phuket" },
            { from: "LHR", to: "DXB", label: "London → Dubai" },
            { from: "LHR", to: "KUL", label: "London → Kuala Lumpur" },
            { from: "LHR", to: "BOM", label: "London → Mumbai" },
          ].map(({ from, to, label }) => (
            <Link
              key={`${from}-${to}`}
              href={`/destinations/${from.toLowerCase()}-to-${to.toLowerCase()}`}
              className="bg-brand text-white font-medium py-3 px-2 rounded-lg text-center hover:bg-brand-dark transition-all shadow-sm text-sm"
            >
              {from} → {to}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
