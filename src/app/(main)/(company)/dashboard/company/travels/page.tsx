"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetTravelsByCompanyQuery, useDeleteTravelMutation } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Edit, Trash2, Plus, Users } from "lucide-react";
import { CompanyDashboardHeader } from "../_components/CompanyDashboardHeader";

export default function CompanyTravelsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const { data, loading, error, refetch } = useGetTravelsByCompanyQuery({
    variables: { companyId: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  const [deleteTravel] = useDeleteTravelMutation();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteTravel({ variables: { id } });
      refetch();
    } catch (error: any) {
      alert(error.message || "Failed to delete travel");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyDashboardHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Travel Packages</h1>
            <p className="text-gray-600">Manage your travel packages and sessions</p>
          </div>
          <Link href="/dashboard/company/travels/create">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Travel
            </Button>
          </Link>
        </div>

        {/* Travels Grid */}
        {data?.getTravelsByCompany && data.getTravelsByCompany.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.getTravelsByCompany.map((travel) => (
              <Card key={travel.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  {travel.coverImage ? (
                    <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  )}
                  <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-medium">{travel.duration} days</div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{travel.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{travel.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{travel.destination.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{travel.totalSeatNumber} seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{travel.travelSessions.length} sessions</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Link href={`/dashboard/company/travels/${travel.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(travel.id, travel.name)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>No Travel Packages Yet</CardTitle>
              <CardDescription>Start by creating your first travel package</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/company/travels/create">
                <Button className="w-full">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Travel
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
