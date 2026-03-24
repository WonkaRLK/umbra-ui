"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

function getPages(page: number, total: number, siblings: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  const pages: (number | "...")[] = [1];

  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

const btnBase =
  "flex h-9 w-9 items-center justify-center rounded-[7px] border border-[#222222] bg-[#101010] text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] disabled:opacity-40 disabled:pointer-events-none";

export function Pagination({ page, totalPages, onPageChange, siblings = 1, className }: PaginationProps) {
  const pages = getPages(page, totalPages, siblings);

  return (
    <nav aria-label="Paginación" className={cn("flex items-center gap-1", className)}>
      <button
        aria-label="Página anterior"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(btnBase, "text-[#505050] hover:text-[#a0a0a0] hover:bg-[#181818]")}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-[#505050] text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              btnBase,
              p === page
                ? "bg-[#7c3aed] border-[#7c3aed] text-[#f0f0f0] font-semibold"
                : "text-[#505050] hover:bg-[#181818] hover:text-[#a0a0a0]"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        aria-label="Página siguiente"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(btnBase, "text-[#505050] hover:text-[#a0a0a0] hover:bg-[#181818]")}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
