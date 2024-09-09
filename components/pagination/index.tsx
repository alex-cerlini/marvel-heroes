"use client";

import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/shadcn/pagination";
import { usePagination } from "@/hooks/usePagination";

export const Pagination = () => {
  const {
    slicedPagesArray,
    handleIncreasePage,
    handleDecreasePage,
    handlePage,
    activePage,
  } = usePagination();

  if (slicedPagesArray.length === 0) return null;

  return (
    <PaginationShadcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handleDecreasePage} />
        </PaginationItem>
        <PaginationItem>
          {slicedPagesArray.map((value) => {
            const page = value + 1;
            return (
              <PaginationLink
                key={page}
                isActive={activePage === page}
                onClick={() => handlePage(page)}
              >
                {page}
              </PaginationLink>
            );
          })}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleIncreasePage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
};
