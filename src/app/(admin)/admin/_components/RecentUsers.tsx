import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useGetCustomersQuery } from "@/types/generated";
import { Skeleton } from "@/components/ui/skeleton";

const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) return `${diffInMinutes} минутын өмнө`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} цагийн өмнө`;
  return `${Math.floor(diffInMinutes / 1440)} өдрийн өмнө`;
};

export const RecentUsers = () => {
  const { data, loading } = useGetCustomersQuery();

  if (loading) {
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
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const customers = (data?.getCustomers || []).slice(0, 5);

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
          {customers.map((customer) => {
            const avatar = customer.firstName.charAt(0).toUpperCase();
            return (
              <div key={customer.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">{avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 border text-xs">Аяллагч</Badge>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{getTimeAgo(customer.createdAt)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
