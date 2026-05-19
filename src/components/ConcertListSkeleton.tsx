export function ConcertListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card bg-base-100 border border-base-300/60 rounded-2xl">
          <div className="card-body gap-4">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-20 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
