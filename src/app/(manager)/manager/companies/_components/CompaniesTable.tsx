import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Eye, Edit } from "lucide-react";

interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: string;
  totalTravels?: number;
  totalOrders?: number;
}

interface CompaniesTableProps {
  companies: Company[];
}

export const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-50 hover:to-slate-100/50">
            <TableHead className="font-bold text-slate-900">ID</TableHead>
            <TableHead className="font-bold text-slate-900">Компани</TableHead>
            <TableHead className="font-bold text-slate-900">Холбоо барих</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Аяллууд</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Захиалга</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Төлөв</TableHead>
            <TableHead className="font-bold text-slate-900">Бүртгэсэн</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={company.id} className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-indigo-50/30 transition-colors`}>
              <TableCell className="font-semibold text-slate-900">#{company.id}</TableCell>
              <TableCell>
                <div className="font-semibold text-slate-900">{company.name}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span className="text-slate-700">{company.email}</span>
                  <span className="text-slate-500">{company.phone}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm">{company.totalTravels || 0}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-semibold text-sm">{company.totalOrders || 0}</span>
              </TableCell>
              <TableCell className="text-center">
                <Badge className={`${company.isVerified ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-amber-100 text-amber-800 border-amber-200"} border`}>
                  {company.isVerified ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Баталгаажсан
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Хүлээгдэж буй
                    </>
                  )}
                </Badge>
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
                  <Button variant="ghost" size="sm" className="hover:bg-indigo-50 hover:text-indigo-600">
                    <Edit className="w-4 h-4" />
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
