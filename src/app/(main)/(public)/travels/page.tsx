"use client";

import { useState, useMemo } from "react";
import { useGetTravelsQuery } from "@/types/generated";
import { TravelFilters, TravelGrid } from "./_components";

const limit = 12;

export default function TravelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);

  const [sortBy, setSortBy] = useState<"name" | "duration">("name");
  const [page, setPage] = useState(1);

  const { data, loading, error } = useGetTravelsQuery({
    variables: {
      page,
      limit,
      filters: {
        destinationIds: selectedDestinations.length > 0 ? selectedDestinations : undefined,
        subCategoryIds: selectedSubCategories.length > 0 ? selectedSubCategories : undefined,
      },
    },
  });

  const filteredTravels = useMemo(() => {
    if (!data?.getTravels?.travels) return [];

    let filtered = [...data.getTravels.travels];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (travel) =>
          travel.name.toLowerCase().includes(query) ||
          travel.description.toLowerCase().includes(query) ||
          travel.destination?.name.toLowerCase().includes(query) ||
          travel.company?.name.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((travel) => travel.categories?.some((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()));
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.duration - b.duration;
      }
    });

    return filtered;
  }, [data?.getTravels?.travels, searchQuery, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    if (!data?.getTravels?.travels) return [];
    const cats = new Set<string>();
    data.getTravels.travels.forEach((travel) => {
      travel.categories?.forEach((cat) => cats.add(cat.name));
    });
    return Array.from(cats);
  }, [data?.getTravels?.travels]);

  const destinations = useMemo(() => {
    if (!data?.getTravels?.travels) return [];
    const dests = new Map<number, string>();
    data.getTravels.travels.forEach((travel) => {
      if (travel.destination) {
        dests.set(travel.destination.id, travel.destination.name);
      }
    });
    return Array.from(dests, ([id, name]) => ({ id, name }));
  }, [data?.getTravels?.travels]);

  const subCategories = useMemo(() => {
    if (!data?.getTravels?.travels) return [];
    const subCats = new Map<number, string>();
    data.getTravels.travels.forEach((travel) => {
      travel.subCategories?.forEach((sc) => {
        subCats.set(Number(sc.id), sc.name);
      });
    });
    return Array.from(subCats, ([id, name]) => ({ id, name }));
  }, [data?.getTravels?.travels]);

  const handleDestinationToggle = (destId: number) => {
    setSelectedDestinations((prev) => (prev.includes(destId) ? prev.filter((id) => id !== destId) : [...prev, destId]));
    setPage(1);
  };

  const handleSubCategoryToggle = (subCatId: number) => {
    setSelectedSubCategories((prev) => (prev.includes(subCatId) ? prev.filter((id) => id !== subCatId) : [...prev, subCatId]));
    setPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDestinations([]);
    setSelectedSubCategories([]);
    setPage(1);
  };

  const totalPages = data?.getTravels?.total ? Math.ceil(data.getTravels.total / limit) : 0;
  const hasMore = data?.getTravels?.hasMore || false;
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedDestinations.length > 0 || selectedSubCategories.length > 0;

  return (
    <div className="flex flex-col pt-16">
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">Дараагийн аяллаа олоорой</h1>
              <p className="text-xl text-blue-100 leading-relaxed">Монголынхоо өнцөг булан бүрт аяллын гайхалтай багцуудыг судлаарай</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex gap-8">
            <aside className="w-80 flex-shrink-0 hidden lg:block">
              <TravelFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                selectedDestinations={selectedDestinations}
                onDestinationToggle={handleDestinationToggle}
                destinations={destinations}
                selectedSubCategories={selectedSubCategories}
                onSubCategoryToggle={handleSubCategoryToggle}
                subCategories={subCategories}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </aside>

            <div className="flex-1 min-w-0">
              <TravelGrid
                travels={filteredTravels}
                loading={loading}
                error={error}
                sortBy={sortBy}
                onSortChange={setSortBy}
                page={page}
                totalPages={totalPages}
                hasMore={hasMore}
                onPageChange={setPage}
                totalCount={data?.getTravels?.total || 0}
                filteredCount={filteredTravels.length}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
