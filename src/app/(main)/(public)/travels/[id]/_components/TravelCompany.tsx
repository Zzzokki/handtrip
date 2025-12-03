import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Company } from "@/types/generated";
import { Building2, Mail, Phone } from "lucide-react";

type TravelCompanyProps = {
  company: Company;
};

export const TravelCompany = ({ company }: TravelCompanyProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="py-4 bg-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Аяллын компани</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <img src={company.logo} alt={company.name} className="relative w-24 h-24 rounded-2xl object-cover shadow-lg ring-4 ring-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl lg:text-2xl font-bold mb-3 text-gray-900">{company.name}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{company.description}</p>

            <div className="flex gap-4">
              <div className="group/item flex items-center gap-3 text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 border border-blue-100">
                <div className="p-1 bg-blue-500 rounded-lg group-hover/item:bg-blue-600 transition-colors">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm lg:text-base font-medium">{company.email}</span>
              </div>
              <div className="group/item flex items-center gap-3 text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100">
                <div className="p-1 bg-green-500 rounded-lg group-hover/item:bg-green-600 transition-colors">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm lg:text-base font-medium">{company.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
