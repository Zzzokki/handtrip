import { Building2 } from "lucide-react";
import type { Company } from "@/types/generated";

interface CompanyHeroProps {
  company: Company;
}

export default function CompanyHero({ company }: CompanyHeroProps) {
  return (
    <div className="relative h-[400px] md:h-[500px]">
      {/* Cover Image */}
      {company.coverImage ? (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${company.coverImage})`,
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-16">
          <div className="flex items-end gap-6 max-w-5xl">
            {/* Logo */}
            <div className="flex-shrink-0">
              {company.logo ? (
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                  <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <Building2 className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="text-white flex-1 pb-2">
              <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">{company.name}</h1>
              <div className="flex flex-wrap gap-4 text-base md:text-lg">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xl">✉️</span>
                  <span className="font-medium">{company.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xl">📞</span>
                  <span className="font-medium">{company.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
