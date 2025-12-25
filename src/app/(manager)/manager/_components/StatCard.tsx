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
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </CardContent>
    </Card>
  );
};
