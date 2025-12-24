import { ShoppingBag } from "lucide-react";

interface OrdersHeaderProps {
  totalOrders: number;
}

export const OrdersHeader = ({ totalOrders }: OrdersHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Захиалгууд</h1>
          <p className="text-sm text-gray-500">
            Нийт <span className="font-semibold text-gray-900">{totalOrders}</span> захиалга
          </p>
        </div>
      </div>
    </div>
  );
};
