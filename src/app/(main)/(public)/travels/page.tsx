"use client";

import { useGetTravelsQuery } from "@/types/generated";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Pagination, TravelCard, TravelCardSkeleton, TravelFilter, TravelSearch } from "./_components";
import { Inbox, MapPin } from "lucide-react";

export default function TravelsPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

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
          minPrice: minPrice,
          maxPrice: maxPrice,
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
      minPrice,
      maxPrice,
    });
  }, [page, query, subCategoryIds, minPrice, maxPrice]);

  const { travels, totalPages, totalTravels } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1, totalTravels: 0 };
    const { travels, totalPages, totalTravels } = data.getTravels;
    return { travels, totalPages, totalTravels };
  }, [data]);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 pb-8 pt-16">
        <div className="flex gap-5">
          <div className="w-72 flex-shrink-0">
            <TravelFilter subCategoryIds={subCategoryIds} setSubCategoryIds={setSubCategoryIds} minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-4">
              <TravelSearch query={query} setQuery={setQuery} />
            </div>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(15)].map((_, index) => (
                  <TravelCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!loading && travels.length === 0 && (
              <div className="bg-white border border-gray-200 shadow-sm w-full flex flex-col items-center justify-center py-12 rounded-lg">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Inbox className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Аялал олдсонгүй</h3>
                <p className="text-sm text-gray-500">Өөр хайлтын үг оруулж үзнэ үү</p>
              </div>
            )}

            {!loading && travels.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50/50 border border-blue-100">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <p className="text-xs text-gray-600">
                    Нийт <span className="font-semibold text-blue-600">{totalTravels}</span> аялал
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {travels.map((travel) => (
                    <TravelCard key={travel.id} travel={travel} />
                  ))}
                </div>

                <div className="flex justify-center pt-2">
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
