"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetTravelQuery } from "@/types/generated";
import { useAuth } from "@/components/providers/AuthProvider";
import { Calendar, MapPin, Users, Clock, User, Mail, Phone, Plus, Trash2, ShoppingCart, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      alert("Бүх аялагчийн мэдээллийг бөглөнө үү");
      return;
    }

    // TODO: Implement create order mutation
    console.log("Creating order:", {
      travelId,
      sessionId,
      travelers,
    });

    alert("Захиалга амжилттай үүслээ!");
    router.push("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Буцах
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">Захиалга үүсгэх</h1>
                    <p className="text-white/90 text-base mt-1">Аялагчдын мэдээллийг бөглөнө үү</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Travelers Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl lg:text-2xl">Аялагчдын мэдээлэл</CardTitle>
                      <CardDescription className="mt-1">Нийт {travelers.length} аялагч</CardDescription>
                    </div>
                  </div>
                  <Button onClick={addTraveler} disabled={travelers.length >= travel.totalSeatNumber} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Нэмэх
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {travelers.map((traveler, index) => (
                  <div
                    key={index}
                    className="relative p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {/* Remove Button */}
                    {travelers.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeTraveler(index)} className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}

                    {/* Traveler Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-lg">{index + 1}</div>
                      <h3 className="text-lg font-bold text-gray-900">{index + 1}-р аялагч</h3>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor={`name-${index}`} className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-blue-600" />
                          Овог нэр
                        </Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="Овог нэрээ бичнэ үү"
                          value={traveler.name}
                          onChange={(e) => updateTraveler(index, "name", e.target.value)}
                          className="h-12 border-2 focus:border-blue-500 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`email-${index}`} className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          И-мэйл
                        </Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          placeholder="example@email.com"
                          value={traveler.email}
                          onChange={(e) => updateTraveler(index, "email", e.target.value)}
                          className="h-12 border-2 focus:border-blue-500 bg-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`phone-${index}`} className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          Утас
                        </Label>
                        <Input
                          id={`phone-${index}`}
                          placeholder="+976 9999 9999"
                          value={traveler.phoneNumber}
                          onChange={(e) => updateTraveler(index, "phoneNumber", e.target.value)}
                          className="h-12 border-2 focus:border-blue-500 bg-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`dob-${index}`} className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Төрсөн огноо
                        </Label>
                        <Input
                          id={`dob-${index}`}
                          type="date"
                          value={traveler.dateOfBirth}
                          onChange={(e) => updateTraveler(index, "dateOfBirth", e.target.value)}
                          className="h-12 border-2 focus:border-blue-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6">
                  <CardTitle className="text-xl font-bold">Захиалгын дэлгэрэнгүй</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Travel Info */}
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-gray-900">{travel.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1">Газар</p>
                          <p className="text-sm font-semibold text-gray-900">{travel.destination.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1">Хугацаа</p>
                          <p className="text-sm font-semibold text-gray-900">{travel.duration} хоног</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium mb-1">Огноо</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(selectedSession.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric", year: "numeric" })} -{" "}
                            {new Date(selectedSession.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      {selectedSession.guide && (
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Хөтөч</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedSession.guide.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <span className="text-gray-700 font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Нийт хүний тоо
                      </span>
                      <span className="text-2xl font-bold text-gray-900">{travelers.length}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Захиалга баталгаажуулах
                    <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
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
