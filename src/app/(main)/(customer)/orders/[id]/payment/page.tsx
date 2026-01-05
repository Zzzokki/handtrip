"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@/components/providers";
import { useGetOrderQuery } from "@/types/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, XCircle, CheckCircle, Clock } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "sonner";

type Params = {
  id: string;
};

export default function OrderPaymentPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise] = useState(() => getStripe());
  const [loadingPayment, setLoadingPayment] = useState(false);

  const { data, loading, error } = useGetOrderQuery({
    variables: { getOrderId: parseInt(id) },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "customer")) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, user, router]);

  useEffect(() => {
    // Check if already paid
    if (data?.getOrder?.payment.isPaid) {
      toast.info("Энэ захиалга төлөгдсөн байна");
      router.push(`/orders/${id}`);
      return;
    }

    // Create payment intent when component mounts
    if (data?.getOrder && !clientSecret && !loadingPayment) {
      initializePayment();
    }
  }, [data, clientSecret]);

  const initializePayment = async () => {
    if (!data?.getOrder) return;

    setLoadingPayment(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: data.getOrder.payment.total,
          travelName: "Travel Order",
          travelers: data.getOrder.totalSeats,
          orderId: data.getOrder.id,
        }),
      });

      const result = await response.json();

      if (result.clientSecret) {
        setClientSecret(result.clientSecret);

        // Store payment intent ID in the database
        const paymentIntentId = result.clientSecret.split("_secret_")[0];

        // Update payment record with payment intent ID
        await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation UpdatePaymentIntent($orderId: Int!, $paymentIntentId: String!) {
                updatePaymentIntent(orderId: $orderId, paymentIntentId: $paymentIntentId) {
                  success
                  message
                }
              }
            `,
            variables: {
              orderId: parseInt(id),
              paymentIntentId,
            },
          }),
        });
      } else {
        toast.error("Төлбөрийн систем эхлүүлэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoadingPayment(false);
    }
  };

  const handlePaymentSuccess = async () => {
    toast.success("Төлбөр амжилттай төлөгдлөө!");
    router.push(`/orders/${id}`);
  };

  if (isLoading || loading || loadingPayment) {
    return (
      <div className="min-h-screen bg-white py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-96 bg-gray-100 rounded-lg" />
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

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <Link href={`/orders/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Буцах
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Төлбөр төлөх</h1>
          <p className="text-sm text-gray-600">Захиалга #{order.id}</p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-base font-semibold">Захиалгын дэлгэрэнгүй</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Аялагчдын тоо</span>
              <span className="font-medium text-gray-900 text-sm">{order.totalSeats} хүн</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Төлөв</span>
              <Badge className={order.orderStatus === 0 ? "bg-yellow-100 text-yellow-800" : order.orderStatus === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {order.orderStatus === 0 ? (
                  <>
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Хүлээгдэж буй
                  </>
                ) : order.orderStatus === 1 ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Баталгаажсан
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Цуцалсан
                  </>
                )}
              </Badge>
            </div>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">Нийт дүн</span>
                <span className="text-2xl font-bold text-blue-600">₮{order.payment.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <CreditCard className="w-4 h-4 text-gray-600" />
              Төлбөрийн мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm onSuccess={handlePaymentSuccess} amount={order.payment.total} />
              </Elements>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Төлбөрийн систем ачааллаж байна...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
