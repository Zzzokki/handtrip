import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useGetOrdersQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-amber-100 text-amber-800 border-amber-200" },
  1: { label: "Баталгаажсан", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  2: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800 border-red-200" },
};

const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) return `${diffInMinutes} минутын өмнө`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} цагийн өмнө`;
  return `${Math.floor(diffInMinutes / 1440)} өдрийн өмнө`;
};

export const RecentActivity = () => {
  const { data, loading } = useGetOrdersQuery();

  if (loading) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            Сүүлийн үйл ажиллагаа
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const orders = (data?.getOrders || []).slice(0, 5);

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-600" />
          Сүүлийн үйл ажиллагаа
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => {
            const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
            return (
              <div key={order.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-2 h-2 rounded-full bg-slate-400 mt-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    Захиалга #{order.id} - {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ₮{order.totalPrice.toLocaleString()} • {order.totalSeats} суудал
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={`${status.color} border text-xs`}>{status.label}</Badge>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{getTimeAgo(order.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
