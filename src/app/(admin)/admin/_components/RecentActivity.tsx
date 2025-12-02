import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const activities = [
  {
    action: "Шинэ захиалга үүссэн",
    user: "Бат Болд",
    time: "1 цагийн өмнө",
    type: "booking",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    action: "Аяллын багц баталгаажсан",
    user: "Админ",
    time: "3 цагийн өмнө",
    type: "approval",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    action: "Төлбөр хүлээн авсан",
    user: "Сарнай Доржийн",
    time: "5 цагийн өмнө",
    type: "payment",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    action: "Шинэ компани бүртгэгдсэн",
    user: "Travel Plus LLC",
    time: "7 цагийн өмнө",
    type: "company",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

export const RecentActivity = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-600" />
          Сүүлийн үйл ажиллагаа
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="w-2 h-2 rounded-full bg-slate-400 mt-2" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900">{activity.action}</div>
                <div className="text-sm text-slate-500 mt-1">
                  {activity.user} • {activity.time}
                </div>
              </div>
              <Badge className={`${activity.color} border flex-shrink-0`}>{activity.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
