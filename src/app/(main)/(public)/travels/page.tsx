"use client";

import { useGetTravelsQuery } from "@/types/generated";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pagination, TravelCard, TravelCardSkeleton, TravelFilter, TravelSearch } from "./_components";
import { Inbox } from "lucide-react";

export default function TravelsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);

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

  const { travels, totalPages } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1 };
    const { travels, totalPages } = data.getTravels;
    return { travels, totalPages };
  }, [data]);

  return (
    <div className="container mx-auto pb-8 pt-24">
      <div className="flex gap-4">
        <TravelFilter subCategoryIds={subCategoryIds} setSubCategoryIds={setSubCategoryIds} />

        <div className="flex-1 flex flex-col gap-4">
          <TravelSearch query={query} setQuery={setQuery} />

          {loading && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(15)].map((_, index) => (
                <TravelCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && travels.length === 0 && (
            <div className="border w-full flex flex-col items-center justify-center py-8 rounded-lg">
              <Inbox className="w-12 h-12 text-gray-400 mb-4" />
              <div className="text-gray-500">Аялал олдсонгүй</div>
            </div>
          )}

          {!loading && travels.length > 0 && (
            <div className="flex flex-col gap-8 items-end">
              <div className="grid grid-cols-3 gap-4">
                {travels.map((travel) => (
                  <TravelCard key={travel.id} travel={travel} />
                ))}
              </div>

              <Pagination totalPages={totalPages} page={page} setPage={setPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
