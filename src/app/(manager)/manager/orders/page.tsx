"use client";

import { useState, useMemo } from "react";
import { useGetOrdersQuery } from "@/types/generated";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ShoppingCart, Users, DollarSign, Calendar, ArrowUpDown, CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

type SortField = "createdAt" | "totalPrice" | "orderStatus";
type SortOrder = "asc" | "desc";

export default function ManagerOrdersPage() {
  const router = useRouter();
  const { data, loading } = useGetOrdersQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const orders = data?.getOrders || [];

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((order) => order.orderStatus === statusFilter);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toString().includes(query) ||
          order.customer?.firstName.toLowerCase().includes(query) ||
          order.customer?.lastName.toLowerCase().includes(query) ||
          order.customer?.email.toLowerCase().includes(query) ||
          order.travelSession?.travel?.name.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === "totalPrice") {
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
  }, [orders, searchQuery, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage]);

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
      pending: { label: "Хүлээгдэж буй", variant: "secondary", icon: Clock },
      confirmed: { label: "Баталгаажсан", variant: "default", icon: CheckCircle },
      cancelled: { label: "Цуцалсан", variant: "destructive", icon: XCircle },
      completed: { label: "Дууссан", variant: "outline", icon: CheckCircle },
    };

    const config = statusConfig[status] || { label: status, variant: "outline" as const, icon: Clock };
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "pending").length,
      confirmed: orders.filter((o) => o.orderStatus === "confirmed").length,
      cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
      totalRevenue: orders.filter((o) => o.orderStatus !== "cancelled").reduce((sum, o) => sum + Number(o.totalPrice), 0),
    };
  }, [orders]);

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
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Захиалгууд</h1>
            <p className="text-sm text-muted-foreground">Бүх захиалгуудын жагсаалт</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Нийт</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Хүлээгдэж буй</p>
          <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Баталгаажсан</p>
          <p className="text-xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Цуцалсан</p>
          <p className="text-xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
        <div className="bg-card border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Нийт орлого</p>
          <p className="text-xl font-bold">₮{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="ID, хэрэглэгч, аялал-ийн нэрээр хайх..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Төлөв шүүх" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх төлөв</SelectItem>
            <SelectItem value="pending">Хүлээгдэж буй</SelectItem>
            <SelectItem value="confirmed">Баталгаажсан</SelectItem>
            <SelectItem value="cancelled">Цуцалсан</SelectItem>
            <SelectItem value="completed">Дууссан</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Хэрэглэгч</TableHead>
                <TableHead>Аялал</TableHead>
                <TableHead className="text-center">Аялагч</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("totalPrice")} className="h-8 -ml-3">
                    Үнэ
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("orderStatus")} className="h-8 -ml-3">
                    Төлөв
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => toggleSort("createdAt")} className="h-8 -ml-3">
                    Огноо
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    Захиалга олдсонгүй
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order, index) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-muted-foreground">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                          {order.customer?.firstName[0]}
                          {order.customer?.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {order.customer?.firstName} {order.customer?.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">{order.customer?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-sm line-clamp-1">{order.travelSession?.travel?.name || "N/A"}</div>
                        <div className="text-xs text-muted-foreground">{order.travelSession?.travel?.company?.name || "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{order.totalSeats}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-semibold">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />₮{Number(order.totalPrice).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Нийт {filteredAndSortedOrders.length} захиалгаас {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedOrders.length)} харуулж байна
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
