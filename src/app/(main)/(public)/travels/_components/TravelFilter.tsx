"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CategoryFilter, PriceFilter } from "./filters";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type TravelFilterProps = {
  subCategoryIds: number[];
  setSubCategoryIds: (ids: number[]) => void;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  setMaxPrice: (price: number | undefined) => void;
};

export const TravelFilter = (props: TravelFilterProps) => {
  const { subCategoryIds, setSubCategoryIds, minPrice, maxPrice, setMinPrice, setMaxPrice } = props;

  const handleClearAll = () => {
    setSubCategoryIds([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  return (
    <Card className="border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Шүүлтүүр</h3>
          </div>
          {(subCategoryIds.length > 0 || minPrice !== undefined || maxPrice !== undefined) && (
            <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <X className="w-3 h-3 mr-1" />
              Цэвэрлэх
            </Button>
          )}
        </div>
        {(subCategoryIds.length > 0 || minPrice !== undefined || maxPrice !== undefined) && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Сонгосон:</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {subCategoryIds.length + (minPrice !== undefined ? 1 : 0) + (maxPrice !== undefined ? 1 : 0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <Accordion type="multiple" defaultValue={["price", "category"]}>
          <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          <CategoryFilter subCategoryIds={subCategoryIds} setSubCategoryIds={setSubCategoryIds} />
        </Accordion>
      </div>
    </Card>
  );
};
