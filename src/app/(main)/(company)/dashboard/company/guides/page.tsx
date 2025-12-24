"use client";

import { useMemo } from "react";
import { useGetGuidesByCompanyQuery, useDeleteGuideMutation } from "@/types/generated";
import { GuidessHeader, GuidesTable, LoadingSkeleton } from "./_components";
import { toast } from "sonner";

export default function CompanyGuidesPage() {
  const { data, loading, refetch } = useGetGuidesByCompanyQuery({
    onError: (error) =>
      toast.error(`Хөтөчүүдийг авахад алдаа гарлаа`, {
        description: error.message,
      }),
  });

  const [deleteGuide] = useDeleteGuideMutation({
    onCompleted: () => {
      toast.success("Хөтчийг амжилттай устгалаа");
      refetch();
    },
    onError: (error) => {
      toast.error("Хөтчийг устгахад алдаа гарлаа", {
        description: error.message,
      });
    },
  });

  const guides = useMemo(() => {
    if (!data) return [];
    return data.getGuidesByCompany;
  }, [data]);

  const handleDelete = async (id: number) => {
    await deleteGuide({ variables: { deleteGuideId: id } });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <GuidessHeader totalGuides={0} />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <GuidessHeader totalGuides={guides.length} />

      <GuidesTable guides={guides} onDelete={handleDelete} />
    </div>
  );
}
