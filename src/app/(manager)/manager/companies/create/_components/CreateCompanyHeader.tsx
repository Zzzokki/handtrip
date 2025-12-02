import { Building2 } from "lucide-react";

export const CreateCompanyHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Шинэ компани үүсгэх</h1>
        <p className="text-slate-600">Компанийн мэдээллийг бүрэн бөглөнө үү</p>
      </div>
    </div>
  );
};
