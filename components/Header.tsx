export default function Header() {
  return (
    <header className="bg-brand text-white">
      <div className="rail h-18 flex items-center justify-between">
        <a href="/" className="font-semibold">SabaiFly</a>
        <nav className="flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/flights/" className="hover:underline">Flights</a>
          <a href="/hotels/" className="hover:underline">Hotels (partner)</a>
        </nav>
      </div>
    </header>
  );
}
