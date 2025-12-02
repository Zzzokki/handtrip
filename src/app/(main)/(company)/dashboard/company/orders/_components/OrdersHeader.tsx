import { ShoppingBag } from "lucide-react";

interface OrdersHeaderProps {
  totalOrders: number;
}

export const OrdersHeader = ({ totalOrders }: OrdersHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Захиалгууд</h1>
          <p className="text-slate-600">
            Аяллын багцуудын бүх захиалгыг харах, удирдах • <span className="font-semibold text-emerald-600">{totalOrders} захиалга</span>
          </p>
        </div>
      </div>
    </div>
  );
};
