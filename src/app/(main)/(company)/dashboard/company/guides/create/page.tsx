"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User, Mail, Phone, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { GetGuidesByCompanyDocument, useCreateGuideMutation } from "@/types/generated";
import { useState } from "react";
import { upload } from "@vercel/blob/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой",
  }),
  description: z.string().min(10, {
    message: "Тайлбар хамгийн багадаа 10 тэмдэгт байх ёстой",
  }),
  email: z.string().email({
    message: "И-мэйл хаяг буруу байна",
  }),
  phoneNumber: z.string().min(8, {
    message: "Утасны дугаар хамгийн багадаа 8 тоо байх ёстой",
  }),
  profileImage: z.string().url({
    message: "Профайл зураг оруулна уу",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateGuidePage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
      phoneNumber: "",
      profileImage: "",
    },
  });

  const [createGuide, { loading }] = useCreateGuideMutation({
    onCompleted: () => {
      toast.success("Хөтчийг амжилттай үүсгэлээ!");
      router.push("/dashboard/company/guides");
    },
    onError: (error) => {
      toast.error("Хөтөч үүсгэхэд алдаа гарлаа", {
        description: error.message,
      });
    },
    refetchQueries: [GetGuidesByCompanyDocument],
  });

  const handleImageChange = async (file: File) => {
    if (file.type.split("/")[0] !== "image") {
      toast.error("Зөвхөн зураг оруулах боломжтой!");
      return;
    }

    if (file.size / 1024 / 1024 > 10) {
      toast.error("Зурагны хэмжээ 10MB-с их байж болохгүй!");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    // Auto-upload
    setIsUploadingImage(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      form.setValue("profileImage", blob.url);
      toast.success("Зураг амжилттай байршуулагдлаа!");
    } catch (error) {
      toast.error("Зураг байршуулахад алдаа гарлаа");
      setImageFile(null);
      setImagePreview(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await createGuide({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            email: values.email,
            phoneNumber: values.phoneNumber,
            profileImage: values.profileImage,
          },
        },
      });
    } catch (error) {
      // Error handled by onError callback
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="mb-6 space-y-3">
        <Link href="/dashboard/company/guides">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Шинэ хөтөч нэмэх</h1>
            <p className="text-sm text-gray-600">Хөтчийн мэдээллийг бүрэн бөглөнө үү</p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-24">
          {/* Profile Image */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">Профайл зураг</CardTitle>
                  <CardDescription className="text-sm">Хөтчийн профайл зургийг оруулна уу</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          {imagePreview && (
                            <div className="relative">
                              <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 shadow-sm" />
                              {isUploadingImage && (
                                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                                </div>
                              )}
                            </div>
                          )}
                          <label
                            htmlFor="profile-image"
                            className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-5 hover:border-purple-400 hover:bg-purple-50/50 transition-all"
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                                <ImageIcon className="w-5 h-5 text-purple-600" />
                              </div>
                              <p className="text-sm font-medium text-gray-700">Зураг сонгох</p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG • Хамгийн их 10MB</p>
                            </div>
                            <input
                              id="profile-image"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              disabled={isUploadingImage || loading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageChange(file);
                              }}
                            />
                          </label>
                        </div>
                        <Input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">Хувийн мэдээлэл</CardTitle>
                  <CardDescription className="text-sm">Хөтчийн үндсэн мэдээлэл</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Нэр *</FormLabel>
                    <FormControl>
                      <Input placeholder="Бат Болд" {...field} disabled={loading} className="border-gray-300" />
                    </FormControl>
                    <FormDescription className="text-xs">Хөтчийн бүтэн нэр</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FileText className="w-3.5 h-3.5" />
                      Тайлбар *
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Хөтчийн туршлага, мэргэжлийн талаар товч тайлбар бичнэ үү" rows={3} {...field} disabled={loading} className="border-gray-300" />
                    </FormControl>
                    <FormDescription className="text-xs">Хөтчийн туршлага, мэргэжил</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">Холбоо барих мэдээлэл</CardTitle>
                  <CardDescription className="text-sm">И-мэйл болон утасны дугаар</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-3.5 h-3.5" />
                        И-мэйл *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} disabled={loading} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-3.5 h-3.5" />
                        Утас *
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+976 9999-1234" {...field} disabled={loading} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sticky Actions */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <Button
                type="submit"
                disabled={loading || isUploadingImage}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Хадгалж байна...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Хөтөч үүсгэх
                  </>
                )}
              </Button>
              <Link href="/dashboard/company/guides">
                <Button type="button" variant="outline" className="border-gray-300" disabled={loading}>
                  Цуцлах
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
