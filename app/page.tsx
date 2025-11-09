import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import { Card } from "@/components/Card";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchForm />
      <section className="section" aria-labelledby="mission-how">
        <div className="rail">
          <Card>
            <h2 id="mission-how">What we do & how it works</h2>
            <p>We show you fast, clean flight results. When you click through and book, our partners pay us a commission.</p>
            <p><strong>We never add fees to your ticket price.</strong> You always pay the airline or travel partner directly.</p>
            <ol className="text-muted list-decimal pl-5">
              <li>Pick your route & dates. We search multiple sources to find low fares.</li>
              <li>Use quick filters or the monthly price calendar to compare smarter.</li>
              <li>Book with our partners (Aviasales, Kiwi). Hotels and car rentals are a click away.</li>
            </ol>
          </Card>
        </div>
      </section>
      <section className="section" aria-labelledby="spotlights">
        <div className="rail">
          <Card>
            <h2 id="spotlights">Route spotlights</h2>
            <div className="grid gap-4 grid-cols-3 max-md:grid-cols-1">
              {[
                ["lon-bkk", "LON → BKK"], ["lon-nyc", "LON → NYC"], ["lon-dxb", "LON → DXB"],
                ["lon-sin", "LON → SIN"], ["lon-tyo", "LON → TYO"], ["lon-lax", "LON → LAX"],
                ["lon-syd", "LON → SYD"], ["lon-del", "LON → DEL"], ["lon-hkt", "LON → HKT"],
                ["lon-hkg", "LON → HKG"], ["lon-kul", "LON → KUL"], ["lon-bom", "LON → BOM"],
                ["bkk-hkt", "BKK → HKT"]
              ].map(([slug, label]) => (
                <a key={slug} href={`/routes/${slug}.html`} className="btn pill">{label}</a>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
