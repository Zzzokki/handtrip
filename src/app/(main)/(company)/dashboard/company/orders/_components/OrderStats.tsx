import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { ShoppingBag, CheckCircle, Clock, DollarSign, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "emerald" | "blue" | "amber" | "purple";
}

const colorConfig = {
  emerald: {
    icon: "from-emerald-500 to-emerald-600",
    bg: "from-emerald-50 to-emerald-100/50",
    border: "border-emerald-200/50",
  },
  blue: {
    icon: "from-blue-500 to-blue-600",
    bg: "from-blue-50 to-blue-100/50",
    border: "border-blue-200/50",
  },
  amber: {
    icon: "from-amber-500 to-amber-600",
    bg: "from-amber-50 to-amber-100/50",
    border: "border-amber-200/50",
  },
  purple: {
    icon: "from-purple-500 to-purple-600",
    bg: "from-purple-50 to-purple-100/50",
    border: "border-purple-200/50",
  },
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <Card className={`relative overflow-hidden border ${colors.border} bg-white hover:shadow-xl transition-all duration-300 group`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <CardHeader className="relative pb-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm font-semibold text-slate-600">{title}</CardDescription>
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
      </CardContent>
    </Card>
  );
};

interface OrderStatsProps {
  totalOrders: number;
  confirmedOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export const OrderStats = ({ totalOrders, confirmedOrders, pendingOrders, totalRevenue }: OrderStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <StatCard title="Нийт захиалга" value={totalOrders} icon={ShoppingBag} color="emerald" />
      <StatCard title="Баталгаажсан" value={confirmedOrders} icon={CheckCircle} color="blue" />
      <StatCard title="Хүлээгдэж буй" value={pendingOrders} icon={Clock} color="amber" />
      <StatCard title="Нийт орлого" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="purple" />
    </div>
  );
};
