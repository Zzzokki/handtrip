"use client";

import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../../page";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetDestinationsQuery } from "@/types/generated";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Loader } from "lucide-react";

type DestinationSelectProps = {
  form: UseFormReturn<FormDataType>;
};

export const DestinationSelect = ({ form }: DestinationSelectProps) => {
  const { data, loading } = useGetDestinationsQuery({
    onError: (error) => toast.error(`Зориулалтын газар авахад алдаа гарлаа: ${error.message}`),
  });

  const destinationId = form.watch("destinationId");

  const selectedDestination = data?.getDestinations.find((destination) => destination.id === Number(destinationId));

  return (
    <FormField
      control={form.control}
      name="destinationId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Аяллын чиглэл
            <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Select
              disabled={loading}
              value={String(field.value)}
              onValueChange={(value) => {
                field.onChange(Number(value));
              }}
            >
              <SelectTrigger>
                {loading && (
                  <div className="flex gap-4 items-center">
                    <span>Аяллын чиглэл сонгох</span>
                    <Loader className="w-4 h-4 animate-spin" />
                  </div>
                )}

                {!loading && <span>{selectedDestination ? selectedDestination.name : "Аяллын чиглэл сонгох"}</span>}
              </SelectTrigger>
              <SelectContent>
                {data?.getDestinations.map((destination) => (
                  <SelectItem key={destination.id} value={destination.id.toString()}>
                    {destination.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>Аяллын чиглэлийг сонгоно уу.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
