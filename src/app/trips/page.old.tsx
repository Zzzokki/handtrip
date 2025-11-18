"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTravelsQuery } from "@/graphql/generated";

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data, loading, error } = useGetTravelsQuery();

  const trips = useMemo(() => {
    if (!data?.travels) return [];
    
    return data.travels.map((travel) => ({
      id: travel.id,
      title: travel.name,
      location: `Trip by ${travel.company?.name || "Unknown Company"}`,
      price: parseFloat(travel.price || "0"),
      duration: `${travel.duration} days`,
      rating: 4.5,
      reviews: 0,
      category: "adventure",
      image: travel.coverImage || "from-blue-400 to-purple-600",
      description: travel.description,
      maxGuests: travel.maxGuests,
      minAge: travel.minAge,
    }));
  }, [data]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        searchQuery === "" ||
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "budget" && trip.price < 1500) ||
        (priceRange === "mid" && trip.price >= 1500 && trip.price < 2500) ||
        (priceRange === "luxury" && trip.price >= 2500);

      return matchesSearch && matchesPrice;
    });
  }, [trips, searchQuery, priceRange]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trips...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
            Failed to load trips
          </h3>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }
      reviews: 167,
      category: "cultural",
      image: "from-yellow-400 to-orange-500",
    },
    {
      id: 6,
      title: "NYC Explorer Adventure",
      location: "New York, USA",
      price: 1599,
      duration: "5 days",
      rating: 4.7,
      reviews: 223,
      category: "city",
      image: "from-purple-400 to-indigo-500",
    },
    {
      id: 7,
      title: "Greek Islands Cruise",
      location: "Santorini, Greece",
      price: 1799,
      duration: "8 days",
      rating: 4.9,
      reviews: 312,
      category: "beach",
      image: "from-teal-400 to-blue-500",
      badge: "Popular",
      badgeColor: "green",
    },
    {
      id: 8,
      title: "Amazon Rainforest Adventure",
      location: "Manaus, Brazil",
      price: 2199,
      duration: "10 days",
      rating: 4.6,
      reviews: 87,
      category: "adventure",
      image: "from-green-500 to-emerald-600",
    },
    {
      id: 9,
      title: "Swiss Alps Experience",
      location: "Interlaken, Switzerland",
      price: 2799,
      duration: "6 days",
      rating: 4.9,
      reviews: 201,
      category: "adventure",
      image: "from-blue-300 to-slate-500",
    },
    {
      id: 10,
      title: "Ancient Rome Discovery",
      location: "Rome, Italy",
      price: 1399,
      duration: "5 days",
      rating: 4.8,
      reviews: 278,
      category: "cultural",
      image: "from-amber-400 to-red-500",
    },
    {
      id: 11,
      title: "Maldives Beach Resort",
      location: "Maldives",
      price: 3299,
      duration: "7 days",
      rating: 5.0,
      reviews: 156,
      category: "beach",
      image: "from-cyan-400 to-blue-600",
      badge: "Luxury",
      badgeColor: "yellow",
    },
    {
      id: 12,
      title: "Iceland Northern Lights",
      location: "Reykjavik, Iceland",
      price: 2499,
      duration: "6 days",
      rating: 4.8,
      reviews: 142,
      category: "adventure",
      image: "from-indigo-400 to-purple-600",
    },
  ];

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || trip.category === selectedCategory;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && trip.price < 1500) ||
      (priceRange === "mid" && trip.price >= 1500 && trip.price < 2500) ||
      (priceRange === "luxury" && trip.price >= 2500);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              iTrip
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">Home</Button>
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore All Destinations
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Find your perfect adventure from our curated collection of trips
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <Input
              type="text"
              placeholder="Search by destination or trip name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 text-lg bg-white"
            />
          </div>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <Card className="p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beach">Beach & Resort</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="city">City Tours</SelectItem>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget (&lt; $1,500)</SelectItem>
                    <SelectItem value="mid">
                      Mid-Range ($1,500 - $2,500)
                    </SelectItem>
                    <SelectItem value="luxury">Luxury ($2,500+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setPriceRange("all");
                }}
              >
                Reset Filters
              </Button>
            </Card>
          </aside>

          {/* Trips Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredTrips.length}</span>{" "}
                trips
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group h-full">
                    <div className="relative h-56 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${trip.image}`}
                      ></div>
                      {trip.badge && (
                        <div
                          className={`absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-${trip.badgeColor}-600`}
                        >
                          {trip.badge}
                        </div>
                      )}
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {trip.location}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {trip.duration}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">From</span>
                          <div className="text-2xl font-bold text-blue-600">
                            ${trip.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-gray-900 font-semibold">
                            {trip.rating}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({trip.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredTrips.length === 0 && (
              <div className="text-center py-16">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No trips found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPriceRange("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
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
