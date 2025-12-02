"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, CalendarDays, DollarSign, User } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormDataType } from "../page";
import { GuideSelect } from "./inputs";

type TravelSessionsSectionProps = {
  form: UseFormReturn<FormDataType>;
};

export const TravelSessionsSection = ({ form }: TravelSessionsSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessions",
  });

  const addSession = () => {
    append({
      startDate: new Date(),
      endDate: new Date(),
      guideId: 0,
      seatCost: 0,
    });
  };

  return (
    <Card className="overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Аяллын хуваарь</CardTitle>
              <CardDescription>Боломжтой огноо, хөтөч томилох</CardDescription>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addSession}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Хуваарь нэмэх
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {fields.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">Аяллын хуваарь нэмэх хэрэгтэй байна</p>
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="relative p-5 border-2 border-slate-200 rounded-xl bg-gradient-to-br from-white to-slate-50/50 hover:border-emerald-300 transition-colors">
            {fields.length > 1 && (
              <Button type="button" variant="destructive" size="sm" className="absolute top-3 right-3 shadow-sm hover:shadow-md transition-shadow" onClick={() => remove(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                <CalendarDays className="w-4 h-4" />
                Хуваарь {index + 1}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name={`sessions.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Эхлэх өдөр <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value instanceof Date ? field.value.toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`sessions.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      Дуусах өдөр <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value instanceof Date ? field.value.toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <GuideSelect form={form} index={index} />

              <FormField
                control={form.control}
                name={`sessions.${index}.seatCost`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Суудлын үнэ ($) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">Нэг суудлын үнийг оруулна уу</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
