"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetCategoriesQuery } from "@/types/generated";
import { AccordionContent } from "@radix-ui/react-accordion";
import { toast } from "sonner";

export const CategoryFilter = () => {
  const { data } = useGetCategoriesQuery({
    onError: (error) => toast.error("Ангилал авахад алдаа гарлаа", { description: error.message }),
  });

  console.log("GG", data);

  return (
    <AccordionItem value="category">
      <AccordionTrigger>Ангилал</AccordionTrigger>
      <AccordionContent>
        {data?.getCategories.map((category) => (
          <div key={category.id}>
            <div className="text-sm text-gray-700">{category.name}</div>
            <div>
              {category.subCategories?.map((subCategory) => (
                <div key={subCategory.id} className="text-xs text-gray-500 ml-4">
                  {subCategory.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
