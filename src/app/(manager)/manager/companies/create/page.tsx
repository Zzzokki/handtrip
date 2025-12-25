"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone, User, Lock, Save, ArrowLeft, ImageIcon } from "lucide-react";
import { CreateCompanyHeader } from "./_components";
import { toast } from "sonner";
import Link from "next/link";
import { useCreateCompanyMutation, GetCompaniesDocument } from "@/types/generated";

export default function CreateCompanyPage() {
  const router = useRouter();
  const [createCompany, { loading }] = useCreateCompanyMutation({
    refetchQueries: [{ query: GetCompaniesDocument }],
    onCompleted: () => {
      toast.success("Компани амжилттай үүсгэлээ!");
      router.push("/manager/companies");
    },
    onError: (error) => {
      toast.error(error.message || "Компани үүсгэхэд алдаа гарлаа");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createCompany({
      variables: {
        input: {
          name: formData.get("name") as string,
          username: formData.get("username") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          phoneNumber: formData.get("phone") as string,
          description: formData.get("description") as string,
          logo: formData.get("logo") as string,
          coverImage: formData.get("coverImage") as string,
        },
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <CreateCompanyHeader />

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Building2 className="w-4 h-4 text-blue-600" />
              Үндсэн мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Компанийн нэр *
                </Label>
                <Input id="name" name="name" placeholder="Travel Plus LLC" required className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium">
                  Хэрэглэгчийн нэр *
                </Label>
                <Input id="username" name="username" placeholder="travelplus" required className="h-9" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium">
                Тайлбар
              </Label>
              <Textarea id="description" name="description" placeholder="Компанийн талаар товч мэдээлэл" rows={2} className="resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Утас *
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder="+976 9999-1234" required className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  И-мэйл *
                </Label>
                <Input id="email" name="email" type="email" placeholder="info@travelplus.mn" required className="h-9" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Lock className="w-4 h-4 text-blue-600" />
                Нэвтрэх мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Нууц үг *
                </Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={8} className="h-9" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                Зургууд
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="logo" className="text-sm font-medium">
                  Лого URL *
                </Label>
                <Input id="logo" name="logo" placeholder="https://example.com/logo.png" required className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="coverImage" className="text-sm font-medium">
                  Ковер зураг URL *
                </Label>
                <Input id="coverImage" name="coverImage" placeholder="https://example.com/cover.jpg" required className="h-9" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 h-10">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Хадгалж байна..." : "Компани үүсгэх"}
          </Button>
          <Link href="/manager/companies">
            <Button type="button" variant="outline" className="border-slate-300 h-10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
