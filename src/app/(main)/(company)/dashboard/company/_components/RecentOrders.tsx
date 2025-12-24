"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, Users, MapPin, Calendar, Clock } from "lucide-react";
import { Order, useGetTravelQuery } from "@/types/generated";
import Link from "next/link";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "text-yellow-600 bg-yellow-50" },
  1: { label: "Баталгаажсан", color: "text-green-600 bg-green-50" },
  2: { label: "Цуцалсан", color: "text-red-600 bg-red-50" },
};

interface RecentOrdersProps {
  orders: Order[];
}

export const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const router = useRouter();

  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-bold text-gray-900">Сүүлийн захиалгууд</h2>
        <p className="text-sm text-gray-600 mt-0.5">Таны сүүлийн 5 захиалга</p>
      </div>

      {recentOrders.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {recentOrders.map((order) => (
            <RecentOrder key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">Захиалга байхгүй байна</p>
          <p className="text-sm text-gray-500 mt-1">Таны эхний захиалга энд харагдана</p>
        </div>
      )}
    </div>
  );
};

type RecentOrderProps = {
  order: Order;
};

const RecentOrder = ({ order }: RecentOrderProps) => {
  const { travelId } = order.travelSession;

  const { data } = useGetTravelQuery({
    variables: { getTravelId: travelId },
  });

  const travel = data?.getTravel;

  return (
    <Link href={`/manager/orders/${order.id}`}>
      <div className="p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 cursor-pointer group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{travel?.name}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS].color}`}>
                {ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS].label}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  {order.customer.firstName} {order.customer.lastName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                <span>{travel?.destination.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-green-600" />
                <span>{new Date(order.travelSession.startDate).toLocaleDateString("mn-MN")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>
                  Захиалсан{" "}
                  {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold text-gray-900">₮{order.totalPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-0.5">{order.totalSeats} суудал</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
