"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetOrderQuery } from "@/types/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, Calendar, MapPin, CreditCard, Users, CheckCircle, Clock, XCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  2: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = parseInt(params.id as string);

  const { data, loading, error } = useGetOrderQuery({
    variables: { getOrderId: orderId },
    skip: !orderId || isNaN(orderId),
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getOrder) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">Захиалга олдсонгүй эсвэл алдаа гарлаа</div>
        <Link href="/manager/orders">
          <Button className="mt-4" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        </Link>
      </div>
    );
  }

  const order = data.getOrder;
  const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
  const StatusIcon = status.icon;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/manager/orders">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Захиалга #{order.id}</h1>
            <p className="text-sm text-slate-600">
              {new Date(order.createdAt).toLocaleDateString("mn-MN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <Badge className={`${status.color} border px-4 py-2 text-base`}>
          <StatusIcon className="w-4 h-4 mr-2" />
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Customer Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <User className="w-4 h-4 text-blue-600" />
                Үйлчлүүлэгчийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Нэр</p>
                  <p className="font-semibold text-slate-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Хэрэглэгчийн нэр</p>
                  <p className="font-medium text-slate-700">@{order.customer.username}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">И-мэйл</p>
                    <p className="font-medium text-slate-700">{order.customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Утас</p>
                    <p className="font-medium text-slate-700">{order.customer.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Session Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Calendar className="w-4 h-4 text-blue-600" />
                Аялалын мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Эхлэх огноо</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(order.travelSession.startDate).toLocaleDateString("mn-MN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Дуусах огноо</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(order.travelSession.endDate).toLocaleDateString("mn-MN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Хөтөч</p>
                <div className="flex items-center gap-3">
                  {order.travelSession.guide.profileImage && (
                    <img src={order.travelSession.guide.profileImage} alt={order.travelSession.guide.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">{order.travelSession.guide.name}</p>
                    <p className="text-sm text-slate-600">{order.travelSession.guide.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travelers List */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="w-4 h-4 text-blue-600" />
                Аялагчид ({order.travelers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.travelers.map((traveler, index) => (
                  <div key={traveler.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">{index + 1}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{traveler.name}</p>
                        <p className="text-sm text-slate-600">{traveler.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Төрсөн огноо</p>
                      <p className="font-medium text-slate-700">{new Date(traveler.dateOfBirth).toLocaleDateString("mn-MN")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Order Summary */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Захиалгын дэлгэрэнгүй</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Нийт суудал</span>
                <span className="font-semibold text-slate-900 text-lg">{order.totalSeats}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Суудлын үнэ</span>
                <span className="font-medium text-slate-700">₮{(order.totalPrice / order.totalSeats).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-3 bg-blue-50 -mx-6 px-6 rounded-lg">
                <span className="font-semibold text-slate-900">Нийт дүн</span>
                <span className="font-bold text-blue-600 text-xl">₮{order.totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <CreditCard className="w-4 h-4 text-blue-600" />
                Төлбөрийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-slate-500 mb-1">Төлөв</p>
                <Badge className={order.payment.isPaid ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                  {order.payment.isPaid ? "✓ Төлсөн" : "⏳ Хүлээгдэж буй"}
                </Badge>
              </div>
              {order.payment.isPaid && order.payment.paidAt && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Төлсөн огноо</p>
                  <p className="font-medium text-slate-700">
                    {new Date(order.payment.paidAt).toLocaleDateString("mn-MN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              )}
              {order.payment.stripePaymentMethod && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Төлбөрийн хэрэгсэл</p>
                  <p className="font-medium text-slate-700">{order.payment.stripePaymentMethod}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500 mb-1">Нийт дүн</p>
                <p className="font-bold text-slate-900 text-lg">₮{order.payment.total.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
