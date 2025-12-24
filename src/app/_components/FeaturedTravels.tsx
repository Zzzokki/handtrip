"use client";

import { useGetTravelsQuery } from "@/types/generated";
import Link from "next/link";
import { MapPin, Clock, Users, ArrowRight, Sparkles, Calendar, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FeaturedTravels = () => {
  const { data, loading } = useGetTravelsQuery({
    variables: { input: { page: 1, limit: 6 } },
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

  const travels = data?.getTravels.travels || [];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Гайхалтай аяллууд</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Онцлох аяллын багцууд</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">Монголынхоо байгалийн үзэсгэлэнт газруудаар аялах гайхалтай боломжууд</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {travels?.map((travel) => (
            <Link key={travel.id} href={`/travels/${travel.id}`}>
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white rounded-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
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

                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/95 backdrop-blur-sm text-blue-600 border-0 shadow-md text-xs h-6">
                      <Clock className="w-3 h-3 mr-1" />
                      {travel.duration} өдөр
                    </Badge>
                  </div>

                  {travel.travelSessions && travel.travelSessions.length > 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500/90 backdrop-blur-sm text-white border-0 shadow-md text-xs h-6">
                        <Calendar className="w-3 h-3 mr-1" />
                        {travel.travelSessions.length} хуваарь
                      </Badge>
                    </div>
                  )}

                  {travel.categories && travel.categories.length > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-md text-xs h-6">{travel.categories[0].name}</Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">{travel.name}</h3>

                  {travel.description && <p className="text-gray-600 text-xs mb-3 line-clamp-2">{travel.description}</p>}

                  <div className="space-y-1.5 mb-3">
                    {travel.destination && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="font-medium truncate">{travel.destination.name}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span>Дээд тал {travel.totalSeatNumber}</span>
                    </div>

                    {travel.company && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <span className="truncate">{travel.company.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs group-hover:gap-2 transition-all">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors pointer-events-none" />
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/travels">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-6 h-10 text-sm font-semibold">
              <span>Бүх аяллууд үзэх</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
