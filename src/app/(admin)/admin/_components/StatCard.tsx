import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: "red" | "blue" | "green" | "purple" | "yellow";
}

const colorConfig = {
  red: {
    icon: "text-red-600",
    bg: "bg-red-50",
  },
  blue: {
    icon: "text-blue-600",
    bg: "bg-blue-50",
  },
  purple: {
    icon: "text-purple-600",
    bg: "bg-purple-50",
  },
  green: {
    icon: "text-green-600",
    bg: "bg-green-50",
  },
  yellow: {
    icon: "text-yellow-600",
    bg: "bg-yellow-50",
  },
};

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "red" }: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <Card className="hover:shadow-sm transition-shadow border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-xl font-semibold text-gray-900 mb-0.5">{value}</p>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
