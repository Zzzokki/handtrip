import { LayoutDashboard } from "lucide-react";

export const ManagerHeader = () => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <LayoutDashboard className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Менежер самбар</h1>
          <p className="text-slate-600">Бүх системийн мэдээлэл болон удирдлага</p>
        </div>
      </div>
    </div>
  );
};
