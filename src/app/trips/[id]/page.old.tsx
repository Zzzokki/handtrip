"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function TripDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app, fetch based on params.id
  const trip = {
    id: params.id,
    title: "Romantic Paris Getaway",
    location: "Paris, France",
    price: 1299,
    originalPrice: 1599,
    duration: "5 days, 4 nights",
    rating: 4.9,
    reviews: 234,
    maxGuests: 10,
    image: "from-blue-400 to-purple-600",
    badge: "Hot Deal",
    description:
      "Experience the magic of Paris with our carefully curated 5-day romantic getaway. Walk hand-in-hand along the Seine, marvel at the Eiffel Tower, explore world-class museums, and indulge in authentic French cuisine.",
    highlights: [
      "Guided tour of the Eiffel Tower with skip-the-line access",
      "Louvre Museum visit with art expert guide",
      "Seine River dinner cruise with champagne",
      "Day trip to Versailles Palace and Gardens",
      "French cooking class with a local chef",
      "Montmartre walking tour and artists' quarter exploration",
    ],
    included: [
      "4 nights accommodation in 4-star hotel",
      "Daily breakfast at the hotel",
      "Airport transfers",
      "All entrance fees and tickets",
      "Professional English-speaking guide",
      "Travel insurance",
    ],
    notIncluded: [
      "International flights",
      "Lunch and dinner (except cruise dinner)",
      "Personal expenses",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome Dinner",
        description:
          "Arrive in Paris, check into your hotel, and enjoy a welcome dinner at a traditional French bistro.",
      },
      {
        day: 2,
        title: "Iconic Paris",
        description:
          "Visit the Eiffel Tower, Arc de Triomphe, and Champs-Élysées. Evening Seine River cruise with dinner.",
      },
      {
        day: 3,
        title: "Art & Culture",
        description:
          "Explore the Louvre Museum, visit Notre-Dame Cathedral area, and stroll through the Latin Quarter.",
      },
      {
        day: 4,
        title: "Versailles Day Trip",
        description:
          "Full-day excursion to the Palace of Versailles and its magnificent gardens.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Morning cooking class, free time for shopping, then transfer to airport for departure.",
      },
    ],
  };

  const relatedTrips = [
    {
      id: 2,
      title: "Barcelona Beauty",
      location: "Spain",
      price: 1199,
      image: "from-yellow-400 to-orange-500",
    },
    {
      id: 3,
      title: "Rome Adventure",
      location: "Italy",
      price: 1399,
      image: "from-amber-400 to-red-500",
    },
    {
      id: 4,
      title: "London Explorer",
      location: "UK",
      price: 1599,
      image: "from-slate-400 to-blue-500",
    },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely magical! The tour was perfectly organized, and our guide was knowledgeable and friendly. The Seine cruise was the highlight!",
    },
    {
      name: "Michael Chen",
      rating: 5,
      date: "1 month ago",
      comment:
        "My wife and I had the most romantic time. Every detail was taken care of. Highly recommend for couples!",
    },
    {
      name: "Emma Davis",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great experience overall. The hotel was lovely and the tours were well-paced. Only wish we had more free time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              iTrip
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/trips">
                <Button variant="ghost">All Trips</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-96">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${trip.image}`}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <Badge className="mb-4 bg-white text-blue-600 hover:bg-white">
              {trip.badge}
            </Badge>
            <h1 className="text-5xl font-bold mb-2">{trip.title}</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {trip.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
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
                <span className="text-gray-700 font-medium">
                  {trip.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
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
                <span className="text-gray-700 font-medium">
                  Max {trip.maxGuests} guests
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(trip.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-700 font-semibold">
                  {trip.rating}
                </span>
                <span className="text-gray-500">({trip.reviews} reviews)</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === "overview"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("itinerary")}
                  className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === "itinerary"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === "reviews"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Trip
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {trip.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {trip.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-2">
                      {trip.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      What&apos;s Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trip.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "itinerary" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Day by Day Itinerary
                </h2>
                {trip.itinerary.map((day) => (
                  <Card key={day.day} className="p-6">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {day.title}
                        </h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h2>
                  <Button>Write a Review</Button>
                </div>
                {reviews.map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">
                            {review.name}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ${trip.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${trip.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-600">per person</p>
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
                    <span className="text-lg font-semibold w-12 text-center">
                      {travelers}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTravelers(Math.min(trip.maxGuests, travelers + 1))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${(trip.price * travelers).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-semibold">$99</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${(trip.price * travelers + 99).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button className="w-full mb-3" size="lg">
                Book Now
              </Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Free cancellation up to 24 hours
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Instant confirmation
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  24/7 customer support
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Trips */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedTrips.map((related) => (
              <Link key={related.id} href={`/trips/${related.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
                  <div className="relative h-48">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${related.image}`}
                    ></div>
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {related.location}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {related.title}
                    </h3>
                    <div className="text-2xl font-bold text-blue-600">
                      ${related.price.toLocaleString()}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">iTrip</div>
          <p className="text-sm">
            Making travel simple and accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
