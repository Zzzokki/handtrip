import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Trash2, Mail, Phone, Users, Plus } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Хөтөч байхгүй байна</h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">Анхны хөтчөө нэмж аяллын багцуудад томилоорой</p>
        <Link href="/dashboard/company/guides/create">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Анхны хөтөч нэмэх
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {guides.map((guide) => (
        <Card key={guide.id} className="group relative overflow-hidden border border-gray-200 bg-white hover:shadow-xl hover:border-indigo-300 transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <CardContent className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-14 w-14 border-2 border-gray-200 group-hover:border-indigo-300 transition-colors">
                <AvatarImage src={guide.profileImage} alt={guide.name} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">{getInitials(guide.name)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-indigo-600 transition-colors">{guide.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{guide.description}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg">
                <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate">{guide.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg">
                <Phone className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>{guide.phoneNumber}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/dashboard/company/guides/${guide.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Харах
                </Button>
              </Link>

              <Link href={`/dashboard/company/guides/${guide.id}/edit`}>
                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all px-3">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
              </Link>

              <Button variant="destructive" size="sm" onClick={() => onDelete(guide.id)} className="bg-red-500 hover:bg-red-600 px-3">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
