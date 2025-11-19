import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2, Calendar } from "lucide-react";

interface Travel {
  id: number;
  name: string;
  description: string;
  duration: number;
  coverImage?: string | null;
  totalSeatNumber: number;
  destination?: {
    id: number;
    name: string;
  } | null;
  company?: {
    id: number;
    name: string;
  } | null;
  categories?: Array<{
    id: number;
    name: string;
  }> | null;
  travelSessions?: Array<{
    id: number;
  }> | null;
}

interface TravelCardProps {
  travel: Travel;
}

export function TravelCard({ travel }: TravelCardProps) {
  return (
    <Link href={`/travels/${travel.id}`}>
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full rounded-2xl bg-white">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {travel.coverImage ? (
            <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">{travel.duration} өдөр</span>
          </div>

          {/* Category Badge */}
          {travel.categories && travel.categories.length > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg backdrop-blur-sm">{travel.categories[0].name}</span>
            </div>
          )}

          {/* Sessions indicator */}
          {travel.travelSessions && travel.travelSessions.length > 0 && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                <Calendar className="w-3.5 h-3.5" />
                <span>{travel.travelSessions.length} сесс</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{travel.name}</h3>

          {/* Destination */}
          {travel.destination && (
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">{travel.destination.name}</span>
            </div>
          )}

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{travel.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Дээд тал {travel.totalSeatNumber}</span>
            </div>
          </div>

          {/* Company */}
          {travel.company && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm">
                <span className="font-semibold text-gray-900">{travel.company.name}</span>
                <span className="text-gray-500">-аас</span>
              </p>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      </Card>
    </Link>
  );
}
