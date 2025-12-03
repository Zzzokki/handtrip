"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/travels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQuickSearch = (destination: string) => {
    router.push(`/travels?search=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="absolute top-[calc(100%-120px)] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
      <Card className="p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-md rounded-2xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Хаашаа явмаар байна вэ?</h3>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Газар, аялал хайх..."
                className={`w-full h-14 text-base pl-12 pr-4 rounded-xl border-2 transition-all duration-200 ${
                  isFocused ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200 hover:border-gray-300"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <Button
              className="h-14 px-8 text-base font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-200"
              size="lg"
              onClick={handleSearch}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Хайх
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
