import { Button } from "@/components/ui/button";
import { Pagination as ShadcnPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronLeft } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  const prev = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  const next = () => {
    setPage((old) => Math.min(old + 1, totalPages));
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" disabled={page === 1} onClick={prev}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Өмнөх
          </Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <Button variant="outline" disabled={page === totalPages} onClick={next}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Дараах
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
