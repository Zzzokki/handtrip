import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types/generated";
import { Building2, Mail, Phone } from "lucide-react";

type TravelCompanyProps = {
  company: Company;
};

export const TravelCompany = ({ company }: TravelCompanyProps) => {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <CardHeader className="pb-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-indigo-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">Аяллын компани</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-5 pb-5">
        <div className="flex gap-5 items-start">
          <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img src={company.logo} alt={company.name} className="w-20 h-20 rounded-xl object-cover shadow-md ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold mb-2 text-gray-900">{company.name}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed text-sm line-clamp-3">{company.description}</p>

            <div className="flex flex-wrap gap-2">
              <div className="group/item flex items-center gap-2 text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-100">
                <div className="p-1 bg-blue-500 rounded-md group-hover/item:bg-blue-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-medium truncate">{company.email}</span>
              </div>
              <div className="group/item flex items-center gap-2 text-gray-600 bg-gradient-to-r from-emerald-50 to-green-50 px-3 py-2 rounded-lg hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-100">
                <div className="p-1 bg-emerald-500 rounded-md group-hover/item:bg-emerald-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-medium">{company.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
