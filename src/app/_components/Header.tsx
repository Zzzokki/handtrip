"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[99999] bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/travels" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Аяллууд
            </Link>
            <Link href="/companies" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Компаниуд
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Миний профайл
                </Link>
                <Link href="/dashboard/company" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Хянах самбар
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Гарах
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Нэвтрэх
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="font-semibold">
                    Эхлэх
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
