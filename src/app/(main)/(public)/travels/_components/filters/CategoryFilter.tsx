"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategoriesQuery } from "@/types/generated";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Loader } from "lucide-react";
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
    if (subCategoryIds.includes(subCategoryId)) {
      setSubCategoryIds(subCategoryIds.filter((id) => id !== subCategoryId));
    } else {
      setSubCategoryIds([...subCategoryIds, subCategoryId]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader className="w-4 h-4 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <AccordionItem value="category" className="border-b-0">
      <AccordionTrigger className="border px-4 rounded-lg py-2 bg-slate-200">Ангилал</AccordionTrigger>
      <AccordionContent className="p-4 space-y-2">
        {data?.getCategories.map((category) => (
          <div key={category.id} className="space-y-2">
            <div className="text-sm font-medium text-gray-700">{category.name}</div>

            <div className="space-y-2">
              {category.subCategories?.map((subCategory) => (
                <div key={subCategory.id} className="flex gap-2 items-center ml-4">
                  <Checkbox checked={subCategoryIds.includes(subCategory.id)} onClick={() => handleClick(subCategory.id)} />

                  <div className="text-xs text-gray-500">{subCategory.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
