import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

interface Order {
  id: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  totalSeats: number;
  totalPrice: number;
  payment: {
    isPaid: boolean;
  };
  createdAt: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) return null;

  return (
    <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">Сүүлийн захиалгууд</CardTitle>
            <CardDescription className="mt-1.5 text-slate-600">Хамгийн сүүлд ирсэн захиалгууд</CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm px-3 py-1">{orders.length} захиалга</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {orders.slice(0, 5).map((order, index) => (
            <div
              key={order.id}
              className="group relative p-5 bg-white hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 rounded-xl transition-all duration-300 border border-slate-200 hover:border-blue-200 hover:shadow-md"
            >
              {/* Order number badge */}
              <div className="absolute -top-2 -right-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-white">#{index + 1}</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Customer info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order details */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg">
                      <span className="font-bold text-slate-700">{order.totalSeats}</span>
                      <span className="text-slate-600">суудал</span>
                    </div>
                    <div className="font-bold text-blue-600 text-lg">${order.totalPrice.toLocaleString()}</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={`${
                      order.payment.isPaid ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0" : "bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0"
                    } shadow-sm px-3 py-1 font-semibold`}
                  >
                    {order.payment.isPaid ? "✓ Төлсөн" : "⏱ Хүлээгдэж буй"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
