"use client";

import { useState } from "react";
import { useGetCompaniesQuery } from "@/types/generated";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanySearch, CompanyGrid } from "./_components";
import { Sparkles } from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useGetCompaniesQuery();

  const filteredCompanies = data?.getCompanies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return company.name.toLowerCase().includes(query) || company.description.toLowerCase().includes(query) || company.email.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-pulse text-center">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-0 shadow-xl rounded-2xl">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <CardTitle className="text-2xl mb-2">Алдаа гарлаа</CardTitle>
            <CardDescription className="text-base">Компаниудыг ачааллахад алдаа гарлаа. Дахин оролдоно уу.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Итгэлтэй түншүүд</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Аялал жуулчлалын компаниуд</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Мэргэжлийн аялал жуулчлалын компаниудын гайхалтай санал, үйлчилгээг судлаарай</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Search */}
        <div className="mb-12">
          <CompanySearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        {/* Companies Grid */}
        {filteredCompanies && <CompanyGrid companies={filteredCompanies} searchQuery={searchQuery} onClearSearch={() => setSearchQuery("")} />}
      </div>

      {/* Bottom Spacing */}
      <div className="py-12" />
    </div>
  );
}
