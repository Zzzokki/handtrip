"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/providers";
import { useGetGuidesByCompanyQuery, useDeleteGuideMutation } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Plus, Search, Trash2, Edit } from "lucide-react";
import { CompanyDashboardHeader } from "../_components/CompanyDashboardHeader";

export default function CompanyGuidesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, refetch } = useGetGuidesByCompanyQuery({
    variables: { companyId: typeof user?.id === "string" ? parseInt(user.id) : user?.id || 0 },
    skip: !user?.id,
  });

  const [deleteGuide] = useDeleteGuideMutation({
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.type !== "company")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const guides = data?.getGuidesByCompany || [];
  const filteredGuides = guides.filter((guide) => guide.name.toLowerCase().includes(searchTerm.toLowerCase()) || guide.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`"${name}" хөтчийг устгахдаа итгэлтэй байна уу?`)) {
      try {
        await deleteGuide({ variables: { deleteGuideId: id } });
      } catch (error) {
        console.error("Error deleting guide:", error);
        alert("Хөтөч устгахад алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyDashboardHeader />
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Хөтчүүд удирдах</h1>
              <p className="text-gray-600">Аялалын хөтчүүдээ нэмэх, удирдах</p>
            </div>
            <Link href="/dashboard/company/guides/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Шинэ хөтөч нэмэх
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input type="text" placeholder="Хөтчийн нэр эсвэл имэйлээр хайх..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Нийт хөтчүүд</CardDescription>
              <CardTitle className="text-3xl">{guides.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Идэвхтэй томилолт</CardDescription>
              <CardTitle className="text-3xl">-</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Энэ сар</CardDescription>
              <CardTitle className="text-3xl">-</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">{searchTerm ? "Хайлтад тохирох хөтөч олдсонгүй." : "Та одоогоор хөтөч нэмээгүй байна."}</p>
              <Link href="/dashboard/company/guides/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Анхны хөтчөө нэмэх
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <Image src={guide.profileImage || "/placeholder-guide.jpg"} alt={guide.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{guide.name}</h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{guide.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{guide.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/company/guides/${guide.id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Засах
                      </Button>
                    </Link>
                    <Button variant="destructive" onClick={() => handleDelete(guide.id, guide.name)} className="flex-1">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Устгах
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
