"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanyQuery, useGetTravelsByCompanyQuery, useGetCategoriesQuery, useGetSubCategoriesQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompanyHero, CompanyAbout, CompanyContact, TravelFilters, CompanyTravelsGrid } from "./_components";

type Params = {
  id: string;
};

export default function CompanyDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<string[]>([]);

  const { data, loading, error } = useGetCompanyQuery({
    variables: { getCompanyId: parseInt(id) },
  });

  const { data: travelsData, loading: travelsLoading } = useGetTravelsByCompanyQuery({
    variables: { input: { companyId: parseInt(id) } },
  });

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: subCategoriesData } = useGetSubCategoriesQuery();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="h-[500px] bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getCompany) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-0 shadow-xl rounded-2xl">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <CardTitle className="text-2xl mb-2">Компани олдсонгүй</CardTitle>
            <CardDescription className="text-base">Таны хайж буй компани олдсонгүй</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/companies")} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 rounded-xl">
              Бүх компаниуд үзэх
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = data.getCompany;
  const allTravels = travelsData?.getTravelsByCompany?.travels || [];

  // Filter travels based on selected filters
  const filteredTravels = allTravels.filter((travel: any) => {
    // Filter by category
    if (selectedCategoryId) {
      const matchesCategory = travel.subCategories?.some((sub: any) => sub.categoryId.toString() === selectedCategoryId);
      if (!matchesCategory) return false;
    }

    // Filter by subcategories
    if (selectedSubCategoryIds.length > 0) {
      const matchesSubCategory = travel.subCategories?.some((sub: any) => selectedSubCategoryIds.includes(sub.id.toString()));
      if (!matchesSubCategory) return false;
    }

    return true;
  });

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryIds([]); // Clear subcategories when category changes
  };

  const handleSubCategoryToggle = (subCategoryId: string) => {
    setSelectedSubCategoryIds((prev) => (prev.includes(subCategoryId) ? prev.filter((id) => id !== subCategoryId) : [...prev, subCategoryId]));
  };

  const handleClearFilters = () => {
    setSelectedCategoryId(null);
    setSelectedSubCategoryIds([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <CompanyHero company={company} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <CompanyAbout company={company} />

            {/* Travel Packages */}
            {travelsLoading ? (
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <CompanyTravelsGrid travels={filteredTravels} companyName={company.name} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <CompanyContact company={company} travelCount={allTravels.length} />

            {/* Filters */}
            {categoriesData?.getCategories && subCategoriesData?.getSubCategories && (
              <TravelFilters
                categories={categoriesData.getCategories}
                subCategories={subCategoriesData.getSubCategories}
                selectedCategoryId={selectedCategoryId}
                selectedSubCategoryIds={selectedSubCategoryIds}
                onCategoryChange={handleCategoryChange}
                onSubCategoryToggle={handleSubCategoryToggle}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
