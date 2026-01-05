import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "yellow" | "red";
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
  purple: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
  },
  yellow: {
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    hoverBorder: "hover:border-yellow-300",
  },
  red: {
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    hoverBorder: "hover:border-red-300",
  },
};

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }: StatCardProps) => {
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
          <div className={`p-2 rounded-lg ${colors.iconBg}`}>
            <Icon className={`w-4 h-4 ${colors.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
