"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetTravelQuery } from "@/types/generated";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function TripDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState("overview");

  const { data, loading, error } = useGetTravelQuery({
    variables: { id: params.id },
  });

  const trip = data?.travel;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Trip not found
          </h3>
          <p className="text-gray-600 mb-4">
            {error?.message || "This trip doesn't exist or has been removed."}
          </p>
          <Link href="/trips">
            <Button>Back to All Trips</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // TODO: Implement booking logic
    alert("Booking functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-96">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            trip.coverImage || "from-blue-400 to-purple-600"
          }`}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-4">{trip.title}</h1>
            <p className="text-xl text-gray-100">
              by {trip.company?.name || "Travel Company"}
            </p>
          </div>
        </div>
        <Link href="/trips">
          <Button
            variant="outline"
            className="absolute top-4 left-4 bg-white hover:bg-gray-100"
          >
            ← Back to Trips
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Trip Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <Card className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-blue-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="font-semibold">{trip.duration} Days</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-blue-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div className="font-semibold">Max {trip.maxGuests}</div>
                  <div className="text-sm text-gray-500">Guests</div>
                </div>
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-blue-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div className="font-semibold">All Ages</div>
                  <div className="text-sm text-gray-500">Welcome</div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card className="p-6">
              <div className="flex gap-4 border-b mb-6">
                <button
                  className={`pb-3 px-4 font-medium transition-colors ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`pb-3 px-4 font-medium transition-colors ${
                    activeTab === "company"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("company")}
                >
                  Company Info
                </button>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">About This Trip</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "company" && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Company Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-semibold text-lg mb-2">
                      {trip.company?.name}
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <p>📧 {trip.company?.email}</p>
                      <p>📞 {trip.company?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">
                  Price per person
                </div>
                <div className="text-4xl font-bold text-blue-600">
                  ${trip.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {travelers}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTravelers(
                          Math.min(trip.maxGuests || 10, travelers + 1)
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    ${trip.price.toLocaleString()} × {travelers} travelers
                  </span>
                  <span className="font-semibold">
                    ${(trip.price * travelers).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${(trip.price * travelers).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleBooking}
                disabled={!selectedDate}
              >
                {isAuthenticated ? "Book Now" : "Login to Book"}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">HandTrip</div>
          <p className="text-sm">
            Making travel simple and accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
