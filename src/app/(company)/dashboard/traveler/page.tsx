"use client";"use client";



import Link from "next/link";import Link from "next/link";

import { useEffect } from "react";import { useState } from "react";

import { useAuth } from "@/components/providers";import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function TravelerDashboard() {

export default function TravelerDashboard() {  const [activeTab, setActiveTab] = useState("overview");

  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const router = useRouter();  return (

    <div className="min-h-screen bg-gray-50">

  useEffect(() => {      {/* Top Navigation */}

    if (!isLoading && (!isAuthenticated || user?.type !== "customer")) {      <nav className="bg-white border-b border-gray-200">

      router.push("/login");        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    }          <div className="flex justify-between items-center h-16">

  }, [isAuthenticated, isLoading, user, router]);            <Link href="/" className="text-2xl font-bold text-blue-600">

              iTrip

  if (isLoading) {            </Link>

    return (            <div className="flex items-center gap-4">

      <div className="min-h-screen flex items-center justify-center">              <button className="text-gray-600 hover:text-gray-900">

        <div className="text-center">                <svg

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>                  className="w-6 h-6"

          <p className="mt-4 text-gray-600">Loading...</p>                  fill="none"

        </div>                  stroke="currentColor"

      </div>                  viewBox="0 0 24 24"

    );                >

  }                  <path

                    strokeLinecap="round"

  if (!user) {                    strokeLinejoin="round"

    return null;                    strokeWidth={2}

  }                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"

                  />

  return (                </svg>

    <div className="min-h-screen bg-gray-50">              </button>

      {/* Navigation */}              <div className="flex items-center gap-3">

      <nav className="bg-white border-b border-gray-200">                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">                  JD

          <div className="flex justify-between items-center h-16">                </div>

            <Link href="/" className="text-2xl font-bold text-blue-600">                <div>

              iTrip                  <div className="text-sm font-medium text-gray-900">

            </Link>                    John Doe

            <div className="flex gap-4 items-center">                  </div>

              <Link href="/profile" className="text-gray-600 hover:text-gray-900">                  <div className="text-xs text-gray-500">Traveler</div>

                Profile                </div>

              </Link>              </div>

              <span className="text-sm text-gray-600">{user.name}</span>            </div>

              <Button variant="outline" onClick={logout}>          </div>

                Logout        </div>

              </Button>      </nav>

            </div>

          </div>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        </div>        <div className="flex gap-8">

      </nav>          {/* Sidebar */}

          <aside className="w-64 flex-shrink-0">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">

        <div className="mb-8">              <Button

          <h1 className="text-3xl font-bold text-gray-900">Traveler Dashboard</h1>                onClick={() => setActiveTab("overview")}

          <p className="text-gray-600 mt-2">Plan and manage your adventures</p>                variant={activeTab === "overview" ? "secondary" : "ghost"}

        </div>                className="w-full justify-start gap-3"

              >

        {/* Stats Grid */}                <svg

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">                  className="w-5 h-5"

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">                  fill="none"

            <div className="flex items-center justify-between">                  stroke="currentColor"

              <div>                  viewBox="0 0 24 24"

                <p className="text-sm font-medium text-gray-600">Upcoming Trips</p>                >

                <p className="text-3xl font-bold text-gray-900 mt-2">3</p>                  <path

              </div>                    strokeLinecap="round"

              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">                    strokeLinejoin="round"

                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                    strokeWidth={2}

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"

                </svg>                  />

              </div>                </svg>

            </div>                Overview

          </div>              </Button>

              <Button

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">                onClick={() => setActiveTab("trips")}

            <div className="flex items-center justify-between">                variant={activeTab === "trips" ? "secondary" : "ghost"}

              <div>                className="w-full justify-start gap-3"

                <p className="text-sm font-medium text-gray-600">Completed</p>              >

                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>                <svg

              </div>                  className="w-5 h-5"

              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">                  fill="none"

                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  stroke="currentColor"

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />                  viewBox="0 0 24 24"

                </svg>                >

              </div>                  <path

            </div>                    strokeLinecap="round"

          </div>                    strokeLinejoin="round"

                    strokeWidth={2}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"

            <div className="flex items-center justify-between">                  />

              <div>                </svg>

                <p className="text-sm font-medium text-gray-600">Saved Tours</p>                My Trips

                <p className="text-3xl font-bold text-gray-900 mt-2">8</p>              </Button>

              </div>              <Button

              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">                onClick={() => setActiveTab("bookings")}

                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">                variant={activeTab === "bookings" ? "secondary" : "ghost"}

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />                className="w-full justify-start gap-3"

                </svg>              >

              </div>                <svg

            </div>                  className="w-5 h-5"

          </div>                  fill="none"

        </div>                  stroke="currentColor"

                  viewBox="0 0 24 24"

        {/* Main Content Grid */}                >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">                  <path

          {/* Upcoming Trips */}                    strokeLinecap="round"

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">                    strokeLinejoin="round"

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Trips</h2>                    strokeWidth={2}

            <div className="space-y-4">                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"

              {[1, 2, 3].map((i) => (                  />

                <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">                </svg>

                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0"></div>                Bookings

                  <div className="flex-1">              </Button>

                    <h3 className="font-semibold text-gray-900">Mountain Adventure Tour</h3>              <Button

                    <p className="text-sm text-gray-600 mt-1">Dec 15-20, 2025</p>                onClick={() => setActiveTab("favorites")}

                    <div className="flex items-center gap-4 mt-2">                variant={activeTab === "favorites" ? "secondary" : "ghost"}

                      <span className="text-sm text-gray-500">Duration: 5 days</span>                className="w-full justify-start gap-3"

                      <span className="text-sm font-semibold text-blue-600">$1,299</span>              >

                    </div>                <svg

                  </div>                  className="w-5 h-5"

                  <Button variant="outline" size="sm">                  fill="none"

                    View Details                  stroke="currentColor"

                  </Button>                  viewBox="0 0 24 24"

                </div>                >

              ))}                  <path

            </div>                    strokeLinecap="round"

            <Button className="w-full mt-4" variant="outline">                    strokeLinejoin="round"

              View All Bookings                    strokeWidth={2}

            </Button>                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"

          </div>                  />

                </svg>

          {/* Quick Actions & Info */}                Favorites

          <div className="space-y-6">              </Button>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">              <Button

              <h2 className="text-xl font-semibold mb-2">Explore New Destinations</h2>                onClick={() => setActiveTab("settings")}

              <p className="text-blue-100 mb-4">                variant={activeTab === "settings" ? "secondary" : "ghost"}

                Discover amazing places and book your next adventure!                className="w-full justify-start gap-3"

              </p>              >

              <Link href="/trips">                <svg

                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">                  className="w-5 h-5"

                  Browse Tours                  fill="none"

                </Button>                  stroke="currentColor"

              </Link>                  viewBox="0 0 24 24"

            </div>                >

                  <path

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">                    strokeLinecap="round"

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>                    strokeLinejoin="round"

              <div className="space-y-3">                    strokeWidth={2}

                <Link href="/trips">                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"

                  <Button className="w-full justify-start" variant="outline">                  />

                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <path

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />                    strokeLinecap="round"

                    </svg>                    strokeLinejoin="round"

                    Search Tours                    strokeWidth={2}

                  </Button>                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"

                </Link>                  />

                <Link href="/bookings">                </svg>

                  <Button className="w-full justify-start" variant="outline">                Settings

                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">              </Button>

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />            </nav>

                    </svg>          </aside>

                    My Bookings

                  </Button>          {/* Main Content */}

                </Link>          <main className="flex-1">

                <Link href="/profile">            {activeTab === "overview" && (

                  <Button className="w-full justify-start" variant="outline">              <div>

                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">                <h1 className="text-3xl font-bold text-gray-900 mb-8">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />                  Welcome back, John!

                    </svg>                </h1>

                    My Profile

                  </Button>                {/* Stats */}

                </Link>                <div className="grid md:grid-cols-4 gap-6 mb-8">

              </div>                  <Card className="p-6">

            </div>                    <div className="text-sm text-gray-600 mb-1">

          </div>                      Total Trips

        </div>                    </div>

      </div>                    <div className="text-3xl font-bold text-gray-900">12</div>

    </div>                  </Card>

  );                  <Card className="p-6">

}                    <div className="text-sm text-gray-600 mb-1">

                      Countries Visited
                    </div>
                    <div className="text-3xl font-bold text-gray-900">8</div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-sm text-gray-600 mb-1">Upcoming</div>
                    <div className="text-3xl font-bold text-gray-900">2</div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-sm text-gray-600 mb-1">
                      Total Spent
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      $8.5K
                    </div>
                  </Card>
                </div>

                {/* Upcoming Trips */}
                <Card className="p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Upcoming Trips
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                      <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Paris, France
                        </h3>
                        <p className="text-sm text-gray-600">
                          Dec 15 - Dec 22, 2025
                        </p>
                      </div>
                      <Button variant="link" className="text-blue-600">
                        View Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          Tokyo, Japan
                        </h3>
                        <p className="text-sm text-gray-600">
                          Jan 10 - Jan 20, 2026
                        </p>
                      </div>
                      <Button variant="link" className="text-blue-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Recommended */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Recommended for You
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      "Bali, Indonesia",
                      "Barcelona, Spain",
                      "New York, USA",
                    ].map((destination) => (
                      <div
                        key={destination}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {destination}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            From $899
                          </p>
                          <Button className="w-full" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "trips" && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  My Trips
                </h1>
                <p className="text-gray-600">
                  Your trip history and itineraries will appear here.
                </p>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Bookings
                </h1>
                <p className="text-gray-600">
                  Manage your flight, hotel, and activity bookings.
                </p>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Favorites
                </h1>
                <p className="text-gray-600">
                  Your saved destinations and experiences.
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account settings and preferences.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
