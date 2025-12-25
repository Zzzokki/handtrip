"use client";

import { CompaniesHeader, CompaniesTable } from "./_components";
import { useGetCompaniesQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerCompaniesPage() {
  const { data, loading, error } = useGetCompaniesQuery();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 w-full">
        <div className="mb-6">
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8 w-full">
        <div className="text-center py-12">
          <p className="text-red-600">Алдаа гарлаа: {error.message}</p>
        </div>
      </div>
    );
  }

  const companies = data?.getCompanies || [];

  return (
    <div className="max-w-6xl mx-auto py-8 w-full">
      <CompaniesHeader totalCompanies={companies.length} />
      <CompaniesTable companies={companies} />
    </div>
  );
}
