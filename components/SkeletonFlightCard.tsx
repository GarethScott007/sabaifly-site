export default function SkeletonFlightCard() {
  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between items-center animate-pulse">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-neutral-200 rounded"></div>
        <div className="h-3 w-48 bg-neutral-100 rounded"></div>
        <div className="h-3 w-32 bg-neutral-100 rounded"></div>
      </div>
      <div className="h-6 w-16 bg-neutral-200 rounded"></div>
    </div>
  );
}
