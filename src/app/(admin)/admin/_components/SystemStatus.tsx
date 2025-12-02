import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Database, HardDrive, Globe, CheckCircle2 } from "lucide-react";

const systems = [
  {
    name: "API",
    status: "Хэвийн",
    icon: Server,
    color: "emerald",
  },
  {
    name: "Өгөгдлийн сан",
    status: "Хэвийн",
    icon: Database,
    color: "emerald",
  },
  {
    name: "Хадгалалт",
    status: "78% чөлөөтэй",
    icon: HardDrive,
    color: "emerald",
  },
  {
    name: "CDN",
    status: "Идэвхтэй",
    icon: Globe,
    color: "emerald",
  },
];

export const SystemStatus = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Системийн төлөв байдал
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {systems.map((system, idx) => {
            const Icon = system.icon;
            return (
              <div key={idx} className="text-center p-4 rounded-lg bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">{system.name}</div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 border text-xs">{system.status}</Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
