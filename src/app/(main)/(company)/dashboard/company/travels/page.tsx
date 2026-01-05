"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetTravelsByCompanyQuery } from "@/types/generated";
import { TravelCard, TravelsHeader, EmptyState, Pagination, LoadingSkeleton } from "./_components";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function CompanyTravelsPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data, loading, refetch } = useGetTravelsByCompanyQuery({
    variables: { input: { page, limit: 100 } },
  });

  const { travels, totalPages, totalTravels, filteredTravels } = useMemo(() => {
    if (!data) return { travels: [], totalPages: 1, totalTravels: 0, filteredTravels: [] };
    const { travels, totalPages, totalTravels } = data.getTravelsByCompany;
    
    // Apply search filter
    let filtered = [...travels];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (travel) =>
          travel.name.toLowerCase().includes(query) ||
          travel.description.toLowerCase().includes(query) ||
          travel.destination?.name.toLowerCase().includes(query) ||
          travel.categories?.some((cat) => cat.name.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "duration-asc":
          return a.duration - b.duration;
        case "duration-desc":
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    return { travels, totalPages, totalTravels, filteredTravels: filtered };
  }, [data, searchQuery, sortBy]);

  useEffect(() => {
    refetch({ input: { page, limit: 100 } });
  }, [page, refetch]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
      <TravelsHeader totalTravels={totalTravels} />

      {/* Search and Sort */}
      {!loading && travels.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Нэр, тайлбар, чиглэл, категориор хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Эрэмбэлэх" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Шинэ эхэндээ</SelectItem>
              <SelectItem value="oldest">Хуучин эхэндээ</SelectItem>
              <SelectItem value="name-asc">Нэр (А-Я)</SelectItem>
              <SelectItem value="name-desc">Нэр (Я-А)</SelectItem>
              <SelectItem value="duration-asc">Хугацаа (бага)</SelectItem>
              <SelectItem value="duration-desc">Хугацаа (их)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {loading && <LoadingSkeleton />}

      {!loading && filteredTravels.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredTravels.map((travel) => (
              <TravelCard key={travel.id} travel={travel} />
            ))}
          </div>
          <div className="mt-6 text-sm text-muted-foreground text-center">
            {filteredTravels.length} аялал үзүүлж байна
          </div>
        </>
      )}

      {!loading && filteredTravels.length === 0 && travels.length > 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Хайлтын илэрц олдсонгүй</p>
        </div>
      )}

      {!loading && travels.length === 0 && <EmptyState />}

      {!loading && totalPages > 1 && (
        <div className="w-full flex justify-center pt-8">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
