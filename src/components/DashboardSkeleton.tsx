export function DashboardSkeleton() {
  return (
    <div className="space-y-12">
      <div className="card bg-base-100 border border-base-300/60 rounded-2xl">
        <div className="card-body gap-4">
          <div className="skeleton h-6 w-48" />
          <div className="skeleton h-4 w-full max-w-md" />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="skeleton h-40 w-full" />
            <div className="skeleton h-64 w-full rounded-full max-w-[260px] mx-auto" />
          </div>
        </div>
      </div>
      <div>
        <div className="skeleton h-4 w-24 mb-4" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
      <div>
        <div className="skeleton h-4 w-20 mb-4" />
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-72 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
