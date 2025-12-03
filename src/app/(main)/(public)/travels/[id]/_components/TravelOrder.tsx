"use client";

import { useAuth } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Travel } from "@/types/generated";
import { Calendar, ChevronRight, ShoppingCart, User, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TravelOrderProps = {
  travel: Travel;
};

export const TravelOrder = ({ travel }: TravelOrderProps) => {
  const { travelSessions } = travel;

  const router = useRouter();
  const { user } = useAuth();

  const [selectedSession, setSelectedSession] = useState<string>("");
  const [numberOfTravelers, setNumberOfTravelers] = useState<number>(1);

  const selectedSessionData = travel.travelSessions.find((s) => s.id.toString() === selectedSession);

  const handleBooking = () => {
    if (!user) return router.push("/login");

    if (!selectedSession) {
      alert("Аяллын огноо сонгоно уу");
      return;
    }

    const params = new URLSearchParams({
      travelId: travel.id.toString(),
      sessionId: selectedSession,
      travelers: numberOfTravelers.toString(),
    });

    router.push(`/orders/create?${params.toString()}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Захиалга өгөх</CardTitle>
          </div>
        </div>
      </div>

      <CardContent className="space-y-6 p-6">
        <div className="space-y-3">
          <Label htmlFor="session" className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Огноо сонгох
          </Label>
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger
              id="session"
              className="h-12 text-base border-2 border-gray-200 hover:border-blue-500 focus:border-blue-600 transition-all duration-300 rounded-xl bg-gradient-to-r from-white to-gray-50"
            >
              <SelectValue placeholder="Огноо сонгоно уу" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {travelSessions.map((session) => (
                <SelectItem key={session.id} value={session.id.toString()} className="py-2 h-12 rounded-lg hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {new Date(session.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })} -{" "}
                      {new Date(session.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSessionData && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 mt-3 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500 rounded-lg mt-0.5">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 mb-1">Хөтөч: {selectedSessionData.guide.name}</p>
                  {selectedSessionData.guide.description && <p className="text-sm text-gray-700 leading-relaxed">{selectedSessionData.guide.description}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="travelers" className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Хүний тоо
          </Label>
          <Select value={numberOfTravelers.toString()} onValueChange={(v) => setNumberOfTravelers(parseInt(v))}>
            <SelectTrigger
              id="travelers"
              className="h-12 text-base border-2 border-gray-200 hover:border-purple-500 focus:border-purple-600 transition-all duration-300 rounded-xl bg-gradient-to-r from-white to-gray-50"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Array.from({ length: Math.min(10, travel.totalSeatNumber) }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()} className="py-4 rounded-lg hover:bg-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-purple-100 rounded-lg">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {i + 1} {i === 0 ? "хүн" : "хүн"}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center py-2 px-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <span className="text-gray-700 font-semibold flex items-center gap-3">
              <div className="p-1 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              Нийт суудал
            </span>
            <span className="font-bold text-xl text-gray-900">{travel.totalSeatNumber}</span>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <Button
            onClick={handleBooking}
            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group relative overflow-hidden"
            disabled={!selectedSession}
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            {user ? "Захиалга үүсгэх" : "Нэвтрэх"}
            <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          {!user && (
            <div className="text-sm text-center bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4 shadow-sm">
              <p className="text-gray-700 font-medium">
                Захиалга өгөхийн тулд{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline inline-flex items-center gap-1">
                  нэвтрэх
                  <ChevronRight className="w-4 h-4" />
                </Link>{" "}
                шаардлагатай
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
