import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2, Mail, Phone } from "lucide-react";
import { Guide } from "@/types/generated";
import Link from "next/link";

type GuidesTableProps = {
  guides: Guide[];
  onDelete: (id: number) => void;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const GuidesTable = ({ guides, onDelete }: GuidesTableProps) => {
  if (guides.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <Mail className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Хөтөч байхгүй байна</h3>
            <p className="text-sm text-slate-600">Эхний хөтчөө нэмээрэй</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs px-4">Хөтөч</TableHead>
            <TableHead className="text-xs px-4">Холбоо барих</TableHead>
            <TableHead className="text-xs px-4">Тайлбар</TableHead>
            <TableHead className="text-xs px-4">Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guides.map((guide) => (
            <TableRow key={guide.id} className="hover:bg-blue-50/30 transition-colors">
              <TableCell className="px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-slate-200">
                    <AvatarImage src={guide.profileImage} alt={guide.name} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">{getInitials(guide.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-900">{guide.name}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-4">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>{guide.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{guide.phoneNumber}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell className="px-4">
                <div className="max-w-xs">
                  <p className="text-sm text-slate-700 line-clamp-2">{guide.description}</p>
                </div>
              </TableCell>

              <TableCell className="px-4">
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/company/guides/${guide.id}`}>
                    <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600" title="Харах">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href={`/dashboard/company/guides/${guide.id}/edit`}>
                    <Button variant="outline" size="icon" className="hover:bg-indigo-50 hover:text-indigo-600" title="Засах">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Button variant="outline" size="icon" onClick={() => onDelete(guide.id)} className="hover:bg-red-50 hover:text-red-600" title="Устгах">
                    <Trash2 className="w-4 h-4" />
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
