"use client";

import { useMemo, useState } from "react";
import { useGetTravelsByCompanyQuery } from "@/types/generated";
import { TravelCard, TravelsHeader, EmptyState, Pagination, LoadingSkeleton } from "./_components";

export default function CompanyTravelsPage() {
  const [page, setPage] = useState(1);

  const { data, loading } = useGetTravelsByCompanyQuery({
    variables: { input: { page } },
  });

  const { travels, totalPages, totalTravels } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1, totalTravels: 0 };
    const { travels, totalPages, totalTravels } = data.getTravelsByCompany;
    return { travels, totalPages, totalTravels };
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <TravelsHeader totalTravels={totalTravels} />

      {loading && <LoadingSkeleton />}

      {!loading && travels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {travels.map((travel) => (
            <TravelCard key={travel.id} travel={travel} />
          ))}
        </div>
      )}

      {!loading && travels.length === 0 && <EmptyState />}

      {!loading && totalPages > 1 && (
        <div className="w-full flex justify-center pt-8">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
