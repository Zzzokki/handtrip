"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useGetCompanyQuery, useGetTravelsQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

type Params = {
  id: string;
};

export default function CompanyDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { data, loading, error } = useGetCompanyQuery({
    variables: { getCompanyId: parseInt(id) },
  });

  const { data: travelsData } = useGetTravelsQuery();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-xl" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getCompany) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Company Not Found</CardTitle>
            <CardDescription>The company you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/companies")} className="w-full">
              Browse All Companies
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = data.getCompany;
  const companyTravels = travelsData?.getTravels.filter((travel) => travel.company.id === company.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        {company.coverImage ? (
          <img src={company.coverImage} alt={company.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex items-end gap-6">
              {company.logo && <img src={company.logo} alt={`${company.name} logo`} className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white shadow-lg object-cover bg-white" />}
              <div className="text-white flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{company.name}</h1>
                <div className="flex flex-wrap gap-4 text-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>{company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>{company.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>

            {/* Travel Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Packages</CardTitle>
                <CardDescription>Explore destinations offered by {company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {companyTravels && companyTravels.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {companyTravels.map((travel) => (
                      <Link key={travel.id} href={`/travels/${travel.id}`} className="group">
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <div className="relative h-40 overflow-hidden rounded-t-xl">
                            {travel.coverImage ? (
                              <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                            )}
                            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">{travel.duration} days</div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{travel.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{travel.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{travel.destination.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{travel.travelSessions.length} sessions available</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No travel packages available at the moment</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <a href={`tel:${company.phoneNumber}`} className="text-blue-600 hover:underline">
                        {company.phoneNumber}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full" size="lg">
                    Contact Company
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="pt-4 border-t text-sm text-gray-500">
                  <p className="font-medium mb-2">Quick Stats</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Travel Packages</span>
                      <span className="font-medium text-gray-900">{companyTravels?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Member Since</span>
                      <span className="font-medium text-gray-900">{new Date(company.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
