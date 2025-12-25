import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Customer } from "@/types/generated";
import Link from "next/link";

interface UsersTableProps {
  users: Customer[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-100">
            <TableHead className="font-bold text-slate-900">ID</TableHead>
            <TableHead className="font-bold text-slate-900">Нэр</TableHead>
            <TableHead className="font-bold text-slate-900">И-мэйл</TableHead>
            <TableHead className="font-bold text-slate-900">Утас</TableHead>
            <TableHead className="font-bold text-slate-900">Бүртгэсэн</TableHead>
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
                <div className="text-xs text-slate-500">@{user.username}</div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-700">{user.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-600">{user.phoneNumber}</span>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {new Date(user.createdAt).toLocaleDateString("mn-MN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
