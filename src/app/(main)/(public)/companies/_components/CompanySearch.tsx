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
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      <Input
        placeholder="Компанийн нэр, тайлбар эсвэл имэйл хайх..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 h-11 text-sm rounded-xl border-gray-300 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all bg-white shadow-md hover:shadow-lg"
      />
    </div>
  );
}
