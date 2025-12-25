"use client";

import { useAuth } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
    <Card className="overflow-hidden border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-blue-600 px-5 py-3.5 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">Захиалга өгөх</CardTitle>
          </div>
        </div>
      </div>

      <CardContent className="space-y-5 p-5">
        <div className="space-y-2.5">
          <Label htmlFor="session" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            Огноо сонгох
          </Label>
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger id="session" className="h-10 text-sm border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-200 rounded-lg bg-white">
              <SelectValue placeholder="Огноо сонгоно уу" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {travelSessions.map((session) => (
                <SelectItem key={session.id} value={session.id.toString()} className="py-2.5 h-auto rounded-md hover:bg-blue-50">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1 bg-blue-100 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm">
                      {new Date(session.startDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })} -{" "}
                      {new Date(session.endDate).toLocaleDateString("mn-MN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSessionData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 mt-2 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-blue-500 rounded-md mt-0.5">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 mb-0.5">Хөтөч: {selectedSessionData.guide.name}</p>
                  {selectedSessionData.guide.description && <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{selectedSessionData.guide.description}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="travelers" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            Хүний тоо
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 p-1 bg-purple-100 rounded-md">
              <Users className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <Input
              id="travelers"
              type="number"
              min={1}
              max={travel.totalSeatNumber}
              value={numberOfTravelers}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= travel.totalSeatNumber) {
                  setNumberOfTravelers(value);
                }
              }}
              className="h-10 pl-11 text-sm border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-all duration-200 rounded-lg bg-white font-medium"
              placeholder="Хүний тоо оруулна уу"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center py-2.5 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
            <span className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
              <div className="p-1 bg-blue-100 rounded-md">
                <Users className="w-3.5 h-3.5 text-blue-600" />
              </div>
              Нийт суудал
            </span>
            <span className="font-bold text-lg text-gray-900">{travel.totalSeatNumber}</span>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <Button
            onClick={handleBooking}
            className="w-full h-11 text-base font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg group relative overflow-hidden"
            disabled={!selectedSession}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {user ? "Захиалга үүсгэх" : "Нэвтрэх"}
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {!user && (
            <div className="text-xs text-center bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3 shadow-sm">
              <p className="text-gray-700 font-medium">
                Захиалга өгөхийн тулд{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline inline-flex items-center gap-0.5">
                  нэвтрэх
                  <ChevronRight className="w-3.5 h-3.5" />
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
