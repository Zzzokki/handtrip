import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

interface CompanyTravelsGridProps {
  travels: any[];
  companyName: string;
}

export default function CompanyTravelsGrid({ travels, companyName }: CompanyTravelsGridProps) {
  if (travels.length === 0) {
    return (
      <Card className="border-0 shadow-md rounded-xl">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🗺️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Аяллын багц байхгүй</h3>
          <p className="text-gray-600 text-sm">Одоогоор ямар ч аяллын багц байхгүй байна</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Аяллын багцууд</h2>
        <p className="text-gray-600 text-sm">{companyName}-ын санал болгож буй аяллын багцууд</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {travels.map((travel) => (
          <Link key={travel.id} href={`/travels/${travel.id}`}>
            <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white rounded-xl hover:-translate-y-1">
              {/* Cover Image */}
              <div className="relative h-44 overflow-hidden">
                {travel.coverImage ? (
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${travel.coverImage})`,
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 transform group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-md text-xs h-6">
                    <Clock className="w-3 h-3 mr-1" />
                    {travel.duration} өдөр
                  </Badge>
                </div>

                {/* Category Badge */}
                {travel.subCategories && travel.subCategories.length > 0 && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-purple-600/90 backdrop-blur-sm text-white border-0 shadow-md text-xs h-6">{travel.subCategories[0].name}</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{travel.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{travel.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 pb-4">
                {/* Destination */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-medium">{travel.destination.name}</span>
                </div>

                {/* Sessions */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span>{travel.travelSessions.length} сесс байна</span>
                </div>

                {/* View Details */}
                <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs group-hover:gap-2 transition-all pt-1">
                  <span>Дэлгэрэнгүй үзэх</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </CardContent>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors pointer-events-none" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
