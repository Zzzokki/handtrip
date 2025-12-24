"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategoriesQuery } from "@/types/generated";
import { AccordionContent } from "@radix-ui/react-accordion";
import { ChevronDown, Loader, Tag } from "lucide-react";
import { toast } from "sonner";

type CategoryFilterProps = {
  setSubCategoryIds: (ids: number[]) => void;
  subCategoryIds: number[];
};

export const CategoryFilter = ({ subCategoryIds, setSubCategoryIds }: CategoryFilterProps) => {
  const { data, loading } = useGetCategoriesQuery({
    onError: (error) => toast.error("Ангилал авахад алдаа гарлаа", { description: error.message }),
  });

  const handleClick = (subCategoryId: number) => {
    console.log("Category clicked:", subCategoryId, "Current selected:", subCategoryIds);
    if (subCategoryIds.includes(subCategoryId)) {
      const newIds = subCategoryIds.filter((id) => id !== subCategoryId);
      console.log("Removing category, new IDs:", newIds);
      setSubCategoryIds(newIds);
    } else {
      const newIds = [...subCategoryIds, subCategoryId];
      console.log("Adding category, new IDs:", newIds);
      setSubCategoryIds(newIds);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader className="w-5 h-5 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <AccordionItem value="category" className="border-b-0">
      <AccordionTrigger className="px-3 py-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-100 hover:border-blue-200 text-sm font-semibold text-gray-900 group">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          Ангилал
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-3 pb-1 space-y-3">
        {data?.getCategories.map((category) => (
          <div key={category.id} className="space-y-2">
            <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide px-1">{category.name}</div>

            <div>
              {category.subCategories?.map((subCategory) => {
                const isChecked = subCategoryIds.includes(subCategory.id);
                return (
                  <label
                    key={subCategory.id}
                    className={`
                      flex items-center gap-2.5 ml-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                      ${isChecked ? "bg-blue-50 border border-blue-200 shadow-sm" : "hover:bg-gray-50 border border-transparent"}
                    `}
                  >
                    <Checkbox checked={isChecked} onClick={() => handleClick(subCategory.id)} className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                    <span className={`text-sm ${isChecked ? "font-medium text-blue-900" : "text-gray-600"}`}>{subCategory.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
