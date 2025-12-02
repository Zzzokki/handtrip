import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const recentUsers = [
  {
    name: "Бат Болд",
    email: "bat@example.com",
    type: "Аяллагч",
    typeColor: "bg-blue-100 text-blue-800 border-blue-200",
    time: "2 цагийн өмнө",
    avatar: "Б",
  },
  {
    name: "Сарнай Доржийн",
    email: "sarnai@example.com",
    type: "Аяллагч",
    typeColor: "bg-blue-100 text-blue-800 border-blue-200",
    time: "4 цагийн өмнө",
    avatar: "С",
  },
  {
    name: "Travel Plus LLC",
    email: "info@travelplus.mn",
    type: "Компани",
    typeColor: "bg-purple-100 text-purple-800 border-purple-200",
    time: "6 цагийн өмнө",
    avatar: "T",
  },
  {
    name: "Өлзий Баярын",
    email: "olzii@example.com",
    type: "Аяллагч",
    typeColor: "bg-blue-100 text-blue-800 border-blue-200",
    time: "8 цагийн өмнө",
    avatar: "Ө",
  },
];

export const RecentUsers = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-600" />
          Шинэ хэрэглэгчид
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentUsers.map((user, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 font-semibold shadow-sm">{user.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 truncate">{user.name}</div>
                <div className="text-sm text-slate-500 truncate">{user.email}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <Badge className={`${user.typeColor} border text-xs`}>{user.type}</Badge>
                <div className="text-xs text-slate-400">{user.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
