"use client";

import { useGetTravelsQuery } from "@/types/generated";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pagination, TravelCard, TravelCardSkeleton, TravelFilter } from "./_components";

export default function TravelsPage() {
  const [page, setPage] = useState(1);
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);

  const { data, loading } = useGetTravelsQuery({
    variables: {
      input: {
        page,
        limit: 15,
        filters: {},
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
        <TravelFilter />

        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(15)].map((_, index) => (
                <TravelCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && travels.length === 0 && <div>Аялал олдсонгүй.</div>}

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
