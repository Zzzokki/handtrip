"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Category, SubCategory } from "@/types/generated";
import { Check } from "lucide-react";

interface TravelFiltersProps {
  categories: Category[];
  subCategories: SubCategory[];
  selectedCategoryId: string | null;
  selectedSubCategoryIds: string[];
  onCategoryChange: (categoryId: string | null) => void;
  onSubCategoryToggle: (subCategoryId: string) => void;
  onClearFilters: () => void;
}

export default function TravelFilters({ categories, subCategories, selectedCategoryId, selectedSubCategoryIds, onCategoryChange, onSubCategoryToggle, onClearFilters }: TravelFiltersProps) {
  const filteredSubCategories = selectedCategoryId ? subCategories.filter((sub) => sub.categoryId === parseInt(selectedCategoryId)) : [];

  const hasFilters = selectedCategoryId !== null || selectedSubCategoryIds.length > 0;

  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Шүүлтүүр</CardTitle>
        {hasFilters && (
          <button onClick={onClearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
            Цэвэрлэх
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Ангилал</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${selectedCategoryId === null ? "bg-blue-50 text-blue-700 font-medium" : "hover:bg-gray-50 text-gray-700"}`}
            >
              Бүгд
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id.toString())}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                  selectedCategoryId === category.id.toString() ? "bg-blue-50 text-blue-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* SubCategories */}
        {selectedCategoryId !== null && filteredSubCategories.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Сонирхол</h3>
            <div className="space-y-1.5">
              {filteredSubCategories.map((subCategory) => {
                const isSelected = selectedSubCategoryIds.includes(subCategory.id);
                return (
                  <button
                    key={subCategory.id}
                    onClick={() => onSubCategoryToggle(subCategory.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all text-left"
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${isSelected ? "bg-purple-600 border-purple-600" : "border-gray-300"}`}>
                      {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="text-gray-700 text-sm">{subCategory.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasFilters && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-900 mb-2 text-xs">Идэвхтэй шүүлтүүр</h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategoryId !== null && (
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 text-xs">{categories.find((c) => c.id.toString() === selectedCategoryId)?.name}</Badge>
              )}
              {selectedSubCategoryIds.map((id) => {
                const subCategory = subCategories.find((s) => s.id.toString() === id);
                return (
                  <Badge key={id} className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0 text-xs">
                    {subCategory?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
