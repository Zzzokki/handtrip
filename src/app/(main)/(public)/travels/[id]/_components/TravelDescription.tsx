import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

type TravelDescriptionProps = {
  description: string;
};

export const TravelDescription = ({ description }: TravelDescriptionProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-4 bg-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-2xl">Аяллын тухай</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">{description}</p>
      </CardContent>
    </Card>
  );
};
