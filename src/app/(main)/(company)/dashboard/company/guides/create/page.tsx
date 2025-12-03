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
    <div className="max-w-4xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Шинэ хөтөч нэмэх</h1>
          <p className="text-slate-600">Хөтчийн мэдээллийг бүрэн бөглөнө үү</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Image */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Профайл зураг
              </CardTitle>
              <CardDescription>Хөтчийн профайл зургийг оруулна уу</CardDescription>
            </CardHeader>
            <CardContent>
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
                              <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-xl object-cover border-2 border-slate-200" />
                              {isUploadingImage && (
                                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                              )}
                            </div>
                          )}
                          <label
                            htmlFor="profile-image"
                            className="flex-1 cursor-pointer border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                              </div>
                              <p className="text-sm font-medium text-slate-700">Зураг сонгох</p>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG • Хамгийн их 10MB</p>
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
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-blue-600" />
                Хувийн мэдээлэл
              </CardTitle>
              <CardDescription>Хөтчийн үндсэн мэдээлэл</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр *</FormLabel>
                    <FormControl>
                      <Input placeholder="Бат Болд" {...field} disabled={loading} />
                    </FormControl>
                    <FormDescription>Хөтчийн бүтэн нэр</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Тайлбар *
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Хөтчийн туршлага, мэргэжлийн талаар товч тайлбар бичнэ үү" rows={4} {...field} disabled={loading} />
                    </FormControl>
                    <FormDescription>Хөтчийн туршлага, мэргэжил</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5 text-emerald-600" />
                Холбоо барих мэдээлэл
              </CardTitle>
              <CardDescription>И-мэйл болон утасны дугаар</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        И-мэйл *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} disabled={loading} />
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
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Утас *
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+976 9999-1234" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={loading || isUploadingImage}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
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
              <Button type="button" variant="outline" className="border-slate-300" disabled={loading}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Буцах
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
