import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: "blue" | "green" | "purple" | "yellow";
}

const colorConfig = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300",
    hoverText: "group-hover:text-blue-600",
  },
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-300",
    hoverText: "group-hover:text-green-600",
  },
  purple: {
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
    hoverText: "group-hover:text-purple-600",
  },
  yellow: {
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    hoverBorder: "hover:border-yellow-300",
    hoverText: "group-hover:text-yellow-600",
  },
};

export const QuickActionCard = ({ title, description, icon: Icon, href, color = "blue" }: QuickActionCardProps) => {
  const colors = colorConfig[color];

  return (
    <Link href={href}>
      <Card className={`border border-gray-200 hover:shadow-md ${colors.hoverBorder} transition-all duration-200 group cursor-pointer bg-white`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${colors.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-gray-900 text-sm mb-0.5 transition-colors ${colors.hoverText}`}>{title}</h3>
              <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>
            <ArrowRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-1 ${colors.hoverText}`} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
