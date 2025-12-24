import { LayoutDashboard } from "lucide-react";

export const ManagerHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Менежер самбар</h1>
          <p className="text-sm text-gray-500">Бүх системийн мэдээлэл болон удирдлага</p>
        </div>
      </div>
    </div>
  );
};
