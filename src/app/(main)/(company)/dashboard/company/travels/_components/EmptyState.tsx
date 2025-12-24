import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Plane } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
        <Plane className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Аяллын багц байхгүй байна</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">Анхны аяллын багцаа үүсгэж хэрэглэгчдэд санал болгож эхлээрэй</p>
      <Link href="/dashboard/company/travels/create">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Анхны багц үүсгэх
        </Button>
      </Link>
    </div>
  );
};
