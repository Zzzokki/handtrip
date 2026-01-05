"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PriceFilterProps = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  setMaxPrice: (price: number | undefined) => void;
};

export const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }: PriceFilterProps) => {
  const handleMinPriceChange = (value: string) => {
    if (value === "") {
      setMinPrice(undefined);
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0) {
        setMinPrice(num);
      }
    }
  };

  const handleMaxPriceChange = (value: string) => {
    if (value === "") {
      setMaxPrice(undefined);
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0) {
        setMaxPrice(num);
      }
    }
  };

  return (
    <AccordionItem value="price" className="border-b-0 mb-4">
      <AccordionTrigger className="px-3 py-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-100 hover:border-blue-200 text-sm font-semibold text-gray-900 group">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-blue-600" />
          Үнийн хязгаар
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-3 pb-1 space-y-3">
        <div className="space-y-3 px-3">
          <div className="space-y-1.5">
            <Label htmlFor="minPrice" className="text-xs font-medium text-gray-600">
              Доод үнэ (₮)
            </Label>
            <Input id="minPrice" type="number" min="0" placeholder="0" value={minPrice ?? ""} onChange={(e) => handleMinPriceChange(e.target.value)} className="h-9 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="maxPrice" className="text-xs font-medium text-gray-600">
              Дээд үнэ (₮)
            </Label>
            <Input id="maxPrice" type="number" min="0" placeholder="Хязгааргүй" value={maxPrice ?? ""} onChange={(e) => handleMaxPriceChange(e.target.value)} className="h-9 text-sm" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
