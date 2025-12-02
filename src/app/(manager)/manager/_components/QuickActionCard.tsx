import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: "indigo" | "blue" | "emerald" | "amber";
}

const colorConfig = {
  indigo: "from-indigo-500 to-purple-600",
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  amber: "from-amber-500 to-amber-600",
};

export const QuickActionCard = ({ title, description, icon: Icon, href, color = "indigo" }: QuickActionCardProps) => {
  return (
    <Link href={href}>
      <Card className="border-slate-200 hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorConfig[color]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{title}</h3>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
