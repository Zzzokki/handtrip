import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Plane } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="w-12 h-12 mx-auto rounded-lg mb-2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Plane className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">Аяллын багц байхгүй байна</CardTitle>
        <CardDescription className="text-base mt-2">Анхны аяллын багцаа үүсгэж эхлээрэй</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Link href="/dashboard/company/travels/create">
          <Button className=" bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Анхны аяллаа үүсгэх
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
