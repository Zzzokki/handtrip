import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-green-100 text-green-800", icon: CheckCircle },
  2: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800", icon: XCircle },
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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-900 h-10">Захиалга</TableHead>
            <TableHead className="font-semibold text-gray-900 h-10">Үйлчлүүлэгч</TableHead>
            <TableHead className="font-semibold text-gray-900 h-10">Огноо</TableHead>
            <TableHead className="font-semibold text-gray-900 text-center h-10">Аялагч</TableHead>
            <TableHead className="font-semibold text-gray-900 text-center h-10">Суудал</TableHead>
            <TableHead className="font-semibold text-gray-900 text-right h-10">Үнэ</TableHead>
            <TableHead className="font-semibold text-gray-900 text-center h-10">Төлөв</TableHead>
            <TableHead className="font-semibold text-gray-900 h-10">Үүссэн</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
            const StatusIcon = status.icon;

            return (
              <TableRow key={order.id} className="hover:bg-gray-50 transition-colors h-14">
                <TableCell className="font-semibold text-gray-900 py-2">#{order.id}</TableCell>
                <TableCell className="py-2">
                  <span className="font-medium text-gray-900 text-sm">
                    {order.customer.firstName} {order.customer.lastName}
                  </span>
                </TableCell>
                <TableCell className="py-2">
                  <div className="text-xs text-gray-700">
                    {new Date(order.travelSession.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                    {new Date(order.travelSession.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </TableCell>
                <TableCell className="text-center py-2">
                  <span className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 rounded bg-purple-50 text-purple-700 font-medium text-xs">{order.travelers.length}</span>
                </TableCell>
                <TableCell className="text-center py-2">
                  <span className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 rounded bg-blue-50 text-blue-700 font-medium text-xs">{order.totalSeats}</span>
                </TableCell>
                <TableCell className="text-right py-2">
                  <span className="font-semibold text-gray-900 text-sm">₮{order.totalPrice.toLocaleString()}</span>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col gap-1 items-center">
                    <Badge className={`${status.color} text-xs px-2 py-0 font-medium`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                    {order.payment.isPaid && (
                      <Badge className="bg-blue-600 text-white text-xs px-2 py-0 font-medium">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Төлсөн
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600 py-2">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
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
