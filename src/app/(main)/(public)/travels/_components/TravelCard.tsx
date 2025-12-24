import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2, Calendar } from "lucide-react";
import { Travel } from "@/types/generated";
import Image from "next/image";

type TravelCardProps = {
  travel: Travel;
};

export const TravelCard = ({ travel }: TravelCardProps) => {
  // Calculate total available seats across all sessions
  const totalAvailableSeats =
    travel.travelSessions?.reduce((total, session) => {
      const availableInSession = session.seats?.filter((s) => s.status === "available").length || 0;
      return total + availableInSession;
    }, 0) || 0;

  return (
    <Link href={`/travels/${travel.id}`}>
      <Card className="group overflow-hidden cursor-pointer h-full hover:shadow-xl transition-all duration-300 border-gray-200 bg-white">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image src={travel.coverImage!} alt={travel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

          {/* Duration Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-900">{travel.duration} өдөр</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {travel.travelSessions && travel.travelSessions.length > 0 && (
              <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-md font-semibold shadow-lg">
                <Calendar className="w-3 h-3" />
                <span>{travel.travelSessions.length} хуваарь</span>
              </div>
            )}
            {totalAvailableSeats > 0 && (
              <div className="flex items-center gap-1.5 bg-blue-500 text-white text-xs px-2.5 py-1 rounded-md font-semibold shadow-lg">
                <Users className="w-3 h-3" />
                <span>{totalAvailableSeats} суудал</span>
              </div>
            )}
            {totalAvailableSeats === 0 && (
              <div className="flex items-center gap-1.5 bg-rose-500 text-white text-xs px-2.5 py-1 rounded-md font-semibold shadow-lg">
                <span>Дүүрсэн</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">{travel.name}</h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{travel.destination.name}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">{travel.description}</p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {/* Capacity */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium">{travel.totalSeatNumber} хүн</span>
            </div>

            {/* Company */}
            {travel.company && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium truncate max-w-[120px]">{travel.company.name}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export const TravelCardSkeleton = () => {
  return (
    <Card className="animate-pulse overflow-hidden border-gray-200 bg-white h-full">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </Card>
  );
};
