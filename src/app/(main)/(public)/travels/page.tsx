"use client";

import { useGetTravelsQuery } from "@/types/generated";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Pagination, TravelCard, TravelCardSkeleton, TravelFilter, TravelSearch } from "./_components";
import { Inbox } from "lucide-react";

export default function TravelsPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);

  // Initialize query from URL search params
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const { data, loading } = useGetTravelsQuery({
    variables: {
      input: {
        page,
        limit: 15,
        filters: {
          query: query.length > 0 ? query : undefined,
          subCategoryIds: subCategoryIds.length > 0 ? subCategoryIds : undefined,
        },
      },
    },
    onError: (error) =>
      toast.error(`Аялал авахад алдаа гарлаа`, {
        description: error.message,
      }),
  });

  // Debug: Log when filters change
  useEffect(() => {
    console.log("Filter state changed:", {
      page,
      query,
      subCategoryIds,
      subCategoryIdsLength: subCategoryIds.length,
    });
  }, [page, query, subCategoryIds]);

  const { travels, totalPages, totalTravels } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1, totalTravels: 0 };
    const { travels, totalPages, totalTravels } = data.getTravels;
    return { travels, totalPages, totalTravels };
  }, [data]);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 pb-12 pt-20">
        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <TravelFilter subCategoryIds={subCategoryIds} setSubCategoryIds={setSubCategoryIds} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <TravelSearch query={query} setQuery={setQuery} />
            </div>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(15)].map((_, index) => (
                  <TravelCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!loading && travels.length === 0 && (
              <div className="bg-white border border-gray-200 shadow-sm w-full flex flex-col items-center justify-center py-16 rounded-xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Аялал олдсонгүй</h3>
                <p className="text-sm text-gray-500">Өөр хайлтын үг оруулж үзнэ үү</p>
              </div>
            )}

            {!loading && travels.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Нийт <span className="font-semibold text-gray-900">{totalTravels}</span> аялал олдлоо
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {travels.map((travel) => (
                    <TravelCard key={travel.id} travel={travel} />
                  ))}
                </div>

                <div className="flex justify-center pt-4">
                  <Pagination totalPages={totalPages} page={page} setPage={setPage} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
