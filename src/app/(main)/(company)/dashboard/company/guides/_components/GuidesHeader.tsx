import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface GuidesHeaderProps {
  totalGuides: number;
}

export const GuidessHeader = ({ totalGuides }: GuidesHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mb-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Манай хөтөчүүд</h1>
          <p className="text-sm text-gray-600">{totalGuides} хөтөч бүртгэлтэй</p>
        </div>
      </div>

      <Link href="/dashboard/company/guides/create">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Шинэ хөтөч
        </Button>
      </Link>
    </div>
  );
};
