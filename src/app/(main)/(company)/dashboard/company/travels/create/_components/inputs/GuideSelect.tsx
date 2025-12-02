"use client";

import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../../page";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetGuidesByCompanyQuery } from "@/types/generated";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Loader, User } from "lucide-react";
import { useAuth } from "@/components/providers";

type GuideSelectProps = {
  form: UseFormReturn<FormDataType>;
  index: number;
};

export const GuideSelect = ({ form, index }: GuideSelectProps) => {
  const { data, loading } = useGetGuidesByCompanyQuery({
    onError: (error) => toast.error(`Хөтөч авахад алдаа гарлаа: ${error.message}`),
  });

  const guideId = form.watch(`sessions.${index}.guideId`);
  const selectedGuide = data?.getGuidesByCompany.find((guide) => guide.id === Number(guideId));

  return (
    <FormField
      control={form.control}
      name={`sessions.${index}.guideId`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
            <User className="w-4 h-4" />
            Хөтөч <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value ? String(field.value) : undefined} disabled={loading}>
              <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
                {loading && (
                  <div className="flex gap-2 items-center">
                    <span>Хөтөч сонгох</span>
                    <Loader className="w-4 h-4 animate-spin" />
                  </div>
                )}

                {!loading && (
                  <span className="flex items-center gap-2">
                    {selectedGuide ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        {selectedGuide.name}
                      </div>
                    ) : (
                      "Хөтөч сонгох"
                    )}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent>
                {data?.getGuidesByCompany.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">Хөтөч олдсонгүй. Эхлээд хөтөч нэмнэ үү.</div>
                ) : (
                  data?.getGuidesByCompany.map((guide) => (
                    <SelectItem key={guide.id} value={guide.id.toString()}>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        {guide.name}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription className="text-xs">Энэ хуваарьд томилох хөтчөө сонгоно уу</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
