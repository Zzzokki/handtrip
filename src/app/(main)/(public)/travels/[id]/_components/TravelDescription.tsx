import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

type TravelDescriptionProps = {
  description: string;
};

export const TravelDescription = ({ description }: TravelDescriptionProps) => {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">Аяллын тухай</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-5 pb-5">
        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{description}</p>
      </CardContent>
    </Card>
  );
};
