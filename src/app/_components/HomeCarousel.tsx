"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetTravelsQuery } from "@/types/generated";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
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
    <div className="w-full h-screen">
      <div className="w-full relative flex justify-center">
        <Carousel className="w-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
          <CarouselContent className="gap-0">
            {data?.getTravels.travels.map((travel, index) => (
              <CarouselItem key={index}>
                <div className="w-full pt-[40%] relative">
                  <Image fill src={travel.coverImage!} alt={travel.name} className="object-cover" />

                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start">
                    <div className="container mx-auto">
                      <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">{travel.name}</h2>
                      <p className="text-xl text-white drop-shadow-lg w-[600px]">{travel.description}</p>
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
