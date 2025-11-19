"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetTravelsQuery } from "@/types/generated";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { HomeSearch } from "./HomeSearch";

export const HomeCarousel = () => {
  const { data } = useGetTravelsQuery({
    variables: {
      limit: 5,
      page: 1,
    },
  });

  return (
    <div className="w-full h-screen">
      <div className="w-full relative flex justify-center">
        <Carousel className="w-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
          <CarouselContent className="gap-0">
            {data?.getTravels.travels.map((travel, index) => (
              <CarouselItem key={index}>
                <div className="w-full pt-[40%] relative">
                  <Image fill src={travel.coverImage!} alt={travel.name} className="object-cover" />
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
