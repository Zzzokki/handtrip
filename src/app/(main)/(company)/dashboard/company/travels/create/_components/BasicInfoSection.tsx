"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../page";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect, DestinationSelect, UploadCoverImage } from "./inputs";

type BasicInfoSectionProps = {
  form: UseFormReturn<FormDataType>;
};

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  const onCoverImageUploadComplete = (url: string) => {
    form.setValue("coverImage", url);
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Үндсэн мэдээлэл</CardTitle>
            <CardDescription>Аяллын багцын үндсэн мэдээллийг оруулна уу</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Аяллын нэр <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Жишээ нь: Швейцарийн Альп уулсын адал явдал" {...field} />
                </FormControl>
                <FormDescription>Аяллын багцын тодорхой, сонирхолтой нэр оруулна уу.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DestinationSelect form={form} />
        </div>

        <CategorySelect form={form} />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Тайлбар <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Жишээ нь: Энэ аялал нь таныг Швейцарийн Альпийн үзэсгэлэнт байгалийг судлах, орон нутгийн соёлтой танилцах боломжийг олгоно..." {...field} />
              </FormControl>
              <FormDescription>Аяллын багцын товч тайлбарыг бичнэ үү.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Хугацаа (өдөр) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    placeholder="Жишээ нь: 7"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(isNaN(value) ? "" : value);
                    }}
                  />
                </FormControl>
                <FormDescription>Аяллын нийт үргэлжлэх хугацааг өдрөөр оруулна уу.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalSeatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Нийт суудал <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    placeholder="Жишээ нь: 20"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(isNaN(value) ? "" : value);
                    }}
                  />
                </FormControl>
                <FormDescription>Аяллын багцад зориулсан нийт суудлын тоог оруулна уу.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <UploadCoverImage onUploadComplete={onCoverImageUploadComplete} />
      </CardContent>
    </Card>
  );
}
