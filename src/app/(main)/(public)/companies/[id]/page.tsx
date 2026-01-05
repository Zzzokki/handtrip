"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanyQuery, useGetTravelsQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyHero, CompanyAbout, CompanyContact } from "./_components";
import { TravelCard } from "../../travels/_components/TravelCard";
import { MapPin } from "lucide-react";

type Params = {
  id: string;
};

export default function CompanyDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();

  const { data, loading, error } = useGetCompanyQuery({
    variables: { getCompanyId: parseInt(id) },
  });

  const { data: travelsData, loading: travelsLoading } = useGetTravelsQuery({
    variables: {
      input: {
        page: 1,
        limit: 100,
        filters: {
          companyId: parseInt(id),
        },
      },
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="h-80 bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getCompany) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg rounded-xl border-gray-200">
          <CardHeader className="text-center py-10">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚠️</span>
            </div>
            <CardTitle className="text-xl mb-1">Компани олдсонгүй</CardTitle>
            <CardDescription className="text-sm">Таны хайж буй компани олдсонгүй</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/companies")} className="w-full bg-blue-600 hover:bg-blue-700 h-10 rounded-lg">
              Бүх компаниуд үзэх
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = data.getCompany;
  const allTravels = travelsData?.getTravels?.travels || [];

  return (
    <div className="min-h-screen bg-blue-50">
      <CompanyHero company={company} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <CompanyAbout company={company} />

            {/* Travels Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Аяллын багцууд</h2>
                  <p className="text-sm text-gray-600 mt-1">{company.name}-ын санал болгож буй аяллын багцууд</p>
                </div>
                {allTravels.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">{allTravels.length} аялал</span>
                  </div>
                )}
              </div>

              {travelsLoading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : allTravels.length === 0 ? (
                <Card className="shadow-sm rounded-xl border-gray-200">
                  <CardContent className="py-12 text-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Аяллын багц байхгүй</h3>
                    <p className="text-gray-600 text-sm">Одоогоор ямар ч аяллын багц байхгүй байна</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {allTravels.map((travel) => (
                    <TravelCard key={travel.id} travel={travel} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CompanyContact company={company} travelCount={allTravels.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
