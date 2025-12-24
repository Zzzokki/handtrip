export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="flex gap-3 py-2">
                <div className="h-8 bg-gray-200 rounded flex-1" />
                <div className="h-8 bg-gray-200 rounded w-16" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 bg-gray-200 rounded flex-1" />
                <div className="h-8 w-8 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
