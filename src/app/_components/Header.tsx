"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, LayoutDashboard, LogOut, Map, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/travels", label: "Аяллууд", icon: Map },
    { href: "/companies", label: "Компаниуд", icon: Building2 },
  ];

  const dashboardLink = user?.role === "customer" ? "/customer" : "/dashboard/company";

  return (
    <header className="fixed top-0 left-0 w-full z-[99999] bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    ${active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}

            {isAuthenticated && (
              <Link
                href={dashboardLink}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${isActive(dashboardLink) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                `}
              >
                <LayoutDashboard className="w-4 h-4" />
                Хянах самбар
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline" size="sm" className="gap-1.5 h-9">
                <LogOut className="w-3.5 h-3.5" />
                Гарах
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="h-9">
                    Нэвтрэх
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="font-semibold h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Бүртгүүлэх
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</span>
                  </div>

                  <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                            ${active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                          `}
                        >
                          <Icon className="w-5 h-5" />
                          {link.label}
                        </Link>
                      );
                    })}

                    {isAuthenticated && (
                      <Link
                        href={dashboardLink}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                          ${isActive(dashboardLink) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
                        `}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Хянах самбар
                      </Link>
                    )}
                  </nav>

                  {/* Mobile Auth Section */}
                  <div className="p-4 border-t border-gray-200 space-y-3">
                    {isAuthenticated ? (
                      <Button onClick={handleLogout} variant="outline" className="w-full gap-2">
                        <LogOut className="w-4 h-4" />
                        Гарах
                      </Button>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)} className="block">
                          <Button variant="outline" className="w-full">
                            Нэвтрэх
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)} className="block">
                          <Button className="w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Эхлэх</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
