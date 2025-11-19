interface WelcomeHeaderProps {
  userName: string;
}

export default function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">Компанийн хянах самбар</h1>
      <p className="text-lg text-slate-600">
        Тавтай морил, <span className="font-bold text-slate-900">{userName}</span>! 👋
      </p>
    </div>
  );
}
