import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card className="w-full border-2 border-dashed border-slate-200">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-emerald-600" />
          </div>
          <CardTitle className="mb-2">Захиалга байхгүй байна</CardTitle>
          <CardDescription>Үйлчлүүлэгчид таны аяллын багцуудыг захиалах үед энд харагдана</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
