import { ShoppingBag } from "lucide-react";

interface OrdersHeaderProps {
  totalOrders: number;
}

export const OrdersHeader = ({ totalOrders }: OrdersHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <ShoppingBag className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Бүх захиалгууд</h1>
          <p className="text-slate-600">
            Платформ дахь бүх захиалгуудыг харах • <span className="font-semibold text-blue-600">{totalOrders} захиалга</span>
          </p>
        </div>
      </div>
    </div>
  );
};
