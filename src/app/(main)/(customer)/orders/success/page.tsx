"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-2xl">
        <CardHeader className="text-center pt-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl mb-3 text-gray-900">Төлбөр амжилттай!</CardTitle>
          <p className="text-gray-600">Таны захиалга амжилттай баталгаажлаа. И-мэйл хаягаар баталгаажуулах мэдээлэл илгээгдлээ.</p>
        </CardHeader>
        <CardContent className="pb-12 space-y-3">
          <Button onClick={() => router.push("/customer")} className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold">
            Миний хуудас руу буцах
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" onClick={() => router.push("/travels")} className="w-full h-12 text-base font-semibold">
            Аялал үргэлжлүүлэн хайх
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
