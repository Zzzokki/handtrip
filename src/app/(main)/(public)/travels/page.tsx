"use client";

import { useGetTravelsQuery } from "@/types/generated";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TravelCard, TravelCardSkeleton, TravelFilter } from "./_components";

export default function TravelsPage() {
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);

  const { data, loading } = useGetTravelsQuery({
    variables: {
      input: {
        filters: {},
      },
    },
    onError: (error) =>
      toast.error(`Аялал авахад алдаа гарлаа`, {
        description: error.message,
      }),
  });

  const { travels } = useMemo(() => {
    if (!data) return { travels: [] };
    const { travels } = data.getTravels;
    return { travels };
  }, [data]);

  return (
    <div className="container mx-auto pb-8 pt-24">
      <div className="flex gap-4">
        <TravelFilter />

        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-3 gap-4">
              {[...Array(16)].map((_, index) => (
                <TravelCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && travels.length === 0 && <div>Аялал олдсонгүй.</div>}

          {!loading && travels.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {travels.map((travel) => (
                <TravelCard key={travel.id} travel={travel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
