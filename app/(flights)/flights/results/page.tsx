import type { Metadata } from "next";

export const metadata: Metadata = { title: "Flight results — SabaiFly" };

export default function ResultsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return (
    <main className="section">
      <div className="rail">
        <h1 className="mb-2">Flight results</h1>
        <p className="text-muted break-words">
          Query: {Object.entries(searchParams).map(([k, v]) => `${k}=${encodeURIComponent(String(v ?? ""))}`).join("&")}
        </p>
        <div className="border border-br rounded-xl p-4 min-h-[200px]">Results go here…</div>
      </div>
    </main>
  );
}
