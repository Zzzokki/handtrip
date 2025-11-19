"use client";

import { useQuery } from "@apollo/client";
import { GetTravelsDocument } from "@/types/generated";
import Link from "next/link";
import { MapPin, Clock, Users, ArrowRight, Sparkles, Calendar, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FeaturedTravels = () => {
  const { data, loading, error } = useQuery(GetTravelsDocument, {
    variables: {
      page: 1,
      limit: 6,
    },
  });

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.getTravels?.travels) {
    return null;
  }

  const travels = data.getTravels.travels.slice(0, 6);

  if (travels.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Гайхалтай аяллууд</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Онцлох аяллын багцууд</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Монголынхоо байгалийн үзэсгэлэнт газруудаар аялах гайхалтай боломжууд</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {travels.map((travel: any) => (
            <Link key={travel.id} href={`/travels/${travel.id}`}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white rounded-2xl">
                <div className="relative h-64 overflow-hidden">
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
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/95 backdrop-blur-sm text-blue-600 border-0 shadow-lg">
                      <Clock className="w-3 h-3 mr-1" />
                      {travel.duration} өдөр
                    </Badge>
                  </div>

                  {/* Sessions Badge */}
                  {travel.travelSessions && travel.travelSessions.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white border-0 shadow-lg">
                        <Calendar className="w-3 h-3 mr-1" />
                        {travel.travelSessions.length} сесс
                      </Badge>
                    </div>
                  )}

                  {/* Category Badge */}
                  {travel.categories && travel.categories.length > 0 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">{travel.categories[0].name}</Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{travel.name}</h3>

                  {travel.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{travel.description}</p>}

                  <div className="space-y-2 mb-4">
                    {/* Destination */}
                    {travel.destination && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium">{travel.destination.name}</span>
                      </div>
                    )}

                    {/* Capacity */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>Дээд тал {travel.totalSeatNumber}</span>
                    </div>

                    {/* Company */}
                    {travel.company && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="truncate">{travel.company.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors pointer-events-none" />
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/travels">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 h-12"
            >
              <span className="font-semibold">Бүх аяллууд үзэх</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
