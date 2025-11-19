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
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Итгэлтэй түншүүд</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Онцлох компаниуд</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Мэргэжлийн аялал жуулчлалын компаниудын гайхалтай санал, үйлчилгээг судлаарай</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {companies.slice(0, 3).map((company: Company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white rounded-2xl">
                <div className="relative h-48 overflow-hidden">
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

                  <div className="absolute bottom-4 left-4">
                    {company.logo ? (
                      <div className="w-16 h-16 rounded-xl border-4 border-white shadow-xl overflow-hidden bg-white">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/95 backdrop-blur-sm text-blue-600 border-0 shadow-lg">
                      <Star className="w-3 h-3 mr-1 fill-blue-600" />
                      Баталгаажсан
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{company.name}</h3>

                  {company.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>}

                  <div className="space-y-2 mb-4">
                    {company.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-xs">📞</span>
                        </div>
                        <span>{company.phoneNumber}</span>
                      </div>
                    )}
                    {company.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center">
                          <span className="text-xs">✉️</span>
                        </div>
                        <span className="truncate">{company.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors pointer-events-none" />
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/companies">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 h-12"
            >
              <span className="font-semibold">Бүх компаниуд үзэх</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
