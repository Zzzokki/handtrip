"use client";

import { Button } from "@/components/ui/button";
import { Pagination as ShadcnPagintaion, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const Pagination = (props: PaginationProps) => {
  const { page, totalPages, setPage } = props;

  const isPreviousDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  const onPreviousPage = () => {
    setPage((current) => Math.max(current - 1, 1));
  };

  const onNextPage = () => {
    setPage((current) => Math.min(current + 1, totalPages));
  };

  const gotToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <ShadcnPagintaion className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" disabled={isPreviousDisabled} onClick={onPreviousPage}>
            <ChevronLeft /> Өмнөх
          </Button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink className="cursor-pointer" isActive={page === 1} onClick={() => gotToPage(1)}>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink className="cursor-pointer" isActive={page === 1} onClick={() => gotToPage(2)}>
            2
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <Button variant="outline" disabled={isNextDisabled} onClick={onNextPage}>
            Дараах <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagintaion>
  );
};
