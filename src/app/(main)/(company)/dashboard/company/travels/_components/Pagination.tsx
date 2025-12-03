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
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" disabled={page === 1} onClick={prev}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Өмнөх
          </Button>
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <Button variant="outline" onClick={() => goToPage(1)}>
              1
            </Button>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <Button variant="outline" onClick={() => goToPage(page - 1)}>
              {page - 1}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button variant="default">{page}</Button>
        </PaginationItem>

        {page < totalPages && (
          <PaginationItem>
            <Button variant="outline" onClick={() => goToPage(page + 1)}>
              {page + 1}
            </Button>
          </PaginationItem>
        )}

        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < totalPages - 1 && (
          <PaginationItem>
            <Button variant="outline" onClick={() => goToPage(totalPages)}>
              {totalPages}
            </Button>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button variant="outline" disabled={page === totalPages} onClick={next}>
            Дараах
            <ChevronRight className="w-4 h-4 mr-2" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
