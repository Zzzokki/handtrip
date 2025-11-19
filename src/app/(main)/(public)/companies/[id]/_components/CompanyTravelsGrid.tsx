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
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardContent className="py-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🗺️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Аяллын багц байхгүй</h3>
          <p className="text-gray-600">Одоогоор ямар ч аяллын багц байхгүй байна</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Аяллын багцууд</h2>
        <p className="text-gray-600">{companyName}-ын санал болгож буй аяллын багцууд</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {travels.map((travel) => (
          <Link key={travel.id} href={`/travels/${travel.id}`}>
            <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white rounded-2xl">
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden">
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
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg">
                    <Clock className="w-3 h-3 mr-1" />
                    {travel.duration} өдөр
                  </Badge>
                </div>

                {/* Category Badge */}
                {travel.subCategories && travel.subCategories.length > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white border-0 shadow-lg">{travel.subCategories[0].name}</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-1">{travel.name}</CardTitle>
                <CardDescription className="line-clamp-2">{travel.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Destination */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{travel.destination.name}</span>
                </div>

                {/* Sessions */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{travel.travelSessions.length} сесс байна</span>
                </div>

                {/* View Details */}
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all pt-2">
                  <span>Дэлгэрэнгүй үзэх</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors pointer-events-none" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
