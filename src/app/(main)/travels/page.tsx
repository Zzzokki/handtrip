"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetTravelsQuery } from "@/types/generated";
import { Header, Footer } from "@/app/_components";

export default function TravelsPage() {
  const { data, loading, error } = useGetTravelsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "duration">("name");

  // Filter and sort travels
  const filteredTravels = useMemo(() => {
    if (!data?.getTravels) return [];

    let filtered = [...data.getTravels];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (travel) =>
          travel.name.toLowerCase().includes(query) ||
          travel.description.toLowerCase().includes(query) ||
          travel.destination?.name.toLowerCase().includes(query) ||
          travel.company?.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((travel) => travel.categories?.some((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.duration - b.duration;
      }
    });

    return filtered;
  }, [data?.getTravels, searchQuery, selectedCategory, sortBy]);

  // Extract unique categories
  const categories = useMemo(() => {
    if (!data?.getTravels) return [];
    const cats = new Set<string>();
    data.getTravels.forEach((travel) => {
      travel.categories?.forEach((cat) => cats.add(cat.name));
    });
    return Array.from(cats);
  }, [data?.getTravels]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Explore All Destinations</h1>
          <p className="text-xl text-blue-100 max-w-2xl">Discover amazing travel experiences around the world</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input type="text" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "duration")}
                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Name</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold">{filteredTravels.length}</span> {filteredTravels.length === 1 ? "destination" : "destinations"}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Destinations</h3>
              <p className="text-red-600">{error.message || "Please try again later."}</p>
            </div>
          </div>
        )}

        {/* Travels Grid */}
        {!loading && !error && filteredTravels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No destinations found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {!loading && !error && filteredTravels.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTravels.map((travel) => (
              <Link key={travel.id} href={`/travels/${travel.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {travel.coverImage ? (
                      <img src={travel.coverImage} alt={travel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-700">{travel.duration} days</span>
                    </div>

                    {/* Category Badges */}
                    {travel.categories && travel.categories.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">{travel.categories[0].name}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{travel.name}</h3>

                    {/* Destination */}
                    {travel.destination && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{travel.destination.name}</span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{travel.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>Max {travel.totalSeatNumber}</span>
                      </div>

                      {/* Available Sessions */}
                      {travel.travelSessions && travel.travelSessions.length > 0 && (
                        <span className="text-green-600 font-medium">
                          {travel.travelSessions.length} session
                          {travel.travelSessions.length !== 1 ? "s" : ""} available
                        </span>
                      )}
                    </div>

                    {/* Company */}
                    {travel.company && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          by <span className="font-semibold text-gray-700">{travel.company.name}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
