"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers";
import { useRegisterAsCustomerMutation } from "@/types/generated";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [registerAsCustomer, { loading }] = useRegisterAsCustomerMutation();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Нууц үг таарахгүй байна!");
      return;
    }

    try {
      const result = await registerAsCustomer({
        variables: {
          input: {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (result.data?.registerAsCustomer) {
        const { token, customer: user } = result.data.registerAsCustomer;
        login(
          {
            id: user.id.toString(),
            role: "customer",
          },
          token
        );
        router.push("/customer");
      }
    } catch (error: any) {
      toast.error(error.message || "Бүртгэл амжилтгүй боллоо");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-8 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</h1>
          </div>
          <p className="text-gray-600 text-sm">Шинэ бүртгэл үүсгэж аялал эхлүүлээрэй</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
                Хэрэглэгчийн нэр
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  placeholder="Хэрэглэгчийн нэр"
                  className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                    Нэр
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    placeholder="Нэр"
                    className="h-10 border-gray-300 focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                    Овог
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    placeholder="Овог"
                    className="h-10 border-gray-300 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                  Утасны дугаар
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    placeholder="+976 9999-9999"
                    className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                И-мэйл хаяг
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="example@mail.com"
                  className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Нууц үг
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Нууц үг үүсгэх"
                  className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Нууц үг баталгаажуулах
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  placeholder="Нууц үгээ дахин оруулна уу"
                  className="pl-10 h-10 border-gray-300 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <Label htmlFor="terms" className="text-xs font-normal leading-relaxed cursor-pointer text-gray-600">
                Би{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Үйлчилгээний нөхцөл
                </Link>{" "}
                болон{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                  Нууцлалын бодлого
                </Link>
                -той танилцаж зөвшөөрч байна
              </Label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-10 font-semibold shadow-md hover:shadow-lg transition-all duration-200" disabled={loading}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Бүртгэж байна...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Бүртгүүлэх
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-gray-600">
          Бүртгэлтэй юу?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline">
            Нэвтрэх
          </Link>
        </p>
      </div>
    </div>
  );
}
