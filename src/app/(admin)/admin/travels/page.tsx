"use client";

import { useState, useMemo } from "react";
import { useGetTravelsQuery } from "@/types/generated";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plane, MapPin, Building2, Calendar, ArrowUpDown, Users, Clock, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SortField = "name" | "duration" | "createdAt";
type SortOrder = "asc" | "desc";

export default function AdminTravelsPage() {
  const router = useRouter();
  const { data, loading } = useGetTravelsQuery({
    variables: {
      input: {
        page: 1,
        limit: 100,
      },
    },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const travels = data?.getTravels.travels || [];

  const filteredAndSortedTravels = useMemo(() => {
    let result = [...travels];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (travel) =>
          travel.name.toLowerCase().includes(query) ||
          travel.description.toLowerCase().includes(query) ||
          travel.company?.name.toLowerCase().includes(query) ||
          travel.destination?.name.toLowerCase().includes(query) ||
          travel.destination?.location.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === "duration") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = aValue?.toLowerCase() || "";
        bValue = bValue?.toLowerCase() || "";
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }, [travels, searchQuery, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedTravels.length / itemsPerPage);
  const paginatedTravels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTravels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTravels, currentPage]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDate = (timestamp: any) => {
    return new Date(timestamp).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = useMemo(() => {
    const activeTravels = travels.filter((t) => (t.travelSessions?.length || 0) > 0);
    const totalSessions = travels.reduce((sum, t) => sum + (t.travelSessions?.length || 0), 0);
    const avgDuration = travels.length > 0 ? travels.reduce((sum, t) => sum + t.duration, 0) / travels.length : 0;

    return {
      total: travels.length,
      active: activeTravels.length,
      totalSessions,
      avgDuration: Math.round(avgDuration),
    };
  }, [travels]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 w-full">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin")} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Буцах
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Plane className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Аяллууд</h1>
            <p className="text-sm text-muted-foreground">Бүх аяллын жагсаалт</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Нийт</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Идэвхтэй</p>
          <p className="text-xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Нийт session</p>
          <p className="text-xl font-bold">{stats.totalSessions}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Дундаж хугацаа</p>
          <p className="text-xl font-bold">{stats.avgDuration} өдөр</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Нэр, компани, чиглэлээр хайх..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-20">Зураг</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("name")} className="h-8 -ml-3">
                    Аяллын нэр
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Компани</TableHead>
                <TableHead>Чиглэл</TableHead>
                <TableHead className="text-center">
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("duration")} className="h-8 -ml-3">
                    Хугацаа
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">Суудал</TableHead>
                <TableHead className="text-center">Sessions</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("createdAt")} className="h-8 -ml-3">
                    Үүсгэсэн
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTravels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    <Plane className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    Аялал олдсонгүй
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTravels.map((travel, index) => (
                  <TableRow key={travel.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-muted-foreground">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <div className="h-12 w-16 rounded-md bg-muted flex items-center justify-center overflow-hidden border">
                        {travel.coverImage ? (
                          <Image src={travel.coverImage} alt={travel.name} width={64} height={48} className="object-cover w-full h-full" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium line-clamp-1">{travel.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{travel.description}</div>
                        {travel.categories && travel.categories.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {travel.categories.slice(0, 2).map((cat) => (
                              <Badge key={cat.id} variant="secondary" className="text-xs py-0 px-1">
                                {cat.name}
                              </Badge>
                            ))}
                            {travel.categories.length > 2 && (
                              <Badge variant="secondary" className="text-xs py-0 px-1">
                                +{travel.categories.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-muted flex items-center justify-center overflow-hidden border text-xs">
                          {travel.company?.logo ? (
                            <Image src={travel.company.logo} alt={travel.company.name} width={24} height={24} className="object-cover" />
                          ) : (
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <span className="text-sm font-medium truncate max-w-[120px]">{travel.company?.name || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        <div className="truncate max-w-[150px]">
                          <div className="font-medium">{travel.destination?.name || "N/A"}</div>
                          <div className="text-xs text-muted-foreground truncate">{travel.destination?.location || ""}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{travel.duration}</span>
                        <span className="text-xs text-muted-foreground">өдөр</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{travel.totalSeatNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={travel.travelSessions && travel.travelSessions.length > 0 ? "default" : "secondary"}>{travel.travelSessions?.length || 0}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(travel.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedTravels.length} аяллын {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedTravels.length)}-ийг үзүүлж байна
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Өмнөх
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="w-8 h-8 p-0">
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Дараах
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
