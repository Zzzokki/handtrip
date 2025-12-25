"use client";

import { useAuth } from "@/components/providers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, Mail, Phone, Lock, Save, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useGetCompanyQuery } from "@/types/generated";

export default function CompanySettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data } = useGetCompanyQuery({
    variables: { getCompanyId: Number(user?.id || "0") },
    skip: !user,
  });

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!data) return;

    setCompanyName(data.getCompany.name || "");
    setEmail(data.getCompany.email || "");
    setPhoneNumber(data.getCompany.phoneNumber || "");
    setDescription(data.getCompany.description || "");
    setLogo(data.getCompany.logo || "");
    setCoverImage(data.getCompany.coverImage || "");
  }, [data]);

  const handleProfileUpdate = async () => {
    toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Шинэ нууц үг таарахгүй байна");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
      return;
    }

    // TODO: Implement GraphQL mutation to change password
    toast.success("Нууц үг амжилттай солигдлоо");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Тохиргоо</h1>
            <p className="text-sm text-gray-600">Компанийн мэдээлэл болон нууц үг солих</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Компанийн мэдээлэл
            </CardTitle>
            <CardDescription>Компанийн нэр, холбоо барих мэдээлэл болон тайлбар</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Компанийн нэр</Label>
              <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Жишээ: Номад Экспедишн" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Имэйл хаяг
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@company.mn" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Утасны дугаар
                </Label>
                <Input id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+976 7011 5678" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Тайлбар</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Компанийн тухай товч тайлбар..." rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo" className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  Лого (URL)
                </Label>
                <Input id="logo" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://example.com/logo.png" />
                {logo && (
                  <div className="mt-2">
                    <img src={logo} alt="Logo preview" className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage" className="flex items-center gap-1">
                  <Upload className="w-4 h-4" />
                  Арын зураг (URL)
                </Label>
                <Input id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://example.com/cover.png" />
                {coverImage && (
                  <div className="mt-2">
                    <img src={coverImage} alt="Cover preview" className="w-full h-24 rounded-lg object-cover border-2 border-gray-200" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Хадгалах
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-600" />
              Нууц үг солих
            </CardTitle>
            <CardDescription>Нууцлалын үүднээс хуучин нууц үгээ оруулна уу</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Одоогийн нууц үг</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Шинэ нууц үг</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Шинэ нууц үг давтах</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handlePasswordChange} variant="outline" disabled={!currentPassword || !newPassword || !confirmPassword}>
                <Lock className="w-4 h-4 mr-2" />
                Нууц үг солих
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Бүртгэлийн мэдээлэл</CardTitle>
            <CardDescription>Таны компанийн бүртгэлийн үндсэн мэдээлэл</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium text-gray-600">Хэрэглэгчийн нэр</span>
              <span className="text-sm text-gray-900">{data?.getCompany.name || "—"}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm font-medium text-gray-600">Бүртгэлийн төрөл</span>
              <span className="text-sm text-gray-900">Компани</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
