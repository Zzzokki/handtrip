import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: "red" | "blue" | "emerald" | "purple" | "amber" | "indigo";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorConfig = {
  red: {
    icon: "from-red-500 to-rose-600",
    bg: "from-red-50 to-rose-100/50",
    text: "text-red-600",
    border: "border-red-200/50",
  },
  blue: {
    icon: "from-blue-500 to-blue-600",
    bg: "from-blue-50 to-blue-100/50",
    text: "text-blue-600",
    border: "border-blue-200/50",
  },
  purple: {
    icon: "from-purple-500 to-purple-600",
    bg: "from-purple-50 to-purple-100/50",
    text: "text-purple-600",
    border: "border-purple-200/50",
  },
  emerald: {
    icon: "from-emerald-500 to-emerald-600",
    bg: "from-emerald-50 to-emerald-100/50",
    text: "text-emerald-600",
    border: "border-emerald-200/50",
  },
  amber: {
    icon: "from-amber-500 to-amber-600",
    bg: "from-amber-50 to-amber-100/50",
    text: "text-amber-600",
    border: "border-amber-200/50",
  },
  indigo: {
    icon: "from-indigo-500 to-indigo-600",
    bg: "from-indigo-50 to-indigo-100/50",
    text: "text-indigo-600",
    border: "border-indigo-200/50",
  },
};

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "red", trend }: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <Card className={`relative overflow-hidden border ${colors.border} bg-white hover:shadow-xl transition-all duration-300 group`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <CardHeader className="relative flex flex-row items-center justify-between pb-3">
        <CardDescription className="text-sm font-semibold text-slate-600">{title}</CardDescription>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500">{subtitle}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
