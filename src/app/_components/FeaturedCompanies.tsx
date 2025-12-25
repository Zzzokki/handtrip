"use client";

import { useQuery } from "@apollo/client";
import { GetCompaniesDocument, type Company } from "@/types/generated";
import Link from "next/link";
import { Building2, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FeaturedCompanies = () => {
  const { data, loading, error } = useQuery(GetCompaniesDocument);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.getCompanies) {
    return null;
  }

  const companies = data.getCompanies.slice(0, 6);

  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Итгэлтэй түншүүд</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Онцлох компаниуд</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">Мэргэжлийн аялал жуулчлалын компаниудын гайхалтай санал, үйлчилгээг судлаарай</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {companies.slice(0, 3).map((company: Company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white rounded-xl hover:-translate-y-1">
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

                  <div className="absolute bottom-3 left-3">
                    {company.logo ? (
                      <div className="w-14 h-14 rounded-lg border-3 border-white shadow-lg overflow-hidden bg-white">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-lg border-3 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/95 backdrop-blur-sm text-blue-600 border-0 shadow-md text-xs h-6">
                      <Star className="w-3 h-3 mr-1 fill-blue-600" />
                      Баталгаажсан
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">{company.name}</h3>

                  {company.description && <p className="text-gray-600 text-xs mb-3 line-clamp-2">{company.description}</p>}

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

                  <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs group-hover:gap-2 transition-all">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-colors pointer-events-none" />
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/companies">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-6 h-10 text-sm font-semibold">
              <span>Бүх компаниуд үзэх</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
