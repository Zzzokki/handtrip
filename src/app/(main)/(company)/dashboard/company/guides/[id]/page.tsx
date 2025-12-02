"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetGuideByCompanyQuery, useDeleteGuideMutation } from "@/types/generated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Edit, Trash2, Mail, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Params = {
  id: string;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function GuideDetailPage() {
  const { id } = useParams<Params>();
  const router = useRouter();

  const guideId = parseInt(id);

  const { data, loading } = useGetGuideByCompanyQuery({
    variables: { getGuideId: guideId },
    onError: (error) => {
      toast.error("Хөтчийн мэдээлэл авахад алдаа гарлаа", {
        description: error.message,
      });
    },
  });

  const guide = data?.getGuideByCompany;

  const [deleteGuide, { loading: deleting }] = useDeleteGuideMutation({
    onCompleted: () => {
      toast.success("Хөтчийг амжилттай устгалаа");
      router.push("/dashboard/company/guides");
    },
    onError: (error) => {
      toast.error("Хөтчийг устгахад алдаа гарлаа", {
        description: error.message,
      });
    },
  });

  const handleDelete = async () => {
    await deleteGuide({
      variables: {
        deleteGuideId: guideId,
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Хөтчийн мэдээлэл уншиж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!guide) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard/company/guides">
          <Button variant="outline" className="border-slate-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Буцах
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Link href={`/dashboard/company/guides/${guideId}/edit`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              Засах
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Устгаж байна...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Устгах
              </>
            )}
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50/50 border-b border-slate-200">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={guide.profileImage} alt={guide.name} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">{getInitials(guide.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{guide?.name}</h1>
              </div>
              <p className="text-slate-600 leading-relaxed">{guide.description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-slate-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            Холбоо барих мэдээлэл
          </CardTitle>
          <CardDescription>И-мэйл болон утасны дугаар</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">И-мэйл хаяг</p>
                <p className="text-base font-semibold text-slate-900">{guide.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Утасны дугаар</p>
                <p className="text-base font-semibold text-slate-900">{guide.phoneNumber}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
