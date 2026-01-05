"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ManagerHeaderBar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Хайх..." className="pl-9 h-9 text-sm bg-gray-50 border-gray-200 focus-visible:ring-1" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-green-600 text-white text-xs">MG</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-gray-900">Manager User</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
