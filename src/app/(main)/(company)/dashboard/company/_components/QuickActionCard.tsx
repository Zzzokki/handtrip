import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  gradient?: string;
  iconBg?: string;
}

export default function QuickActionCard({
  title,
  description,
  primaryAction,
  secondaryAction,
  gradient = "from-blue-500 to-purple-600",
  iconBg = "from-blue-500 to-purple-600",
}: QuickActionCardProps) {
  const PrimaryIcon = primaryAction?.icon;

  return (
    <Card className="relative border border-slate-200 bg-white hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group overflow-hidden">
      {/* Animated gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

      {/* Top accent border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <CardHeader className="relative pb-3">
        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${gradient} transition-all">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {secondaryAction && (
          <Link href={secondaryAction.href}>
            <Button variant="outline" className="w-full justify-between border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group/btn">
              <span className="font-medium">{secondaryAction.label}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}

        {primaryAction && (
          <Link href={primaryAction.href}>
            <Button className={`w-full justify-between bg-gradient-to-r ${iconBg} hover:shadow-lg hover:scale-[1.02] transition-all group/btn`}>
              <span className="flex items-center font-semibold">
                {PrimaryIcon && <PrimaryIcon className="w-4 h-4 mr-2" />}
                {primaryAction.label}
              </span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
