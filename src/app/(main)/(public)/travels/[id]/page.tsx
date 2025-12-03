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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-pulse">
          <div className="h-[500px] bg-gradient-to-r from-gray-200 to-gray-300" />
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl" />
                <div className="h-96 bg-gray-200 rounded-2xl" />
                <div className="h-48 bg-gray-200 rounded-2xl" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-[600px] bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getTravel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Travel Not Found</CardTitle>
            <CardDescription className="text-base mt-2">The travel package you're looking for doesn't exist or may have been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/travels")} className="w-full h-12 text-base font-medium" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              Browse All Travels
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const travel = data.getTravel;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="relative h-[650px] overflow-hidden">
        <div className="absolute inset-0">{travel.coverImage && <Image src={travel.coverImage} alt={travel.name} fill className="object-cover" />}</div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-16">
            <div className="max-w-5xl">
              <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
                {travel.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-4 py-2 bg-white/95 backdrop-blur-lg rounded-full text-sm font-semibold text-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <h1 className="text-6xl font-bold mb-8 text-white drop-shadow-2xl leading-tight animate-slide-up">{travel.name}</h1>

              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl">
                  <div className="p-2 bg-blue-500/90 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white text-base lg:text-lg">{travel.destination.name}</span>
                </div>
                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl">
                  <div className="p-2 bg-purple-500/90 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white text-base lg:text-lg">{travel.duration} хоног</span>
                </div>
                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl">
                  <div className="p-2 bg-indigo-500/90 rounded-lg group-hover:bg-indigo-600 transition-colors">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white text-base lg:text-lg">{travel.company.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <TravelDescription description={travel.description} />

            <TravelGallery gallery={travel.gallery} />

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <CardHeader className="pb-6 relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Хөтөлбөр</CardTitle>
                </div>
                <CardDescription className="text-base mt-2 text-gray-600">Аяллын дэлгэрэнгүй төлөвлөгөө</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 lg:p-8 border border-blue-100 shadow-inner">
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-xl ring-4 ring-blue-100">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="w-1 flex-1 bg-gradient-to-b from-blue-300 via-indigo-300 to-transparent mt-4 rounded-full" />
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className="font-bold text-xl lg:text-2xl mb-4 text-gray-900 flex items-center gap-2">
                        {travel.agenda.name}
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base lg:text-lg">{travel.agenda.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <TravelCompany company={travel.company} />
          </div>

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
