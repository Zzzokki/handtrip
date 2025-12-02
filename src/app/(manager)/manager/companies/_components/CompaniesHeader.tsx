import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";

interface CompaniesHeaderProps {
  totalCompanies: number;
}

export const CompaniesHeader = ({ totalCompanies }: CompaniesHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Компаниуд</h1>
          <p className="text-slate-600">
            Бүх компаниудыг харах болон удирдах • <span className="font-semibold text-indigo-600">{totalCompanies} компани</span>
          </p>
        </div>
      </div>

      <Link href="/manager/companies/create">
        <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Компани үүсгэх
        </Button>
      </Link>
    </div>
  );
};
