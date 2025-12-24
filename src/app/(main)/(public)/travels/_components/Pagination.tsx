import { Button } from "@/components/ui/button";
import { Pagination as ShadcnPagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <ShadcnPagination className="m-0 w-fit">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <Button variant="outline" size="sm" disabled={page === 1} onClick={prev} className="h-9">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Өмнөх
          </Button>
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <Button variant="outline" size="sm" onClick={() => goToPage(1)} className="h-9 w-9">
              1
            </Button>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis className="h-9 w-9" />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <Button variant="outline" size="sm" onClick={() => goToPage(page - 1)} className="h-9 w-9">
              {page - 1}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button variant="default" size="sm" className="h-9 w-9">
            {page}
          </Button>
        </PaginationItem>

        {page < totalPages && (
          <PaginationItem>
            <Button variant="outline" size="sm" onClick={() => goToPage(page + 1)} className="h-9 w-9">
              {page + 1}
            </Button>
          </PaginationItem>
        )}

        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis className="h-9 w-9" />
          </PaginationItem>
        )}

        {page < totalPages - 1 && (
          <PaginationItem>
            <Button variant="outline" size="sm" onClick={() => goToPage(totalPages)} className="h-9 w-9">
              {totalPages}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={next} className="h-9">
            Дараах
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
