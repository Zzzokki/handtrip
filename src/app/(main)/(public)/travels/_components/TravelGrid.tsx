import { Button } from "@/components/ui/button";
import { TravelCard } from "./TravelCard";
import { Card } from "@/components/ui/card";

interface Travel {
  id: number;
  name: string;
  description: string;
  duration: number;
  coverImage?: string | null;
  totalSeatNumber: number;
  destination?: {
    id: number;
    name: string;
  } | null;
  company?: {
    id: number;
    name: string;
  } | null;
  categories?: Array<{
    id: number;
    name: string;
  }> | null;
  travelSessions?: Array<{
    id: number;
  }> | null;
}

interface TravelGridProps {
  travels: Travel[];
  loading: boolean;
  error?: any;
  sortBy: "name" | "duration";
  onSortChange: (value: "name" | "duration") => void;
  page: number;
  totalPages: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  totalCount: number;
  filteredCount: number;
}

export function TravelGrid({ travels, loading, error, sortBy, onSortChange, page, totalPages, hasMore, onPageChange, totalCount, filteredCount }: TravelGridProps) {
  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden border-0 shadow-lg rounded-2xl">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Аяллыг ачаалж чадсангүй</h3>
          <p className="text-red-700">{error.message || "Дахин оролдоно уу."}</p>
        </div>
      </div>
    );
  }

  if (travels.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-12 max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Аялал олдсонгүй</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">Хайлт болон шүүлтүүрээ өөрчилж үзнэ үү</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Sort and Count */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Аяллын багцууд</h2>
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{totalCount}</span> аялал олдлоо
            {filteredCount !== totalCount && <span className="text-sm"> (үзүүлж байгаа: {filteredCount})</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Эрэмбэлэх:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "name" | "duration")}
            className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors"
          >
            <option value="name">Нэр</option>
            <option value="duration">Үргэлжлэх хугацаа</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {travels.map((travel) => (
          <TravelCard key={travel.id} travel={travel} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12 pt-8 border-t">
          <Button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            variant="outline"
            size="lg"
            className="rounded-xl font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Өмнөх
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={i}
                  onClick={() => onPageChange(pageNum)}
                  variant={page === pageNum ? "default" : "outline"}
                  size="lg"
                  className={`min-w-[48px] rounded-xl font-semibold transition-all ${
                    page === pageNum ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasMore}
            variant="outline"
            size="lg"
            className="rounded-xl font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Дараах
          </Button>

          <span className="text-sm text-gray-600 ml-2">
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
