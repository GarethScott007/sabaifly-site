export default function Hero() {
  return (
    <section className="my-6">
      <div className="rail">
        <div className="rounded-hero overflow-hidden shadow-xl">
          <img src="/img/hero-home.jpg" alt="" width={1920} height={860} className="w-full h-auto block" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
