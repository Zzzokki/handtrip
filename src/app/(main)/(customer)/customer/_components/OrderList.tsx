import { OrderCard } from "./OrderCard";

interface OrderListProps {
  orders: Array<{
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
  }>;
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
