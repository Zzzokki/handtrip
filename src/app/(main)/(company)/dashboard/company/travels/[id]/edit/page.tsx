"use client";

import { useRouter, useParams } from "next/navigation";
import { useUpdateTravelMutation, useGetTravelQuery } from "@/types/generated";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateTravelHeader, BasicInfoSection, AgendaSection, TravelSessionsSection } from "../../create/_components";
import { Form } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UploadGallery } from "../../create/_components/UploadGallery";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function EditTravelPage() {
  const router = useRouter();
  const params = useParams();
  const travelId = parseInt(params.id as string);

  const { data, loading: loadingTravel } = useGetTravelQuery({
    variables: { getTravelId: travelId },
    skip: !travelId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      coverImage: "",
      duration: 1,
      totalSeatNumber: 1,
      destinationId: undefined,
      gallery: [],
      agendas: [],
      subCategoryIds: [],
      sessions: [],
    },
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (data?.getTravel) {
      const travel = data.getTravel;

      // Build agendas array - travel.agenda might be a single object or the GraphQL might return it differently
      const agendas = travel.agenda
        ? [
            {
              day: travel.agenda.day,
              name: travel.agenda.name,
              content: travel.agenda.description,
            },
          ]
        : [];

      form.reset({
        name: travel.name,
        description: travel.description,
        coverImage: travel.coverImage || "",
        duration: travel.duration,
        totalSeatNumber: travel.totalSeatNumber,
        destinationId: travel.destinationId,
        gallery: travel.gallery || [],
        subCategoryIds: travel.subCategories.map((sc) => sc.id),
        agendas: agendas,
        sessions: travel.travelSessions.map((session) => ({
          startDate: new Date(session.startDate),
          endDate: new Date(session.endDate),
          guideId: session.guideId,
          seatCost: session.seats?.[0]?.seatCost?.cost || 0,
        })),
      });
    }
  }, [data, form]);

  const [updateTravel, { loading: updating }] = useUpdateTravelMutation({
    onError: (error) => toast.error(`Аяллын багц шинэчлэхэд алдаа гарлаа: ${error.message}`),
    onCompleted: () => {
      toast.success("Аяллын багц амжилттай шинэчлэгдлээ");
      router.push("/dashboard/company/travels");
    },
    refetchQueries: ["GetTravelsByCompany", "GetTravel"],
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTravel({
        variables: {
          updateTravelId: travelId,
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
      console.error("Error updating travel:", error);
    }
  };

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);

    const errorMessages = Object.entries(errors).map(([field, error]: [string, any]) => {
      return `${field}: ${error.message}`;
    });

    if (errorMessages.length > 0) {
      toast.error("Форм бөглөхөд алдаа гарлаа", {
        description: errorMessages.slice(0, 3).join(", "),
      });
    }
  };

  if (loadingTravel) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6">
          <Skeleton className="h-12 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!data?.getTravel) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Аялал олдсонгүй</h2>
          <p className="text-gray-600 mb-6">Таны хайсан аялал олдсонгүй эсвэл устгагдсан байж магадгүй</p>
          <Link href="/dashboard/company/travels">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-6">
        <Link href="/dashboard/company/travels">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Аялал засах</h1>
        <p className="text-gray-600 mt-2">"{data.getTravel.name}" аяллын мэдээллийг шинэчлэх</p>
      </div>

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
                <Button type="button" variant="outline" className="border-gray-300 hover:bg-gray-100" disabled={updating}>
                  Цуцлах
                </Button>
              </Link>
              <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Шинэчилж байна...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Хадгалах
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
