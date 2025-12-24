import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { ShoppingBag, CheckCircle, Clock, DollarSign, LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "purple";
}

const colorConfig = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-300",
  },
  yellow: {
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    hoverBorder: "hover:border-yellow-300",
  },
  purple: {
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
  },
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <Card className={`border border-gray-200 shadow-sm hover:shadow-md ${colors.hoverBorder} transition-all duration-200 bg-white`}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</CardDescription>
          <div className={`w-9 h-9 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${colors.iconColor}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <StatCard title="Нийт захиалга" value={totalOrders} icon={ShoppingBag} color="blue" />
      <StatCard title="Баталгаажсан" value={confirmedOrders} icon={CheckCircle} color="green" />
      <StatCard title="Хүлээгдэж буй" value={pendingOrders} icon={Clock} color="yellow" />
      <StatCard title="Нийт орлого" value={`₮${totalRevenue.toLocaleString()}`} icon={DollarSign} color="purple" />
    </div>
  );
};
