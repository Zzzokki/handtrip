"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetTravelQuery } from "@/types/generated";
import { useAuth } from "@/components/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Users, Clock, Building2, ChevronRight, User, Mail, Phone, DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Params = {
  id: string;
};

export default function TripDetailsPage() {
  const { id } = useParams<Params>();
  const router = useRouter();
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [numberOfTravelers, setNumberOfTravelers] = useState<number>(1);
  const [travelers, setTravelers] = useState<
    Array<{
      name: string;
      email: string;
      phone: string;
      dateOfBirth: string;
    }>
  >([{ name: "", email: "", phone: "", dateOfBirth: "" }]);

  const { data, loading, error } = useGetTravelQuery({
    variables: { getTravelId: parseInt(id) },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-pulse">
          <div className="h-[500px] bg-gradient-to-r from-gray-200 to-gray-300" />
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl" />
                <div className="h-96 bg-gray-200 rounded-2xl" />
                <div className="h-48 bg-gray-200 rounded-2xl" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-[600px] bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getTravel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Travel Not Found</CardTitle>
            <CardDescription className="text-base mt-2">The travel package you're looking for doesn't exist or may have been removed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/travels")} className="w-full h-12 text-base font-medium" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              Browse All Travels
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const travel = data.getTravel;
  const selectedSessionData = travel.travelSessions.find((s) => s.id.toString() === selectedSession);

  const handleTravelerCountChange = (count: number) => {
    setNumberOfTravelers(count);
    const newTravelers = Array.from({ length: count }, (_, i) => {
      return travelers[i] || { name: "", email: "", phone: "", dateOfBirth: "" };
    });
    setTravelers(newTravelers);
  };

  const handleBooking = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!selectedSession) {
      alert("Please select a travel session");
      return;
    }

    // TODO: Implement booking mutation
    console.log("Booking:", {
      travelId: travel.id,
      sessionId: selectedSession,
      travelers,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] lg:h-[600px]">
        {travel.coverImage ? (
          <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-6">
                {travel.categories.map((category) => (
                  <span key={category.id} className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-gray-800 shadow-lg">
                    {category.name}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">{travel.name}</h1>
              <div className="flex flex-wrap gap-6 text-base lg:text-lg text-white/95">
                <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{travel.destination.name}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{travel.duration} хоног</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{travel.company.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">Аяллын тухай</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">{travel.description}</p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">Хөтөлбөр</CardTitle>
                <CardDescription className="text-base mt-2">Аяллын дэлгэрэнгүй төлөвлөгөө</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 lg:p-8">
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-base font-bold shadow-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent mt-3" />
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className="font-bold text-xl mb-3 text-gray-900">{travel.agenda.name}</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">{travel.agenda.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">Аяллын компани</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  {travel.company.logo && (
                    <div className="flex-shrink-0">
                      <img src={travel.company.logo} alt={travel.company.name} className="w-20 h-20 rounded-xl object-cover shadow-md ring-2 ring-gray-100" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{travel.company.name}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{travel.company.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm lg:text-base">{travel.company.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm lg:text-base">{travel.company.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Захиалга өгөх</CardTitle>
                <CardDescription className="text-base mt-2">Өөрт тохирох огноо, хүний тоо сонгоно уу</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Session Selection */}
                <div className="space-y-3">
                  <Label htmlFor="session" className="text-base font-semibold text-gray-900">
                    Огноо сонгох
                  </Label>
                  <Select value={selectedSession} onValueChange={setSelectedSession}>
                    <SelectTrigger id="session" className="h-12 text-base border-2 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Огноо сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {travel.travelSessions.map((session) => (
                        <SelectItem key={session.id} value={session.id.toString()} className="py-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">
                              {new Date(session.startDate).toLocaleDateString("mn-MN")} - {new Date(session.endDate).toLocaleDateString("mn-MN")}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedSessionData?.guide && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Хөтөч: {selectedSessionData.guide.name}
                      </p>
                      {selectedSessionData.guide.description && <p className="text-sm text-gray-600 ml-7">{selectedSessionData.guide.description}</p>}
                    </div>
                  )}
                </div>

                {/* Number of Travelers */}
                <div className="space-y-3">
                  <Label htmlFor="travelers" className="text-base font-semibold text-gray-900">
                    Хүний тоо
                  </Label>
                  <Select value={numberOfTravelers.toString()} onValueChange={(v) => handleTravelerCountChange(parseInt(v))}>
                    <SelectTrigger id="travelers" className="h-12 text-base border-2 hover:border-blue-400 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: Math.min(10, travel.totalSeatNumber) }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()} className="py-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">
                              {i + 1} {i === 0 ? "хүн" : "хүн"}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Traveler Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900">Аялагчийн мэдээлэл</Label>
                  {travelers.map((traveler, index) => (
                    <div key={index} className="space-y-3 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <h4 className="font-semibold text-base text-gray-900 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{index + 1}</div>
                        {index + 1}-р аялагч
                      </h4>
                      <Input
                        placeholder="Овог нэр"
                        className="h-11 border-2 focus:border-blue-500"
                        value={traveler.name}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].name = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        type="email"
                        placeholder="И-мэйл хаяг"
                        className="h-11 border-2 focus:border-blue-500"
                        value={traveler.email}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].email = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        placeholder="Утасны дугаар"
                        className="h-11 border-2 focus:border-blue-500"
                        value={traveler.phone}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].phone = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        type="date"
                        placeholder="Төрсөн огноо"
                        className="h-11 border-2 focus:border-blue-500"
                        value={traveler.dateOfBirth}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].dateOfBirth = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="border-t-2 border-gray-200 pt-5 space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-500" />
                      Нийт суудал
                    </span>
                    <span className="font-bold text-lg text-gray-900">{travel.totalSeatNumber}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      Боломжит огноо
                    </span>
                    <span className="font-bold text-lg text-gray-900">{travel.travelSessions.length}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                  disabled={!selectedSession}
                >
                  {user ? "Захиалга баталгаажуулах" : "Нэвтрэх"}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                {!user && (
                  <p className="text-sm text-center text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    Захиалга өгөхийн тулд{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                      нэвтрэх
                    </Link>{" "}
                    шаардлагатай
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
