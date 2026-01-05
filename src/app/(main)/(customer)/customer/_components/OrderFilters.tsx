import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface OrderFiltersProps {
  searchQuery: string;
  statusFilter: string;
  paymentFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function OrderFilters({ searchQuery, statusFilter, paymentFilter, onSearchChange, onStatusChange, onPaymentChange, onClearFilters, hasActiveFilters }: OrderFiltersProps) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Захиалгын дугаараар хайх..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-9 h-9 text-sm" />
        </div>

        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue placeholder="Төлөв" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төлөв</SelectItem>
              <SelectItem value="0">Хүлээгдэж буй</SelectItem>
              <SelectItem value="1">Баталгаажсан</SelectItem>
              <SelectItem value="2">Цуцалсан</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={onPaymentChange}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <SelectValue placeholder="Төлбөр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төлбөр</SelectItem>
              <SelectItem value="paid">Төлсөн</SelectItem>
              <SelectItem value="unpaid">Төлөөгүй</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-9 text-xs text-gray-600 hover:text-gray-900">
              <X className="w-3.5 h-3.5 mr-1" />
              Цэвэрлэх
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="font-medium">Идэвхтэй шүүлтүүр:</span>
          {searchQuery && <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Хайлт: "{searchQuery}"</span>}
          {statusFilter !== "all" && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Төлөв: {statusFilter === "0" ? "Хүлээгдэж буй" : statusFilter === "1" ? "Баталгаажсан" : "Цуцалсан"}</span>
          )}
          {paymentFilter !== "all" && <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">{paymentFilter === "paid" ? "Төлсөн" : "Төлөөгүй"}</span>}
        </div>
      )}
    </div>
  );
}
