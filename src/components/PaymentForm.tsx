"use client";

import { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Lock } from "lucide-react";

interface PaymentFormProps {
  onSuccess: () => void;
  amount: number;
}

export default function PaymentForm({ onSuccess, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Төлбөр амжилттай баталгаажлаа!");
          onSuccess();
          break;
        case "processing":
          setMessage("Төлбөр боловсруулж байна.");
          break;
        case "requires_payment_method":
          setMessage("Төлбөр амжилтгүй боллоо, дахин оролдоно уу.");
          break;
        default:
          setMessage("Алдаа гарлаа.");
          break;
      }
    });
  }, [stripe, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/success?${window.location.search.substring(1)}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Алдаа гарлаа");
    } else {
      setMessage("Төлбөр амжилтгүй боллоо");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            Төлөх дүн
          </span>
          <span className="text-2xl font-bold text-gray-900">₮{amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Lock className="w-3 h-3" />
          <span>Найдвартай SSL шифрлэлттэй</span>
        </div>
      </div>

      <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium ${message.includes("амжилттай") ? "bg-green-50 text-green-700 border-2 border-green-200" : "bg-red-50 text-red-700 border-2 border-red-200"}`}
        >
          {message}
        </div>
      )}

      <Button disabled={isLoading || !stripe || !elements} type="submit" className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Төлбөр төлж байна...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Төлбөр төлөх
          </>
        )}
      </Button>

      <div className="text-center">
        <p className="text-xs text-gray-500">Тестийн карт: 4242 4242 4242 4242 | Огноо: Ирээдүйн огноо | CVC: Аль ч 3 орон</p>
      </div>
    </form>
  );
}
