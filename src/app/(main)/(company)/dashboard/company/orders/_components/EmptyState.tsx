import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-lg font-semibold mb-2">Захиалга байхгүй байна</CardTitle>
        <CardDescription className="text-sm">Үйлчлүүлэгчид таны аяллын багцуудыг захиалах үед энд харагдана</CardDescription>
      </CardContent>
    </Card>
  );
};
