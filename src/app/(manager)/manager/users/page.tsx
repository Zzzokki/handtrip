"use client";

import { UsersHeader, UsersTable } from "./_components";
import { useGetCustomersQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerUsersPage() {
  const { data, loading, error } = useGetCustomersQuery();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">Алдаа гарлаа: {error.message}</div>
      </div>
    );
  }

  const users = data?.getCustomers || [];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <UsersHeader totalUsers={users.length} />
      <UsersTable users={users} />
    </div>
  );
}
