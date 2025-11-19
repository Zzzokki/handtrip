"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CompanySearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function CompanySearch({ searchQuery, onSearchChange }: CompanySearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <Input
        placeholder="Компанийн нэр, тайлбар эсвэл имэйл хайх..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-12 h-14 text-base rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white shadow-sm"
      />
    </div>
  );
}
