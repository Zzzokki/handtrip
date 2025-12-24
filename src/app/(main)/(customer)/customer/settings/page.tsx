"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useGetCustomerQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Settings, LogOut, ShoppingBag, MapPin } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();

  const { data, loading } = useGetCustomerQuery({
    variables: { id: parseInt(user?.id || "0") },
    skip: !user?.id,
  });

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "customer")) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !data?.getCustomer) {
    return null;
  }

  const customer = data.getCustomer;
  const fullName = `${customer.firstName} ${customer.lastName}`;
  const initials = `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Миний Хувийн Мэдээлэл</h1>
          <p className="text-sm text-gray-600 mt-1">Хувийн мэдээлэл болон тохиргоо</p>
        </div>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-4">
          {/* Profile Info */}
          <CardContent className="pt-0 px-6 pb-6">
            {/* Avatar and Info */}
            <div className="flex items-start gap-4 mt-6 mb-6">
              <div className="w-24 h-24 rounded-xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-105 transition-transform">
                {initials}
              </div>
              <div className="flex-1 mt-14">
                <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">Үйлчлүүлэгч</Badge>
                  <span className="text-xs text-gray-500">@{customer.username}</span>
                </div>
              </div>
              <div className="mt-14">
                <Button variant="outline" size="sm" onClick={logout} className="gap-2 h-8 text-xs">
                  <LogOut className="w-3.5 h-3.5" />
                  Гарах
                </Button>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-sm transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-blue-700">И-мэйл хаяг</p>
                    <p className="text-sm text-gray-900 font-medium truncate">{customer.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100 hover:shadow-sm transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-purple-700">Утасны дугаар</p>
                    <p className="text-sm text-gray-900 font-medium">{customer.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-sm transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-700">Хэрэглэгчийн нэр</p>
                    <p className="text-sm text-gray-900 font-medium">@{customer.username}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100 hover:shadow-sm transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-orange-700">Бүртгүүлсэн огноо</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {new Date(customer.createdAt).toLocaleDateString("mn-MN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b py-4 px-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Settings className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Хурдан үйлдлүүд</CardTitle>
                <CardDescription className="text-xs mt-0.5">Түгээмэл хэрэглэгддэг үйлдлүүд</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-3">
              <Link href="/travels" className="block group">
                <div className="h-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Аялал хайх</p>
                      <p className="text-xs text-gray-500 mt-0.5">Шинэ аялал олох</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/customer" className="block group">
                <div className="h-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2.5 bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors">
                      <ShoppingBag className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Миний захиалгууд</p>
                      <p className="text-xs text-gray-500 mt-0.5">Захиалга харах</p>
                    </div>
                  </div>
                </div>
              </Link>

              <div onClick={logout} className="group cursor-pointer">
                <div className="h-full p-4 border-2 border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-200">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2.5 bg-red-100 rounded-lg group-hover:bg-red-500 transition-colors">
                      <LogOut className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">Гарах</p>
                      <p className="text-xs text-gray-500 mt-0.5">Системээс гарах</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
