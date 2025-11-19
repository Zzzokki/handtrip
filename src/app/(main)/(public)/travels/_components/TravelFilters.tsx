"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, MapPin, Sparkles, X } from "lucide-react";

interface TravelFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedDestinations: number[];
  onDestinationToggle: (id: number) => void;
  destinations: Array<{ id: number; name: string }>;
  selectedSubCategories: number[];
  onSubCategoryToggle: (id: number) => void;
  subCategories: Array<{ id: number; name: string }>;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TravelFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedDestinations,
  onDestinationToggle,
  destinations,
  selectedSubCategories,
  onSubCategoryToggle,
  subCategories,
  onClearFilters,
  hasActiveFilters,
}: TravelFiltersProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl p-6 sticky top-4 bg-gradient-to-br from-white to-gray-50/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Шүүлтүүр</h2>
          </div>
          {hasActiveFilters && (
            <Button onClick={onClearFilters} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <X className="w-4 h-4 mr-1" />
              Цэвэрлэх
            </Button>
          )}
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-gray-700">Хайлт</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Аялал хайх..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Destinations */}
        {destinations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-green-600" />
              <label className="text-sm font-semibold text-gray-700">Газар</label>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{destinations.length}</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {destinations.map((dest) => (
                <label key={dest.id} className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 p-3 rounded-xl transition-all duration-200 group">
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(dest.id)}
                    onChange={() => onDestinationToggle(dest.id)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-green-700 font-medium">{dest.name}</span>
                  {selectedDestinations.includes(dest.id) && <span className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium shadow-sm">✓</span>}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <label className="text-sm font-semibold text-gray-700">Ангилал</label>
              <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{categories.length}</span>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-3 rounded-xl transition-all duration-200 group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "all"}
                  onChange={() => onCategoryChange("all")}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">Бүх ангилал</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-3 rounded-xl transition-all duration-200 group">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => onCategoryChange(cat)}
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* SubCategories */}
        {subCategories.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <label className="text-sm font-semibold text-gray-700">Сонирхол</label>
              <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{subCategories.length}</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {subCategories.map((sc) => (
                <label key={sc.id} className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 p-3 rounded-xl transition-all duration-200 group">
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.includes(sc.id)}
                    onChange={() => onSubCategoryToggle(sc.id)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-purple-700 font-medium">{sc.name}</span>
                  {selectedSubCategories.includes(sc.id) && <span className="ml-auto text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-medium shadow-sm">✓</span>}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
