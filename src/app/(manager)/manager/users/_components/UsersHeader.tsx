import { Users } from "lucide-react";

interface UsersHeaderProps {
  totalUsers: number;
}

export const UsersHeader = ({ totalUsers }: UsersHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Хэрэглэгчид</h1>
          <p className="text-slate-600">
            Платформ дахь бүх хэрэглэгчдийг харах • <span className="font-semibold text-blue-600">{totalUsers} хэрэглэгч</span>
          </p>
        </div>
      </div>
    </div>
  );
};
