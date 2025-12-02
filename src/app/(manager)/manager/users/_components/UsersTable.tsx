import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: "customer" | "company";
  createdAt: string;
  totalOrders?: number;
}

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-50 hover:to-slate-100/50">
            <TableHead className="font-bold text-slate-900">ID</TableHead>
            <TableHead className="font-bold text-slate-900">Нэр</TableHead>
            <TableHead className="font-bold text-slate-900">И-мэйл</TableHead>
            <TableHead className="font-bold text-slate-900">Утас</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Төрөл</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Захиалга</TableHead>
            <TableHead className="font-bold text-slate-900">Бүртгэсэн</TableHead>
            <TableHead className="font-bold text-slate-900 text-center">Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/30 transition-colors`}>
              <TableCell className="font-semibold text-slate-900">#{user.id}</TableCell>
              <TableCell>
                <div className="font-semibold text-slate-900">
                  {user.firstName} {user.lastName}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-700">{user.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-600">{user.phone}</span>
              </TableCell>
              <TableCell className="text-center">
                <Badge className={`${user.type === "customer" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-purple-100 text-purple-800 border-purple-200"} border`}>
                  {user.type === "customer" ? "Аяллагч" : "Компани"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-semibold text-sm">{user.totalOrders || 0}</span>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {new Date(user.createdAt).toLocaleDateString("mn-MN", {
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
