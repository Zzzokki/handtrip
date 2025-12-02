import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, DollarSign, CheckCircle, Clock, XCircle, Users, CreditCard, ShoppingBag } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  2: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

interface OrderCardProps {
  order: {
    id: number;
    orderStatus: number;
    totalPrice: number;
    totalSeats: number;
    createdAt: string;
    customer: {
      firstName: string;
      lastName: string;
    };
    travelSession: {
      startDate: string;
      endDate: string;
    };
    travelers: any[];
    payment: {
      isPaid: boolean;
    };
  };
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
  const StatusIcon = status.icon;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 bg-white group">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Захиалга #{order.id}</h3>
                <p className="text-xs text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={`${status.color} border`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              {order.payment.isPaid && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Төлсөн
                </Badge>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Үйлчлүүлэгч</p>
                <p className="text-sm font-semibold text-slate-900">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Аяллын хугацаа</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(order.travelSession.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })} -{" "}
                  {new Date(order.travelSession.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Нийт үнэ</p>
                <p className="text-sm font-semibold text-slate-900">
                  ${order.totalPrice.toLocaleString()} <span className="text-xs text-slate-500">({order.totalSeats} суудал)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Аялагчид</p>
                <p className="text-sm font-semibold text-slate-900">{order.travelers.length} хүн</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
