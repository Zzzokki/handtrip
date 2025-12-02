import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

export const GuidessHeader = () => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Манай хөтчүүд</h1>
          <p className="text-slate-600">Хөтчүүдийн мэдээлэл болон удирдлага</p>
        </div>
      </div>

      <Link href="/dashboard/company/guides/create">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Хөтчийг нэмэх
        </Button>
      </Link>
    </div>
  );
};
