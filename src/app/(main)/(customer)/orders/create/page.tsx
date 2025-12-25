"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetTravelQuery, useCreateOrderMutation } from "@/types/generated";
import { useAuth } from "@/components/providers/AuthProvider";
import { Calendar, MapPin, Users, User, Mail, Phone, Plus, Trash2, ShoppingCart, ChevronRight, ArrowLeft, CreditCard } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "sonner";

type Traveler = {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
};

export default function CreateOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const travelId = searchParams.get("travelId");
  const sessionId = searchParams.get("sessionId");
  const initialTravelers = parseInt(searchParams.get("travelers") || "1");

  const [travelers, setTravelers] = useState<Traveler[]>(
    Array.from({ length: initialTravelers }, () => ({
      name: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
    }))
  );

  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [stripePromise] = useState(() => getStripe());

  const [createOrder, { loading: creatingOrder }] = useCreateOrderMutation();

  const { data, loading } = useGetTravelQuery({
    variables: { getTravelId: parseInt(travelId || "0") },
    skip: !travelId,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!travelId || !sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Алдаа гарлаа</CardTitle>
            <CardDescription>Аяллын мэдээлэл олдсонгүй</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/travels")} className="w-full">
              Аялал хайх
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || !data?.getTravel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded-2xl" />
            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const travel = data.getTravel;
  const selectedSession = travel.travelSessions.find((s) => s.id.toString() === sessionId);

  if (!selectedSession) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Алдаа гарлаа</CardTitle>
            <CardDescription>Сонгосон огноо олдсонгүй</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push(`/travels/${travelId}`)} className="w-full">
              Буцах
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addTraveler = () => {
    if (travelers.length < travel.totalSeatNumber) {
      setTravelers([...travelers, { name: "", email: "", phoneNumber: "", dateOfBirth: "" }]);
    }
  };

  const removeTraveler = (index: number) => {
    if (travelers.length > 1) {
      setTravelers(travelers.filter((_, i) => i !== index));
    }
  };

  const updateTraveler = (index: number, field: keyof Traveler, value: string) => {
    const newTravelers = [...travelers];
    newTravelers[index][field] = value;
    setTravelers(newTravelers);
  };

  const handleSubmit = async () => {
    // Validate all travelers have required info
    const isValid = travelers.every((t) => t.name && t.email && t.phoneNumber && t.dateOfBirth);

    if (!isValid) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    // Get seat cost from the first available seat
    const availableSeats = selectedSession.seats?.filter((s) => s.status === "available") || [];
    if (availableSeats.length === 0) {
      toast.error("Боломжтой суудал байхгүй байна");
      return;
    }

    if (availableSeats.length < travelers.length) {
      toast.error(`Зөвхөн ${availableSeats.length} суудал үлдсэн байна`);
      return;
    }

    const seatCost = availableSeats[0]?.seatCost?.cost || 0;
    // Calculate total amount (seat cost * number of travelers)
    const amount = seatCost * travelers.length;

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          travelName: travel?.name || "",
          travelers: travelers.length,
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        // Extract payment intent ID from client secret
        const intentId = data.clientSecret.split("_secret_")[0];
        setPaymentIntentId(intentId);

        // Store travelers data in URL for success page
        const travelersParam = encodeURIComponent(JSON.stringify(travelers));
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("travelers", travelersParam);
        window.history.replaceState({}, "", currentUrl.toString());

        setShowPayment(true);
      } else {
        toast.error("Төлбөрийн систем эхлүүлэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const result = await createOrder({
        variables: {
          input: {
            travelSessionId: parseInt(sessionId!),
            travelers: travelers.map((t) => ({
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
        toast.success("Төлбөр амжилттай! Захиалга баталгаажлаа.");
        router.push("/customer");
      } else {
        toast.error(result.data?.createOrder.message || "Захиалга үүсгэхэд алдаа гарлаа");
      }
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error(error.message || "Захиалга үүсгэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-7xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-3 hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Буцах
        </Button>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {!showPayment ? (
              <>
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-white">Захиалга үүсгэх</h1>
                        <p className="text-white/90 text-sm">Аялагчдын мэдээллийг бөглөнө үү</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Аялагчдын мэдээлэл</CardTitle>
                          <CardDescription className="text-sm">Нийт {travelers.length} аялагч</CardDescription>
                        </div>
                      </div>
                      <Button
                        onClick={addTraveler}
                        disabled={travelers.length >= travel.totalSeatNumber}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-8 text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Нэмэх
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3 p-4">
                    {travelers.map((traveler, index) => (
                      <div key={index} className="relative p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
                        {travelers.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeTraveler(index)} className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}

                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">{index + 1}</div>
                          <h3 className="text-base font-bold text-gray-900">{index + 1}-р аялагч</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="md:col-span-2">
                            <Label htmlFor={`name-${index}`} className="text-xs font-semibold text-gray-900 flex items-center gap-1.5 mb-1.5">
                              <User className="w-3 h-3 text-blue-600" />
                              Овог нэр
                            </Label>
                            <Input
                              id={`name-${index}`}
                              placeholder="Овог нэрээ бичнэ үү"
                              value={traveler.name}
                              onChange={(e) => updateTraveler(index, "name", e.target.value)}
                              className="h-9 border focus:border-blue-500 bg-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${index}`} className="text-xs font-semibold text-gray-900 flex items-center gap-1.5 mb-1.5">
                              <Mail className="w-3 h-3 text-blue-600" />
                              И-мэйл
                            </Label>
                            <Input
                              id={`email-${index}`}
                              type="email"
                              placeholder="example@email.com"
                              value={traveler.email}
                              onChange={(e) => updateTraveler(index, "email", e.target.value)}
                              className="h-9 border focus:border-blue-500 bg-white text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`phone-${index}`} className="text-xs font-semibold text-gray-900 flex items-center gap-1.5 mb-1.5">
                              <Phone className="w-3 h-3 text-blue-600" />
                              Утас
                            </Label>
                            <Input
                              id={`phone-${index}`}
                              placeholder="+976 9999 9999"
                              value={traveler.phoneNumber}
                              onChange={(e) => updateTraveler(index, "phoneNumber", e.target.value)}
                              className="h-9 border focus:border-blue-500 bg-white text-sm"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor={`dob-${index}`} className="text-xs font-semibold text-gray-900 flex items-center gap-1.5 mb-1.5">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              Төрсөн огноо
                            </Label>
                            <Input
                              id={`dob-${index}`}
                              type="date"
                              value={traveler.dateOfBirth}
                              onChange={(e) => updateTraveler(index, "dateOfBirth", e.target.value)}
                              className="h-9 border focus:border-blue-500 bg-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Төлбөр төлөх</CardTitle>
                      <p className="text-white/90 text-sm">Төлбөрийн мэдээллийг бөглөнө үү</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm onSuccess={handlePaymentSuccess} amount={travelers.length * 100} />
                    </Elements>
                  )}
                  <Button variant="outline" onClick={() => setShowPayment(false)} className="w-full mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Буцах
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4">
                  <CardTitle className="text-lg font-bold">Захиалгын дэлгэрэнгүй</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-base mb-3 text-gray-900">{travel.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Газар</p>
                          <p className="text-sm font-semibold text-gray-900">{travel.destination.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Огноо</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(selectedSession.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric", year: "numeric" })} -{" "}
                            {new Date(selectedSession.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      {selectedSession.guide && (
                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                          <User className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Хөтөч</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedSession.guide.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-semibold flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-600" />
                        Нийт хүний тоо
                      </span>
                      <span className="text-xl font-bold text-gray-900">{travelers.length}</span>
                    </div>

                    {selectedSession.seats && selectedSession.seats.length > 0 && (
                      <div className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Нэг хүний үнэ</span>
                          <span className="text-base font-semibold">₮{selectedSession.seats.find((s) => s.status === "available")?.seatCost?.cost.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/20 my-2"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Нийт дүн</span>
                          <span className="text-2xl font-bold">₮{((selectedSession.seats.find((s) => s.status === "available")?.seatCost?.cost || 0) * travelers.length).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={showPayment}
                    className="w-full h-10 text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {showPayment ? "Төлбөр төлөх хэсэг" : "Төлбөр төлөх"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
