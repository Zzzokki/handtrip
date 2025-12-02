export function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-8 bg-slate-200 rounded w-64" />
              <div className="h-4 bg-slate-200 rounded w-48" />
            </div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-40" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="h-56 bg-slate-200" />
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-slate-200 rounded" />
                  <div className="h-8 bg-slate-200 rounded" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-9 bg-slate-200 rounded flex-1" />
                  <div className="h-9 w-9 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
