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
    <Card className="border-0 shadow-md rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Холбоо барих</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <span className="text-sm">✉️</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Имэйл</p>
              <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline break-all">
                {company.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <span className="text-sm">📞</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-0.5">Утас</p>
              <a href={`tel:${company.phoneNumber}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                {company.phoneNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="pt-3 border-t">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-10 rounded-lg shadow-md hover:shadow-lg transition-all text-sm font-semibold">
            <span>Холбогдох</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="pt-3 border-t">
          <p className="font-semibold text-gray-900 mb-2 text-sm">Статистик</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs">Аяллын багцууд</span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">{travelCount}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs">Гишүүн болсон</span>
              <span className="font-semibold text-gray-900 text-sm">{new Date(company.createdAt).getFullYear()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
