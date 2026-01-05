"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/providers";
import { useGetOrderQuery, useGetTravelQuery, useCancelOrderMutation } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Mail, Phone, DollarSign, CheckCircle, Clock, XCircle, ArrowLeft, Users, Building2, Clock3 } from "lucide-react";
import { toast } from "sonner";

const ORDER_STATUS = {
  0: { label: "Хүлээгдэж буй", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  1: { label: "Баталгаажсан", color: "bg-green-100 text-green-800", icon: CheckCircle },
  2: { label: "Цуцалсан", color: "bg-red-100 text-red-800", icon: XCircle },
};

type Params = {
  id: string;
};

export default function OrderDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isCancelling, setIsCancelling] = useState(false);

  const { data, loading, error, refetch } = useGetOrderQuery({
    variables: { getOrderId: parseInt(id) },
  });

  const [cancelOrder] = useCancelOrderMutation();

  const { data: travelData } = useGetTravelQuery({
    variables: { getTravelId: data?.getOrder?.travelSession.travelId || 0 },
    skip: !data?.getOrder,
  });

  const travel = travelData?.getTravel;

  const handleCancelOrder = async () => {
    if (!confirm("Та энэ захиалгыг цуцлахдаа итгэлтэй байна уу?")) {
      return;
    }

    try {
      setIsCancelling(true);
      const result = await cancelOrder({
        variables: { orderId: parseInt(id) },
        refetchQueries: ["GetOrdersByCustomer"],
        awaitRefetchQueries: true,
      });

      if (result.data?.cancelOrder.success) {
        toast.success("Захиалга цуцлагдлаа");
        await refetch();
      } else {
        toast.error(result.data?.cancelOrder.message || "Алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Cancel order error:", error);
      toast.error(error.message || "Захиалга цуцлахад алдаа гарлаа");
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "customer")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded-xl" />
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Захиалга олдсонгүй</CardTitle>
            <CardDescription>Таны хайж буй захиалга олдсонгүй эсвэл устгагдсан байна.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/customer">
              <Button className="w-full">Захиалгууд руу буцах</Button>
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/customer">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Захиалга #{order.id}</h1>
              <p className="text-gray-600">Захиалсан огноо: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={status.color}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              {order.payment.isPaid ? <Badge className="bg-blue-100 text-blue-800">Төлсөн</Badge> : <Badge className="bg-gray-100 text-gray-800">Төлөөгүй</Badge>}
            </div>
          </div>
        </div>

        {/* Travel Package Info */}
        {travel && (
          <Card className="mb-6 overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={travel.coverImage || "/placeholder-travel.jpg"} alt={travel.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl font-bold mb-1">{travel.name}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {travel.destination?.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" />
                    {travel.duration} days
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span>Зохион байгуулагч: {travel.company?.name || "Тодорхойгүй"}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Захиалгын дэлгэрэнгүй</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Аяллын огноо</p>
                  <p className="font-medium">
                    {new Date(order.travelSession.startDate).toLocaleDateString()} - {new Date(order.travelSession.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Суудлын тоо</p>
                  <p className="font-medium">{order.totalSeats} суудал</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Нийт дүн</p>
                  <p className="font-medium text-2xl">₮{order.totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Хөтөч</p>
                    <p className="font-medium">{order.travelSession.guide?.name || "Томилогдоогүй"}</p>
                    {order.travelSession.guide?.email && <p className="text-sm text-gray-500">{order.travelSession.guide.email}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Төлбөрийн мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Төлбөрийн төлөв</span>
                <Badge className={order.payment.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{order.payment.isPaid ? "Төлсөн" : "Хүлээгдэж буй"}</Badge>
              </div>

              {order.payment.isPaid && order.payment.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Төлсөн огноо</span>
                  <span className="font-medium">{new Date(order.payment.paidAt).toLocaleDateString()}</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Нийт дүн</span>
                  <span>₮{order.payment.total.toLocaleString()}</span>
                </div>
              </div>

              {!order.payment.isPaid && order.orderStatus !== 2 && (
                <>
                  <Button className="w-full mt-4" onClick={() => router.push(`/orders/payment?orderId=${order.id}`)}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Төлбөр төлөх
                  </Button>
                  <Button variant="outline" className="w-full mt-2 border-red-200 text-red-600 hover:bg-red-50" onClick={handleCancelOrder} disabled={isCancelling}>
                    <XCircle className="w-4 h-4 mr-2" />
                    {isCancelling ? "Цуцлаж байна..." : "Захиалга цуцлах"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Travelers */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Аялагчид ({order.travelers.length})</CardTitle>
            <CardDescription>Захиалгад хамрагдсан аялагчдын жагсаалт</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.travelers.map((traveler, index) => (
                <div key={traveler.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="font-semibold text-lg">Аялагч {index + 1}</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Нэр:</span>
                      <span className="font-medium">{traveler.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">И-мэйл:</span>
                      <span className="font-medium">{traveler.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Утас:</span>
                      <span className="font-medium">{traveler.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Төрсөн огноо:</span>
                      <span className="font-medium">{new Date(traveler.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Link href="/customer" className="flex-1">
            <Button variant="outline" className="w-full">
              Захиалгууд руу буцах
            </Button>
          </Link>
          {order.orderStatus === 0 && (
            <Button variant="destructive" className="flex-1">
              Захиалга цуцлах
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
