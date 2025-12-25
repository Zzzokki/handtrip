import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Company } from "@/types/generated";

interface CompaniesTableProps {
  companies: Company[];
}

export const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-100">
            <TableHead className="font-bold text-slate-900">ID</TableHead>
            <TableHead className="font-bold text-slate-900">Компани</TableHead>
            <TableHead className="font-bold text-slate-900">Холбоо барих</TableHead>
            <TableHead className="font-bold text-slate-900">Бүртгэсэн</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={company.id} className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}>
              <TableCell className="font-semibold text-slate-900">#{company.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {company.logo && <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />}
                  <div>
                    <div className="font-semibold text-slate-900">{company.name}</div>
                    <div className="text-xs text-slate-500">@{company.username}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="text-slate-700">{company.email}</span>
                  <span className="text-slate-500">{company.phoneNumber}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {new Date(company.createdAt).toLocaleDateString("mn-MN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
