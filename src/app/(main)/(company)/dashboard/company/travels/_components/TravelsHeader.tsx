import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Plane } from "lucide-react";

export const TravelsHeader = () => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Plane className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Миний аяллын багцууд</h1>
          <p className="text-slate-600">Аяллын багцууд болон сессүүдээ удирдах</p>
        </div>
      </div>

      <Link href="/dashboard/company/travels/create">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Аялал үүсгэх
        </Button>
      </Link>
    </div>
  );
};
