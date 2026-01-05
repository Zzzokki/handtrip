import { Building2 } from "lucide-react";
import type { Company } from "@/types/generated";

interface CompanyHeroProps {
  company: Company;
}

export default function CompanyHero({ company }: CompanyHeroProps) {
  return (
    <div className="relative h-80">
      {/* Cover Image */}
      {company.coverImage ? (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${company.coverImage})`,
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-6">
          <div className="flex items-end gap-4 max-w-5xl">
            {/* Logo */}
            <div className="flex-shrink-0">
              {company.logo ? (
                <div className="w-20 h-20 rounded-xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                  <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl border-4 border-white shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="text-white flex-1 pb-1">
              <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">{company.name}</h1>
              <div className="flex flex-wrap gap-2 text-sm\">
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30\">
                  <span>✉️</span>
                  <span className="font-medium">{company.email}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30\">
                  <span>📞</span>
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
