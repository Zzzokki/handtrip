"use client";

import { useAuth } from "@/components";

export const WelcomeHeader = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-1">Компаний хянах самбар</h1>
      <p className="text-lg text-slate-600">
        Тавтай морил, <span className="font-bold text-slate-900">{user?.name}</span>! 👋
      </p>
    </div>
  );
};
