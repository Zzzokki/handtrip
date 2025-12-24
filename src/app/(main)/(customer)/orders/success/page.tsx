"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useCreateOrderMutation } from "@/types/generated";
import { toast } from "sonner";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [createOrder] = useCreateOrderMutation();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const processOrder = async () => {
      // Prevent duplicate order creation
      if (hasProcessed.current) {
        return;
      }

      try {
        const paymentIntentId = searchParams.get("payment_intent");
        const sessionId = searchParams.get("sessionId");
        const travelersData = searchParams.get("travelers");

        if (!paymentIntentId || !sessionId || !travelersData) {
          toast.error("Дутуу мэдээлэл байна");
          setIsProcessing(false);
          return;
        }

        // Mark as processing to prevent duplicate calls
        hasProcessed.current = true;

        const travelers = JSON.parse(decodeURIComponent(travelersData));

        const result = await createOrder({
          variables: {
            input: {
              travelSessionId: parseInt(sessionId),
              travelers: travelers.map((t: any) => ({
                name: t.name,
                email: t.email,
                phoneNumber: t.phoneNumber,
                dateOfBirth: new Date(t.dateOfBirth).toISOString(),
              })),
              paymentIntentId,
            },
          },
          refetchQueries: ["GetOrdersByCustomer"],
          awaitRefetchQueries: true,
        });

        if (result.data?.createOrder.success) {
          setIsProcessing(false);
        } else {
          toast.error(result.data?.createOrder.message || "Захиалга үүсгэхэд алдаа гарлаа");
          setIsProcessing(false);
          hasProcessed.current = false; // Allow retry on error
        }
      } catch (error: any) {
        console.error("Order creation error:", error);
        toast.error(error.message || "Захиалга үүсгэхэд алдаа гарлаа");
        setIsProcessing(false);
        hasProcessed.current = false; // Allow retry on error
      }
    };

    processOrder();
  }, [searchParams, createOrder]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <CardTitle className="text-2xl mb-3 text-gray-900">Захиалга боловсруулж байна...</CardTitle>
            <p className="text-gray-600">Түр хүлээнэ үү</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-2xl">
        <CardHeader className="text-center pt-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl mb-3 text-gray-900">Төлбөр амжилттай!</CardTitle>
          <p className="text-gray-600">Таны захиалга амжилттай баталгаажлаа. И-мэйл хаягаар баталгаажуулах мэдээлэл илгээгдлээ.</p>
        </CardHeader>
        <CardContent className="pb-12 space-y-3">
          <Button onClick={() => router.push("/customer")} className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold">
            Миний хуудас руу буцах
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => router.push("/travels")} className="w-full h-12 text-base font-semibold">
            Аялал үргэлжлүүлэн хайх
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
