"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/providers";
import { useGetOrderQuery } from "@/types/generated";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Mail, Phone, DollarSign, CheckCircle, Clock, XCircle, ArrowLeft, Users, Building2, Clock3 } from "lucide-react";

const ORDER_STATUS = {
  0: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  1: { label: "Confirmed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  2: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
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
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>The order you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/orders">
              <Button className="w-full">Back to Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  const order = data.getOrder;
  const travel = order.travelSession.travel;
  const status = ORDER_STATUS[order.orderStatus as keyof typeof ORDER_STATUS];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orders">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
              <p className="text-gray-600">Booked on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={status.color}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              {order.payment.isPaid ? <Badge className="bg-blue-100 text-blue-800">Paid</Badge> : <Badge className="bg-gray-100 text-gray-800">Unpaid</Badge>}
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
                <span>Organized by {travel.company?.name || "Unknown"}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Travel Dates</p>
                  <p className="font-medium">
                    {new Date(order.travelSession.startDate).toLocaleDateString()} - {new Date(order.travelSession.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Seats Booked</p>
                  <p className="font-medium">
                    {order.totalSeats} {order.totalSeats === 1 ? "seat" : "seats"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="font-medium text-2xl">${order.totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Guide</p>
                    <p className="font-medium">{order.travelSession.guide?.name || "Not assigned"}</p>
                    {order.travelSession.guide?.email && <p className="text-sm text-gray-500">{order.travelSession.guide.email}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status</span>
                <Badge className={order.payment.isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{order.payment.isPaid ? "Paid" : "Pending"}</Badge>
              </div>

              {order.payment.isPaid && order.payment.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Paid On</span>
                  <span className="font-medium">{new Date(order.payment.paidAt).toLocaleDateString()}</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${order.payment.total.toLocaleString()}</span>
                </div>
              </div>

              {!order.payment.isPaid && (
                <Button className="w-full mt-4">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Travelers */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Travelers ({order.travelers.length})</CardTitle>
            <CardDescription>List of all travelers for this booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.travelers.map((traveler, index) => (
                <div key={traveler.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="font-semibold text-lg">Traveler {index + 1}</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{traveler.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{traveler.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{traveler.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">DOB:</span>
                      <span className="font-medium">{new Date(traveler.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link href="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Orders
            </Button>
          </Link>
          {order.orderStatus === 0 && (
            <Button variant="destructive" className="flex-1">
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
