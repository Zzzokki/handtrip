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
    <div className="flex gap-4">
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Аялал хайх..." className="pl-10" value={query} onChange={handleSearchChange} />
      </div>
    </div>
  );
};
