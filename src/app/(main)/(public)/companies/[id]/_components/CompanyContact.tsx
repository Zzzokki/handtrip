"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { Company } from "@/types/generated";

interface CompanyContactProps {
  company: Company;
  travelCount: number;
}

export default function CompanyContact({ company, travelCount }: CompanyContactProps) {
  return (
    <Card className="sticky top-4 border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Холбоо барих</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✉️</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 mb-1">Имэйл</p>
              <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-700 font-medium hover:underline break-all">
                {company.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📞</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Утас</p>
              <a href={`tel:${company.phoneNumber}`} className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                {company.phoneNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="pt-4 border-t">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all" size="lg">
            <span className="font-semibold">Холбогдох</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t">
          <p className="font-semibold text-gray-900 mb-3">Статистик</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Аяллын багцууд</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{travelCount}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Гишүүн болсон</span>
              <span className="font-semibold text-gray-900">{new Date(company.createdAt).getFullYear()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
