import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  2: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

interface OrdersTableProps {
  orders: {
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
  }[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-50 hover:to-slate-100/50">
            <TableHead className="font-bold text-slate-900">Захиалга №</TableHead>
            <TableHead className="font-bold text-slate-900">Үйлчлүүлэгч</TableHead>
            <TableHead className="font-bold text-slate-900">Аяллын хугацаа</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Аялагчид</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Суудал</TableHead>
            <TableHead className="font-bold text-slate-900 text-right">Үнэ</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Төлөв</TableHead>
            <TableHead className="font-bold text-slate-900">Огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
            const StatusIcon = status.icon;

            return (
              <TableRow key={order.id} className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}>
                <TableCell className="font-semibold text-slate-900">#{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">
                      {order.customer.firstName} {order.customer.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-slate-700">{new Date(order.travelSession.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}</span>
                    <span className="text-slate-500">{new Date(order.travelSession.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-semibold text-sm">{order.travelers.length}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm">{order.totalSeats}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-bold text-slate-900">${order.totalPrice.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5 items-center">
                    <Badge className={`${status.color} border`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                    {order.payment.isPaid && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 border text-xs">
                        <CreditCard className="w-2.5 h-2.5 mr-1" />
                        Төлсөн
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
