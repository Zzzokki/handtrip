import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Eye, CheckCircle, Clock, XCircle, Plane, CreditCard, ArrowRight, MapPin } from "lucide-react";

const ORDER_STATUS = {
  0: {
    label: "Хүлээгдэж буй",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    dotColor: "bg-amber-500",
  },
  1: {
    label: "Баталгаажсан",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    dotColor: "bg-emerald-500",
  },
  2: {
    label: "Цуцалсан",
    badge: "bg-gray-50 text-gray-600 border-gray-200",
    icon: XCircle,
    dotColor: "bg-gray-400",
  },
} as const;

interface OrderCardProps {
  order: {
    id: number;
    createdAt: any;
    orderStatus: number;
    totalPrice: number;
    totalSeats: number;
    payment: {
      isPaid: boolean;
    };
    travelSession: {
      startDate: any;
      endDate: any;
    };
    travelers: Array<any>;
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];

  // Fallback for invalid status
  if (!status) {
    console.error(`Invalid order status: ${order.orderStatus}`);
    return null;
  }

  // Memoize date formatting to avoid recalculating
  const createdDate = new Date(order.createdAt).toLocaleDateString("mn-MN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startDate = new Date(order.travelSession.startDate).toLocaleDateString("mn-MN", {
    month: "short",
    day: "numeric",
  });

  const endDate = new Date(order.travelSession.endDate).toLocaleDateString("mn-MN", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-200 group">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center ring-1 ring-blue-100">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">Захиалга #{order.id}</h3>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{createdDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className={`${status.badge} text-xs px-2.5 py-1 font-medium border`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} mr-1.5`} />
                {status.label}
              </Badge>
              {order.payment.isPaid ? (
                <Badge className="bg-blue-600 text-white text-xs px-2.5 py-1 font-medium border-0">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Төлсөн
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-orange-200 bg-orange-50 text-orange-700 font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  Төлөөгүй
                </Badge>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Огноо</p>
                  <p className="font-medium text-gray-900 whitespace-nowrap">
                    {startDate} - {endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Аялагч</p>
                  <p className="font-medium text-gray-900">{order.travelers.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Дүн</p>
                  <p className="font-semibold text-gray-900">₮{order.totalPrice.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide">Суудал</p>
                  <p className="font-medium text-gray-900">{order.totalSeats}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex lg:flex-col gap-2 lg:items-end">
            <Link href={`/customer/orders/${order.id}`} className="flex-1 lg:flex-none">
              <Button variant="outline" size="sm" className="w-full lg:w-auto text-xs hover:bg-gray-50 border-gray-200 group-hover:border-blue-200 transition-colors">
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Дэлгэрэнгүй
                <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            {order.orderStatus === 0 && !order.payment.isPaid && (
              <Link href={`/orders/payment?orderId=${order.id}`} className="flex-1 lg:flex-none">
                <Button size="sm" className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-xs shadow-sm">
                  <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                  Төлбөр төлөх
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
