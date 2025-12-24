import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Edit, Trash2, Users, Clock } from "lucide-react";
import Image from "next/image";
import { GetTravelsByCompanyQuery } from "@/types/generated";

interface TravelCardProps {
  travel: GetTravelsByCompanyQuery["getTravelsByCompany"]["travels"][number];
}

export function TravelCard({ travel }: TravelCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-48 overflow-hidden">
        <Image src={travel.coverImage!} alt={travel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-2.5 right-2.5 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-md font-semibold px-2.5 py-1 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {travel.duration}ө
          </Badge>
          <Badge className="bg-indigo-500/90 backdrop-blur-sm text-white border-0 shadow-md font-semibold px-2.5 py-1 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {travel.travelSessions.length}
          </Badge>
        </div>

        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <h3 className="text-white font-bold text-lg line-clamp-1 drop-shadow-lg">{travel.name}</h3>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{travel.description}</p>

        <div className="flex gap-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-blue-50 px-2.5 py-1.5 rounded-lg flex-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="font-medium truncate">{travel.destination.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-purple-50 px-2.5 py-1.5 rounded-lg">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span className="font-medium">{travel.totalSeatNumber}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Link href={`/dashboard/company/travels/${travel.id}/edit`} className="flex-1">
            <Button variant="outline" className="w-full border-gray-300 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all" size="sm">
              <Edit className="w-3.5 h-3.5 mr-1.5" />
              Засах
            </Button>
          </Link>
          <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 px-3">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
