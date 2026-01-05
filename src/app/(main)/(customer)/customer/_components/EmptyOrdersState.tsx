import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export function EmptyOrdersState() {
  return (
    <Card className="max-w-md mx-auto border border-gray-200">
      <CardContent className="p-8 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Plane className="w-6 h-6 text-gray-400" />
        </div>
        <CardTitle className="text-base font-semibold mb-1.5">Захиалга байхгүй байна</CardTitle>
        <CardDescription className="text-sm mb-4">Анхны аялалаа эхлүүлээрэй</CardDescription>
        <Link href="/travels">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plane className="w-3.5 h-3.5 mr-1.5" />
            Аялал үзэх
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
