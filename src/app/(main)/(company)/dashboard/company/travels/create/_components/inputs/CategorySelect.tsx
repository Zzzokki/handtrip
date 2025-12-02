"use client";

import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../../page";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetCategoriesQuery } from "@/types/generated";
import { toast } from "sonner";
import { Loader, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CategorySelectProps = {
  form: UseFormReturn<FormDataType>;
};

export const CategorySelect = ({ form }: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading } = useGetCategoriesQuery({
    onError: (error) => toast.error(`Ангилал авахад алдаа гарлаа: ${error.message}`),
  });

  const selectedIds = form.watch("subCategoryIds") || [];

  const toggleSubCategory = (subCategoryId: number) => {
    const currentIds = form.getValues("subCategoryIds") || [];
    if (currentIds.includes(subCategoryId)) {
      form.setValue(
        "subCategoryIds",
        currentIds.filter((id) => id !== subCategoryId)
      );
    } else {
      form.setValue("subCategoryIds", [...currentIds, subCategoryId]);
    }
  };

  const getSelectedSubCategories = () => {
    if (!data?.getCategories) return [];
    const selected: { id: number; name: string; categoryName: string }[] = [];
    data.getCategories.forEach((category) => {
      category.subCategories?.forEach((sub) => {
        if (selectedIds.includes(sub.id)) {
          selected.push({
            id: sub.id,
            name: sub.name,
            categoryName: category.name,
          });
        }
      });
    });
    return selected;
  };

  const selectedSubCategories = getSelectedSubCategories();

  return (
    <FormField
      control={form.control}
      name="subCategoryIds"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Аяллын төрөл
            <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div
                className={cn(
                  "min-h-[42px] rounded-md border border-input bg-background px-3 py-2 cursor-pointer transition-colors",
                  "hover:border-purple-300 focus-within:border-purple-500",
                  isOpen && "border-purple-500"
                )}
                onClick={() => setIsOpen(!isOpen)}
              >
                {loading ? (
                  <div className="flex gap-2 items-center text-muted-foreground">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Ангилал ачааллаж байна...</span>
                  </div>
                ) : selectedSubCategories.length === 0 ? (
                  <span className="text-muted-foreground">Аяллын төрөл сонгох</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSubCategories.map((sub) => (
                      <Badge key={sub.id} variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                        {sub.categoryName}: {sub.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {isOpen && !loading && (
                <div className="border rounded-md p-4 space-y-4 bg-card shadow-sm">
                  {data?.getCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h4 className="font-medium text-sm text-purple-700 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-purple-500" />
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-3">
                        {category.subCategories?.map((sub) => {
                          const isSelected = selectedIds.includes(sub.id);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubCategory(sub.id);
                              }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all",
                                "hover:bg-purple-50 hover:border-purple-300",
                                isSelected ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-500 text-purple-700 font-medium" : "bg-background border-input"
                              )}
                            >
                              <div className={cn("w-4 h-4 rounded-sm border flex items-center justify-center transition-colors", isSelected ? "bg-purple-600 border-purple-600" : "border-input")}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span>{sub.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>Аяллын төрлүүдийг сонгоно уу. (Олон сонголт боломжтой)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
