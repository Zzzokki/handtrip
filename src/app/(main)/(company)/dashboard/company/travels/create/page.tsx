"use client";

import { useRouter } from "next/navigation";
import { useCreateTravelByCompanyMutation, GetTravelsByCompanyDocument } from "@/types/generated";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { CreateTravelHeader, BasicInfoSection, AgendaSection, TravelSessionsSection } from "./_components";
import { Form } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UploadGallery } from "./_components/UploadGallery";

const formSchema = z.object({
  name: z.string().min(1, "Аяллын нэр заавал шаардлагатай"),
  description: z.string().min(1, "Аяллын тайлбар заавал шаардлагатай"),
  coverImage: z.url("Аяллын зураг заавал шаардлагатай"),
  duration: z.number().min(1, "Хугацаа заавал шаардлагатай"),
  totalSeatNumber: z.number().min(1, "Нийт суудлын тоо заавал шаардлагатай"),
  gallery: z.array(z.url("Зураг буруу форматтай байна"), "Аяллын галерей").min(1, "Галерейд хамгийн багадаа 1 зураг байх ёстой"),
  destinationId: z.number().min(1, "Зориулалтын газар заавал шаардлагатай"),
  subCategoryIds: z.array(z.number()).min(1, "Хамгийн багадаа 1 ангилал сонгох шаардлагатай"),
  agendas: z
    .array(
      z.object({
        day: z.number().min(1),
        name: z.string().min(1, "Өдрийн нэр заавал шаардлагатай"),
        content: z.string().min(1, "Өдрийн агуулга заавал шаардлагатай"),
      })
    )
    .refine((agendas) => {
      const uniqueDays = new Set(agendas.map((agenda) => agenda.day));
      return uniqueDays.size === agendas.length;
    }, "Өдрийн дугаар давхцаж болохгүй"),
  sessions: z
    .array(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        guideId: z.number().min(1, "Хөтөч заавал шаардлагатай"),
        seatCost: z.number().min(0, "Суудлын үнэ 0-ээс их байх ёстой"),
      })
    )
    .min(1, "Хамгийн багадаа 1 хуваарь нэмэх шаардлагатай"),
});

export type FormDataType = z.infer<typeof formSchema>;

export default function CreateTravelPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      // Description
      description: "",

      // Cover Image
      coverImage: "",

      // Duration
      duration: 1,

      // Total Seat Number
      totalSeatNumber: 1,

      // Destination
      destinationId: undefined,

      // Gallery
      gallery: [],

      // Agendas
      agendas: [],

      // Subcategories
      subCategoryIds: [],

      // Travel Sessions
      sessions: [],
    },
  });

  const [createTravel, { loading }] = useCreateTravelByCompanyMutation({
    onError: (error) => toast.error(`Аяллын багц үүсгэхэд алдаа гарлаа: ${error.message}`),
    onCompleted: () => {
      toast.success("Аяллын багц амжилттай үүслээ");
      router.push("/dashboard/company/travels");
    },
    refetchQueries: ["GetTravelsByCompany"],
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTravel({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            coverImage: values.coverImage,
            duration: values.duration,
            totalSeatNumber: values.totalSeatNumber,
            gallery: values.gallery,
            destinationId: values.destinationId,
            agendas: values.agendas.map((agenda) => ({
              day: agenda.day,
              name: agenda.name,
              description: agenda.content,
            })),
            travelSessions: values.sessions,
            subCategoryIds: values.subCategoryIds,
          },
        },
      });
    } catch (error) {
      console.error("Error creating travel:", error);
    }
  };

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);

    // Show toast for validation errors
    const errorMessages = Object.entries(errors).map(([field, error]: [string, any]) => {
      return `${field}: ${error.message}`;
    });

    if (errorMessages.length > 0) {
      toast.error("Форм бөглөхөд алдаа гарлаа", {
        description: errorMessages.slice(0, 3).join(", "),
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <CreateTravelHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-6">
          <BasicInfoSection form={form} />

          <UploadGallery
            onUploadComplete={(urls) => {
              form.setValue("gallery", urls);
            }}
          />

          <AgendaSection form={form} />

          <TravelSessionsSection form={form} />

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 sm:-mx-6 lg:-mx-8 shadow-lg">
            <div className="max-w-7xl mx-auto flex gap-3 justify-end">
              <Link href="/dashboard/company/travels">
                <Button type="button" variant="outline" className="border-gray-300 hover:bg-gray-100" disabled={loading}>
                  Цуцлах
                </Button>
              </Link>
              <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Үүсгэж байна...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Аяллын багц үүсгэх
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
