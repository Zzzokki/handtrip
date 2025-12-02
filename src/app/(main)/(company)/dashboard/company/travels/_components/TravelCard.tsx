import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Edit, Trash2, Users, Clock } from "lucide-react";

interface Travel {
  id: number;
  name: string;
  description: string;
  duration: number;
  coverImage?: string | null;
  totalSeatNumber: number;
  destination: {
    name: string;
  };
  travelSessions: any[];
}

interface TravelCardProps {
  travel: Travel;
}

export function TravelCard({ travel }: TravelCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-slate-200 bg-white hover:shadow-2xl hover:border-slate-300 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-56 overflow-hidden">
        {travel.coverImage ? (
          <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-500" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3">
          <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 border-0 shadow-lg font-bold px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            {travel.duration} өдөр
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3">
          <Badge className="bg-blue-500/95 backdrop-blur-sm text-white border-0 shadow-lg font-semibold px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {travel.travelSessions.length} сесс
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{travel.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-slate-600">{travel.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">{travel.destination.name}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium">{travel.totalSeatNumber} суудал</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-4 border-t border-slate-200">
          <Link href={`/dashboard/company/travels/${travel.id}/edit`} className="flex-1">
            <Button variant="outline" className="w-full border-slate-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-colors" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Засах
            </Button>
          </Link>
          <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 shadow-sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
