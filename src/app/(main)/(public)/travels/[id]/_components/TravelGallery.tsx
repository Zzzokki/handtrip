import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageIcon } from "lucide-react";

type TravelGalleryProps = {
  gallery: string[];
};

export const TravelGallery = ({ gallery }: TravelGalleryProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-4 bg-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-orange-600 rounded-lg shadow-lg">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-2xl">Зургийн цомог</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <div key={index} className="group/image relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img src={image} className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold drop-shadow-lg">Зураг {index + 1}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-gray-800">
                  {index + 1}/{gallery.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
