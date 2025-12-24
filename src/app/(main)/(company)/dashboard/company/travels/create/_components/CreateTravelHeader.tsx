import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";

export const CreateTravelHeader = () => {
  return (
    <div className="mb-6 space-y-3">
      <Link href="/dashboard/company/travels">
        <Button variant="ghost" size="sm" className="hover:bg-gray-100 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Буцах
        </Button>
      </Link>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Шинэ аяллын багц үүсгэх</h1>
          <p className="text-sm text-gray-600">Шинэ аяллын багцын мэдээллийг бөглөнө үү</p>
        </div>
      </div>
    </div>
  );
};
