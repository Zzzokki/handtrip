"use client";

import { useState, useMemo } from "react";
import { useGetCompaniesQuery } from "@/types/generated";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Building2, Mail, Phone, Calendar, ArrowUpDown, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SortField = "name" | "email" | "createdAt";
type SortOrder = "asc" | "desc";

export default function ManagerCompaniesPage() {
  const router = useRouter();
  const { data, loading } = useGetCompaniesQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const companies = data?.getCompanies || [];

  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.email.toLowerCase().includes(query) ||
          company.username.toLowerCase().includes(query) ||
          company.phoneNumber.includes(query) ||
          company.description.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
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
  }, [companies, searchQuery, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCompanies, currentPage]);

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
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/manager")} className="mb-4 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Буцах
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Компаниуд</h1>
            <p className="text-sm text-muted-foreground">Бүртгэлтэй компаниудын жагсаалт</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Нийт</p>
              <p className="text-2xl font-bold">{companies.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Шүүсэн</p>
              <p className="text-2xl font-bold">{filteredAndSortedCompanies.length}</p>
            </div>
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Өнөөдөр</p>
              <p className="text-2xl font-bold">
                {
                  companies.filter((c) => {
                    const today = new Date();
                    const createdAt = new Date(c.createdAt);
                    return createdAt.toDateString() === today.toDateString();
                  }).length
                }
              </p>
            </div>
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Нэр, имэйл, утас, username-ээр хайх..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Лого</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort("name")} className="h-8 -ml-3">
                  Нэр
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort("email")} className="h-8 -ml-3">
                  Холбоо барих
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Username</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort("createdAt")} className="h-8 -ml-3">
                  Бүртгэсэн
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  Компани олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              paginatedCompanies.map((company, index) => (
                <TableRow key={company.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-muted-foreground">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
                      {company.logo ? <Image src={company.logo} alt={company.name} width={40} height={40} className="object-cover" /> : <ImageIcon className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{company.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{company.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {company.phoneNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      @{company.username}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(company.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Нийт {filteredAndSortedCompanies.length} компаниас {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedCompanies.length)} харуулж байна
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Өмнөх
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="w-9">
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
