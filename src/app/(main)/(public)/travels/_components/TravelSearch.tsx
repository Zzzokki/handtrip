"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

type TravelSearchProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const TravelSearch = ({ query, setQuery }: TravelSearchProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        placeholder="Аялал, газар нэрээр хайх..."
        className="pl-10 h-10 text-sm border-gray-300 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 bg-white"
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};
