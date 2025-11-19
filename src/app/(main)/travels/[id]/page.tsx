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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-xl" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded-xl" />
              <div className="h-64 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.getTravel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Travel Not Found</CardTitle>
            <CardDescription>The travel package you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/travels")} className="w-full">
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        {travel.coverImage ? <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {travel.categories.map((category) => (
                <span key={category.id} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {category.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{travel.name}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{travel.destination.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{travel.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>{travel.company.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{travel.description}</p>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
                <CardDescription>Day-by-day breakdown of your adventure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                      <div className="w-0.5 h-full bg-gray-200 mt-2" />
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-lg mb-2">{travel.agenda.name}</h3>
                      <p className="text-gray-600">{travel.agenda.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {travel.company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {travel.company.logo && <img src={travel.company.logo} alt={travel.company.name} className="w-16 h-16 rounded-lg object-cover" />}
                  <div className="flex-1">
                    <p className="text-gray-700 mb-4">{travel.company.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{travel.company.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{travel.company.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book This Trip</CardTitle>
                <CardDescription>Select your preferred dates and travelers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Session Selection */}
                <div className="space-y-2">
                  <Label htmlFor="session">Select Date</Label>
                  <Select value={selectedSession} onValueChange={setSelectedSession}>
                    <SelectTrigger id="session">
                      <SelectValue placeholder="Choose a session" />
                    </SelectTrigger>
                    <SelectContent>
                      {travel.travelSessions.map((session) => (
                        <SelectItem key={session.id} value={session.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedSessionData?.guide && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Guide: {selectedSessionData.guide.name}
                    </p>
                  )}
                </div>

                {/* Number of Travelers */}
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select value={numberOfTravelers.toString()} onValueChange={(v) => handleTravelerCountChange(parseInt(v))}>
                    <SelectTrigger id="travelers">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: Math.min(10, travel.totalSeatNumber) }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} {i === 0 ? "Traveler" : "Travelers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Traveler Details */}
                <div className="space-y-4">
                  <Label>Traveler Information</Label>
                  {travelers.map((traveler, index) => (
                    <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">Traveler {index + 1}</h4>
                      <Input
                        placeholder="Full Name"
                        value={traveler.name}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].name = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={traveler.email}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].email = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        placeholder="Phone Number"
                        value={traveler.phone}
                        onChange={(e) => {
                          const newTravelers = [...travelers];
                          newTravelers[index].phone = e.target.value;
                          setTravelers(newTravelers);
                        }}
                      />
                      <Input
                        type="date"
                        placeholder="Date of Birth"
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
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available Seats</span>
                    <span className="font-medium">{travel.totalSeatNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sessions Available</span>
                    <span className="font-medium">{travel.travelSessions.length}</span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full" size="lg" disabled={!selectedSession}>
                  {user ? "Book Now" : "Login to Book"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>

                {!user && (
                  <p className="text-xs text-center text-gray-500">
                    You need to{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                      login
                    </Link>{" "}
                    to make a booking
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
