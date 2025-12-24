"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/providers";
import { useGetOrderQuery, useGetTravelQuery } from "@/types/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Users,
  Building2,
  Clock3,
  MapPinned,
  Banknote,
  UserCircle,
  CalendarDays,
  CreditCard,
  Download,
  Share2,
  MessageCircle,
} from "lucide-react";

const ORDER_STATUS = {
  0: {
    label: "Хүлээгдэж буй",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
  1: {
    label: "Баталгаажсан",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-teal-500",
  },
  2: {
    label: "Цуцалсан",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    icon: XCircle,
    gradient: "from-rose-500 to-pink-500",
  },
};

type Params = {
  id: string;
};

export default function OrderDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data, loading, error } = useGetOrderQuery({
    variables: { getOrderId: parseInt(id) },
  });

  const { data: travelData } = useGetTravelQuery({
    variables: { getTravelId: data?.getOrder?.travelSession.travelId || 0 },
    skip: !data?.getOrder,
  });

  const travel = travelData?.getTravel;

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "customer")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-80 bg-slate-200 rounded-2xl" />
              <div className="h-80 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-rose-600" />
            </div>
            <CardTitle className="text-xl">Захиалга олдсонгүй</CardTitle>
            <p className="text-sm text-slate-600 mt-2">Таны хайж буй захиалга олдсонгүй эсвэл устгагдсан байна.</p>
          </CardHeader>
          <CardContent>
            <Link href="/customer">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Буцах
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  const order = data.getOrder;
  const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/customer">
          <Button variant="ghost" className="mb-4 hover:bg-slate-100 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Буцах
          </Button>
        </Link>

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Захиалга #{order.id}</h1>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays className="w-4 h-4" />
                <span>
                  Захиалсан:{" "}
                  {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`${status.color} border px-3 py-1.5 text-sm font-semibold`}>
                <StatusIcon className="w-4 h-4 mr-1.5" />
                {status.label}
              </Badge>
              {order.payment.isPaid ? (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 border px-3 py-1.5 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Төлсөн
                </Badge>
              ) : (
                <Badge className="bg-slate-100 text-slate-800 border-slate-200 border px-3 py-1.5 text-sm font-semibold">
                  <Clock className="w-4 h-4 mr-1.5" />
                  Төлөөгүй
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="hover:bg-slate-100 hover:border-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Татах
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-slate-100 hover:border-slate-300">
              <Share2 className="w-4 h-4 mr-2" />
              Хуваалцах
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-slate-100 hover:border-slate-300">
              <MessageCircle className="w-4 h-4 mr-2" />
              Холбоо барих
            </Button>
          </div>
        </div>

        {/* Travel Package Card */}
        {travel && (
          <Card className="mb-6 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-56 w-full group">
              <Image src={travel.coverImage || "/placeholder-travel.jpg"} alt={travel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{travel.name}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <MapPin className="w-4 h-4" />
                    {travel.destination?.name}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock3 className="w-4 h-4" />
                    {travel.duration} хоног
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Building2 className="w-4 h-4" />
                    {travel.company?.name || "Тодорхойгүй"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Booking Details */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Захиалгын дэлгэрэнгүй
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Аяллын хугацаа</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(order.travelSession.startDate).toLocaleDateString("mn-MN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(order.travelSession.endDate).toLocaleDateString("mn-MN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Суудлын тоо</p>
                  <p className="font-semibold text-slate-900">{order.totalSeats} суудал</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="p-2 bg-green-600 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-700 mb-1">Хөтөч</p>
                  <p className="font-bold text-green-900">{order.travelSession.guide?.name || "Томилогдоогүй"}</p>
                  {order.travelSession.guide?.email && (
                    <p className="text-sm text-green-700 mt-1 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {order.travelSession.guide.email}
                    </p>
                  )}
                  {order.travelSession.guide?.phoneNumber && (
                    <p className="text-sm text-green-700 mt-1 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {order.travelSession.guide.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4 bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                Төлбөрийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <span className="text-sm font-semibold text-slate-600">Төлбөрийн төлөв</span>
                <Badge className={order.payment.isPaid ? "bg-emerald-100 text-emerald-800 border-emerald-200 border" : "bg-amber-100 text-amber-800 border-amber-200 border"}>
                  {order.payment.isPaid ? "Төлсөн" : "Хүлээгдэж буй"}
                </Badge>
              </div>

              {order.payment.isPaid && order.payment.paidAt && (
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="text-sm font-semibold text-slate-600">Төлсөн огноо</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(order.payment.paidAt).toLocaleDateString("mn-MN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}

              <Separator />

              <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-blue-100">Нийт дүн</span>
                  <Banknote className="w-5 h-5 text-blue-200" />
                </div>
                <p className="text-3xl font-bold">₮{order.payment.total.toLocaleString()}</p>
              </div>

              {!order.payment.isPaid && (
                <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Төлбөр төлөх
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Travelers */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Аялагчид
              </CardTitle>
              <Badge variant="outline" className="border-purple-300 text-purple-700 font-semibold">
                {order.travelers.length} хүн
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {order.travelers.map((traveler, index) => (
                <div key={traveler.id} className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">{index + 1}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-base">Аялагч {index + 1}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Захиалгад хамрагдсан</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                      <UserCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 font-medium">Нэр</p>
                        <p className="font-semibold text-slate-900 text-sm truncate">{traveler.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 font-medium">И-мэйл</p>
                        <p className="font-semibold text-slate-900 text-sm truncate">{traveler.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 font-medium">Утас</p>
                        <p className="font-semibold text-slate-900 text-sm">{traveler.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-slate-50 transition-colors">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 font-medium">Төрсөн огноо</p>
                        <p className="font-semibold text-slate-900 text-sm">{new Date(traveler.dateOfBirth).toLocaleDateString("mn-MN")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/customer" className="flex-1">
            <Button variant="outline" className="w-full h-12 hover:bg-slate-100 border-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Захиалгууд руу буцах
            </Button>
          </Link>
          {order.orderStatus === 0 && (
            <Button variant="destructive" className="flex-1 h-12 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700">
              <XCircle className="w-4 h-4 mr-2" />
              Захиалга цуцлах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
