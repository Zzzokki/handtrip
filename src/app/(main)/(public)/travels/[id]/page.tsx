"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTravelQuery } from "@/types/generated";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, Building2, CheckCircle2 } from "lucide-react";
import { TravelCompany, TravelDescription, TravelGallery } from "./_components";
import { TravelOrder } from "./_components/TravelOrder";
import Image from "next/image";

type Params = {
  id: string;
};

export default function TravelDetailsPage() {
  const { id } = useParams<Params>();
  const router = useRouter();

  const { data, loading, error } = useGetTravelQuery({
    variables: { getTravelId: parseInt(id) },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pt-14">
        <div className="animate-pulse">
          <div className="h-[420px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                <div className="h-48 bg-gray-200 rounded-xl" />
                <div className="h-64 bg-gray-200 rounded-xl" />
                <div className="h-40 bg-gray-200 rounded-xl" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-[500px] bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getTravel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4 pt-20">
        <Card className="max-w-md w-full shadow-lg border-gray-200">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-3 w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
              <MapPin className="w-7 h-7 text-red-500" />
            </div>
            <CardTitle className="text-xl">Аялал олдсонгүй</CardTitle>
            <CardDescription className="text-sm mt-2">Таны хайж буй аялал олдсонгүй эсвэл устгагдсан байна.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/travels")} className="w-full h-10 text-sm font-semibold" size="default">
              <MapPin className="w-4 h-4 mr-2" />
              Бүх аялал үзэх
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const travel = data.getTravel;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pt-14">
      {/* Hero Section */}
      <div className="relative h-[420px] overflow-hidden">
        <div className="absolute inset-0">{travel.coverImage && <Image src={travel.coverImage} alt={travel.name} fill className="object-cover" priority />}</div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {travel.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-semibold text-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-white/50"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold mb-5 text-white drop-shadow-2xl leading-tight">{travel.name}</h1>

              {/* Info Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg">
                  <div className="p-1.5 bg-blue-500/90 rounded-md group-hover:bg-blue-600 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-white text-sm">{travel.destination.name}</span>
                </div>
                <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg">
                  <div className="p-1.5 bg-purple-500/90 rounded-md group-hover:bg-purple-600 transition-colors">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-white text-sm">{travel.duration} хоног</span>
                </div>
                <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg">
                  <div className="p-1.5 bg-indigo-500/90 rounded-md group-hover:bg-indigo-600 transition-colors">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-white text-sm">{travel.company.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-5">
            <TravelDescription description={travel.description} />

            <TravelGallery gallery={travel.gallery} />

            {/* Agenda Card */}
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardHeader className="pb-4 bg-gradient-to-br from-purple-50 to-pink-50 border-b border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Хөтөлбөр</CardTitle>
                    <CardDescription className="text-xs mt-0.5 text-gray-600">Аяллын дэлгэрэнгүй төлөвлөгөө</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg ring-2 ring-blue-100">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-300 via-indigo-300 to-transparent mt-3 rounded-full" />
                    </div>
                    <div className="flex-1 pb-2">
                      <h3 className="font-bold text-lg mb-2 text-gray-900 flex items-center gap-2">
                        {travel.agenda.name}
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{travel.agenda.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TravelCompany company={travel.company} />
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <TravelOrder travel={travel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
