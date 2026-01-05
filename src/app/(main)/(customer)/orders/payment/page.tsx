"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, CreditCard } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { useGetOrderQuery, useUpdatePaymentIntentMutation } from "@/types/generated";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [clientSecret, setClientSecret] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(true);

  const { data, loading } = useGetOrderQuery({
    variables: { getOrderId: parseInt(orderId || "0") },
    skip: !orderId,
  });

  const [updatePaymentIntent] = useUpdatePaymentIntentMutation();

  useEffect(() => {
    if (!orderId) {
      toast.error("Захиалгын дугаар олдсонгүй");
      router.push("/customer");
      return;
    }

    initializePayment();
  }, [orderId]);

  const initializePayment = async () => {
    try {
      setIsInitializing(true);

      if (!data?.getOrder) {
        // Wait for order data to load
        return;
      }

      const order = data.getOrder;

      // Check if already paid
      if (order.payment.isPaid) {
        toast.success("Энэ захиалга төлөгдсөн байна");
        router.push(`/customer/orders/${orderId}`);
        return;
      }

      // Create payment intent via API
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.payment.total,
          orderId: order.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Төлбөрийн холбоо үүсгэхэд алдаа гарлаа");
      }

      const result = await response.json();
      setClientSecret(result.clientSecret);

      // Store payment intent ID in database
      const paymentIntentId = result.clientSecret.split("_secret_")[0];
      await updatePaymentIntent({
        variables: {
          orderId: order.id,
          paymentIntentId,
        },
      });

      setIsInitializing(false);
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast.error(error.message || "Төлбөр эхлүүлэхэд алдаа гарлаа");
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    if (data?.getOrder && isInitializing && !clientSecret) {
      initializePayment();
    }
  }, [data]);

  const handlePaymentSuccess = async () => {
    toast.success("Төлбөр амжилттай! Захиалга баталгаажуулагдаж байна...");
    // Wait a moment for webhook to process, then redirect
    setTimeout(() => {
      router.push(`/customer/orders/${orderId}`);
    }, 2000);
  };

  if (!orderId) {
    return null;
  }

  if (loading || !data?.getOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <p className="text-gray-600">Захиалга ачаалж байна...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const order = data.getOrder;

  if (order.payment.isPaid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Төлбөр төлөгдсөн</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Энэ захиалга аль хэдийн төлөгдсөн байна.</p>
            <Button onClick={() => router.push(`/customer/orders/${orderId}`)} className="w-full">
              Захиалга харах
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isInitializing || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <p className="text-gray-600">Төлбөрийн систем бэлдэж байна...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Буцах
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Төлбөр төлөх</CardTitle>
                <p className="text-blue-100 text-sm mt-1">Захиалга #{order.id}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Order Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Захиалгын хураангуй</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Захиалга:</span>
                  <span className="font-medium">#{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Суудал:</span>
                  <span className="font-medium">{order.totalSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Огноо:</span>
                  <span className="font-medium">{new Date(order.travelSession.startDate).toLocaleDateString()}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                  <span>Нийт дүн:</span>
                  <span className="text-blue-600">₮{order.payment.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#2563eb",
                  },
                },
              }}
            >
              <PaymentForm amount={order.payment.total} onSuccess={handlePaymentSuccess} />
            </Elements>

            <p className="text-xs text-gray-500 text-center mt-6">🔒 Таны төлбөрийн мэдээлэл Stripe-ээр баталгаажсан, найдвартай хамгаалагдсан байна.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
