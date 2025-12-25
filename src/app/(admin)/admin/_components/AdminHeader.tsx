import { Shield } from "lucide-react";

export const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Админ самбар</h1>
          <p className="text-slate-600">Системийн төлөв байдал болон статистик</p>
        </div>
      </div>
    </div>
  );
};
