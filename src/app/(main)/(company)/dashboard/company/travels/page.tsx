"use client";

import { useMemo, useState } from "react";
import { useGetTravelsByCompanyQuery } from "@/types/generated";
import { TravelCard, TravelsHeader, EmptyState, Pagination } from "./_components";

export default function CompanyTravelsPage() {
  const [page, setPage] = useState(1);

  const { data, loading } = useGetTravelsByCompanyQuery({
    variables: { input: { page } },
  });

  const { travels, totalPages } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1 };
    const { travels, totalPages } = data.getTravelsByCompany;
    return { travels, totalPages };
  }, [data]);

  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <TravelsHeader />

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travels.map((travel) => (
            <TravelCard key={travel.id} travel={travel} />
          ))}
        </div>
      )}

      {!loading && travels.length === 0 && <EmptyState />}

      <div className="w-full flex justify-center pt-8">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
