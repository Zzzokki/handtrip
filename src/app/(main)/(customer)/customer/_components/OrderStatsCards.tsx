import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, Plane } from "lucide-react";

interface OrderStatsCardsProps {
  totalOrders: number;
  confirmedOrders: number;
  totalSpent: number;
}

export function OrderStatsCards({ totalOrders, confirmedOrders, totalSpent }: OrderStatsCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-3 mb-6">
      <Card className="border border-gray-200 bg-gray-50/50">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium text-gray-500">Нийт захиалга</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900 mt-1">{totalOrders}</CardTitle>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-700" />
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="border border-gray-200 bg-gray-50/50">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium text-gray-500">Баталгаажсан</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900 mt-1">{confirmedOrders}</CardTitle>
            </div>
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-700" />
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="border border-gray-200 bg-gray-50/50">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-xs font-medium text-gray-500">Нийт зарцуулсан</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900 mt-1">₮{totalSpent.toLocaleString()}</CardTitle>
            </div>
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-purple-700" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
