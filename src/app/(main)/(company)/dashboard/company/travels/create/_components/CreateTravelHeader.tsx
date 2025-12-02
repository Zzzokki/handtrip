import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";

export const CreateTravelHeader = () => {
  return (
    <div className="mb-8 space-y-4">
      <Link href="/dashboard/company/travels">
        <Button variant="outline" className="mb-4 hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Буцах
        </Button>
      </Link>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <PlusCircle className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Шинэ аяллын багц үүсгэх</h1>
          <p className="text-slate-600">Шинэ аяллын багцын мэдээллийг бөглөнө үү</p>
        </div>
      </div>
    </div>
  );
};
