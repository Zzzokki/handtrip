"use client";

import Link from "next/link";
import { useState } from "react";
import { useGetCompaniesQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building2, Mail, Phone, Search } from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, error } = useGetCompaniesQuery();

  const filteredCompanies = data?.getCompanies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return company.name.toLowerCase().includes(query) || company.description.toLowerCase().includes(query) || company.email.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="h-32 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Error Loading Companies</CardTitle>
            <CardDescription>Failed to load companies. Please try again later.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Travel Companies</h1>
          <p className="text-gray-600">Discover trusted travel companies offering amazing experiences</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Search companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </div>

        {/* Results Counter */}
        {searchQuery && <div className="mb-4 text-gray-600">Found {filteredCompanies?.length || 0} companies</div>}

        {/* Companies Grid */}
        {filteredCompanies && filteredCompanies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`} className="group">
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    {company.coverImage ? (
                      <img src={company.coverImage} alt={company.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    )}
                    {/* Logo Overlay */}
                    {company.logo && (
                      <div className="absolute bottom-4 left-4">
                        <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 rounded-lg border-4 border-white shadow-lg object-cover bg-white" />
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">{company.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{company.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{company.phoneNumber}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>No Companies Found</CardTitle>
              <CardDescription>{searchQuery ? "Try adjusting your search terms" : "No travel companies available at the moment"}</CardDescription>
            </CardHeader>
            {searchQuery && (
              <CardContent>
                <button onClick={() => setSearchQuery("")} className="text-blue-600 hover:underline">
                  Clear search
                </button>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
