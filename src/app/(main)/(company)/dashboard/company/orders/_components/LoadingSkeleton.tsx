export const LoadingSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl" />
          ))}
        </div>

        {/* Orders Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};
