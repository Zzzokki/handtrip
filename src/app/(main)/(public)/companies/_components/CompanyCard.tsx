import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Star, ArrowRight } from "lucide-react";
import type { Company } from "@/types/generated";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white rounded-xl hover:-translate-y-1">
        {/* Cover Image with Gradient Overlay */}
        <div className="relative h-40 overflow-hidden">
          {company.coverImage ? (
            <div
              className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
              style={{
                backgroundImage: `url(${company.coverImage})`,
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 transform group-hover:scale-110 transition-transform duration-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Logo positioned on cover */}
          <div className="absolute bottom-3 left-3">
            {company.logo ? (
              <div className="w-14 h-14 rounded-lg border-3 border-white shadow-lg overflow-hidden bg-white">
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-lg border-3 border-white shadow-lg bg-blue-600 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            )}
          </div>

          {/* Verified Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/95 backdrop-blur-sm text-blue-600 border-0 shadow-md text-xs h-6">
              <Star className="w-3 h-3 mr-1 fill-blue-600" />
              Баталгаажсан
            </Badge>
          </div>
        </div>

        {/* Company Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">{company.name}</h3>

          {company.description && <p className="text-gray-600 text-xs mb-3 line-clamp-2">{company.description}</p>}

          {/* Contact Info */}
          <div className="space-y-1.5 mb-3">
            {company.phoneNumber && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">📞</span>
                </div>
                <span className="truncate">{company.phoneNumber}</span>
              </div>
            )}
            {company.email && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">✉️</span>
                </div>
                <span className="truncate">{company.email}</span>
              </div>
            )}
          </div>

          {/* View Details Link */}
          <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs group-hover:gap-2 transition-all">
            <span>Дэлгэрэнгүй үзэх</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors pointer-events-none" />
      </Card>
    </Link>
  );
}
