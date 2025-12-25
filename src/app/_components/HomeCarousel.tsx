"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetTravelsQuery } from "@/types/generated";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HomeSearch } from "./HomeSearch";

export const HomeCarousel = () => {
  const { data, loading } = useGetTravelsQuery({
    variables: { input: { page: 1, limit: 5 } },
  });

  if (loading) {
    return (
      <div className="w-full pt-[40%] relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full mb-12">
      <div className="w-full relative flex justify-center">
        <Carousel className="w-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 3500 })]}>
          <CarouselContent className="gap-0">
            {data?.getTravels.travels.map((travel, index) => (
              <CarouselItem key={index}>
                <div className="w-full pt-[36%] relative">
                  <Image fill src={travel.coverImage!} alt={travel.name} className="object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-start">
                    <div className="container mx-auto px-4">
                      <div className="flex flex-wrap gap-2 mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {travel.categories && travel.categories.length > 0 && <Badge className="bg-blue-600 text-white border-0 shadow-lg text-xs h-6">{travel.categories[0].name}</Badge>}
                        {travel.duration && (
                          <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg text-xs h-6">
                            <Calendar className="w-3 h-3 mr-1" />
                            {travel.duration} өдөр
                          </Badge>
                        )}
                      </div>

                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-75">{travel.name}</h2>

                      <p className="text-base md:text-lg lg:text-xl text-white/95 drop-shadow-xl max-w-2xl line-clamp-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        {travel.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        {travel.destination && (
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{travel.destination.name}</span>
                          </div>
                        )}
                        {travel.totalSeatNumber && (
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <Users className="w-4 h-4" />
                            <span>Дээд тал {travel.totalSeatNumber}</span>
                          </div>
                        )}
                      </div>

                      <Link href={`/travels/${travel.id}`} className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Button className="bg-white hover:bg-white/90 text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 h-11 px-6 rounded-lg font-semibold group">
                          <span>Дэлгэрэнгүй үзэх</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <HomeSearch />
      </div>
    </div>
  );
};
