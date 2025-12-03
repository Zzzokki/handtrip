import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2, Calendar } from "lucide-react";
import { Travel } from "@/types/generated";
import Image from "next/image";

type TravelCardProps = {
  travel: Travel;
};

export const TravelCard = ({ travel }: TravelCardProps) => {
  return (
    <Link href={`/travels/${travel.id}`}>
      <Card className="group overflow-hidden cursor-pointer h-full rounded-xl bg-white">
        <div className="relative h-64 overflow-hidden">
          <Image src={travel.coverImage!} alt={travel.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-900">{travel.duration} өдөр</span>
          </div>

          {travel.travelSessions && travel.travelSessions.length > 0 && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                <Calendar className="w-3.5 h-3.5" />
                <span>{travel.travelSessions.length} хуваарь</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{travel.name}</h3>

          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <span className="font-medium">{travel.destination.name}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{travel.description}</p>

          <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Дээд тал {travel.totalSeatNumber}</span>
            </div>
          </div>

          {travel.company && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm">
                <span className="font-semibold text-gray-900">{travel.company.name}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export const TravelCardSkeleton = () => {
  return (
    <Card className="animate-pulse overflow-hidden border-0 shadow-lg rounded-2xl bg-white h-full">
      <div className="h-64 bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-5 bg-slate-200 rounded w-1/2" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-10 bg-slate-200 rounded w-1/3" />
      </div>
    </Card>
  );
};
