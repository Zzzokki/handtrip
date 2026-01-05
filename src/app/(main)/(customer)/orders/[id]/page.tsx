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
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  1: {
    label: "Баталгаажсан",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  2: {
    label: "Цуцалсан",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
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
      <div className="min-h-screen bg-white py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-48 bg-gray-100 rounded-lg" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-64 bg-gray-100 rounded-lg" />
              <div className="h-64 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getOrder) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full border border-gray-200">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-lg">Захиалга олдсонгүй</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Таны хайж буй захиалга олдсонгүй эсвэл устгагдсан байна.</p>
          </CardHeader>
          <CardContent>
            <Link href="/customer">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/customer">
          <Button variant="ghost" size="sm" className="mb-4 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Буцах
          </Button>
        </Link>

        {/* Header Section */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Захиалга #{order.id}</h1>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                <CalendarDays className="w-4 h-4" />
                <span>
                  {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${status.color} px-2.5 py-1 text-xs`}>
                <StatusIcon className="w-3.5 h-3.5 mr-1" />
                {status.label}
              </Badge>
              {order.payment.isPaid ? (
                <Badge className="bg-blue-100 text-blue-800 px-2.5 py-1 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Төлсөн
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-800 px-2.5 py-1 text-xs">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Төлөөгүй
                </Badge>
              )}
            </div>
          </div>
        </div>

        {travel && (
          <Card className="mb-6 overflow-hidden border border-gray-200">
            <div className="relative h-48 w-full">
              <Image src={travel.coverImage || "/placeholder-travel.jpg"} alt={travel.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">{travel.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {travel.destination?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5" />
                    {travel.duration} хоног
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {travel.company?.name || "Тодорхойгүй"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Booking Details */}
          <Card className="border border-gray-200">
            <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Calendar className="w-4 h-4 text-gray-600" />
                Захиалгын дэлгэрэнгүй
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <CalendarDays className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Аяллын хугацаа</p>
                  <p className="font-medium text-gray-900 text-sm mt-0.5">
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

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Суудлын тоо</p>
                  <p className="font-medium text-gray-900 text-sm mt-0.5">{order.totalSeats} суудал</p>
                </div>
              </div>

              <Separator />

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-green-700">Хөтөч</p>
                    <p className="font-semibold text-green-900 text-sm mt-0.5">{order.travelSession.guide?.name || "Томилогдоогүй"}</p>
                    {order.travelSession.guide?.email && (
                      <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {order.travelSession.guide.email}
                      </p>
                    )}
                    {order.travelSession.guide?.phoneNumber && (
                      <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {order.travelSession.guide.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CreditCard className="w-4 h-4 text-gray-600" />
                Төлбөрийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Төлбөрийн төлөв</span>
                <Badge className={order.payment.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{order.payment.isPaid ? "Төлсөн" : "Хүлээгдэж буй"}</Badge>
              </div>

              {order.payment.isPaid && order.payment.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Төлсөн огноо</span>
                  <span className="font-medium text-gray-900 text-sm">
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

              <div className="p-4 bg-blue-600 rounded-lg text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Нийт дүн</span>
                  <Banknote className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold">₮{order.payment.total.toLocaleString()}</p>
              </div>

              {!order.payment.isPaid && (
                <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-sm">
                  <CreditCard className="w-4 h-4 mr-1.5" />
                  Төлбөр төлөх
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Travelers */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="w-4 h-4 text-gray-600" />
                Аялагчид
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {order.travelers.length} хүн
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid md:grid-cols-2 gap-3">
              {order.travelers.map((traveler, index) => (
                <div key={traveler.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-md text-white font-semibold text-xs flex items-center justify-center">{index + 1}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">Аялагч {index + 1}</h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">Нэр</p>
                        <p className="font-medium text-gray-900 text-sm truncate">{traveler.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">И-мэйл</p>
                        <p className="font-medium text-gray-900 text-sm truncate">{traveler.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">Утас</p>
                        <p className="font-medium text-gray-900 text-sm">{traveler.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">Төрсөн огноо</p>
                        <p className="font-medium text-gray-900 text-sm">{new Date(traveler.dateOfBirth).toLocaleDateString("mn-MN")}</p>
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
            <Button variant="outline" size="sm" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Захиалгууд руу буцах
            </Button>
          </Link>
          {!order.payment.isPaid && order.orderStatus === 0 && (
            <Link href={`/orders/${order.id}/payment`} className="flex-1">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                <CreditCard className="w-4 h-4 mr-1.5" />
                Төлбөр төлөх
              </Button>
            </Link>
          )}
          {order.orderStatus === 0 && (
            <Button variant="destructive" size="sm" className="flex-1">
              <XCircle className="w-4 h-4 mr-1.5" />
              Захиалга цуцлах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
