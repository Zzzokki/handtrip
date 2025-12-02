"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Phone, MapPin, User, Lock, Save, ArrowLeft } from "lucide-react";
import { CreateCompanyHeader } from "./_components";
import { toast } from "sonner";
import Link from "next/link";

export default function CreateCompanyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Компани амжилттай үүсгэлээ!");
      router.push("/manager/companies");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 w-full">
      <CreateCompanyHeader />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Компанийн мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Компанийн нэр *</Label>
                <Input id="name" name="name" placeholder="Travel Plus LLC" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Регистрийн дугаар *</Label>
                <Input id="registrationNumber" name="registrationNumber" placeholder="1234567890" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Тайлбар</Label>
              <Textarea id="description" name="description" placeholder="Компанийн талаар товч мэдээлэл" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Хаяг *
                </Label>
                <Input id="address" name="address" placeholder="Улаанбаатар хот, Сүхбаатар дүүрэг" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Утас *
                </Label>
                <Input id="phone" name="phone" type="tel" placeholder="+976 9999-1234" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-blue-600" />
              Нэвтрэх мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  И-мэйл *
                </Label>
                <Input id="email" name="email" type="email" placeholder="info@travelplus.mn" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Нууц үг *
                </Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={8} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Холбоо барих хүн</Label>
                <Input id="contactPerson" name="contactPerson" placeholder="Бат Болд" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Холбоо барих утас</Label>
                <Input id="contactPhone" name="contactPhone" type="tel" placeholder="+976 8888-5678" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Хадгалж байна..." : "Компани үүсгэх"}
          </Button>
          <Link href="/manager/companies">
            <Button type="button" variant="outline" className="border-slate-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
