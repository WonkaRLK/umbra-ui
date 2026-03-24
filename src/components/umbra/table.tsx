"use client";
import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

type SortDir = "asc" | "desc";

const alignClass = { left: "text-left", center: "text-center", right: "text-right" };

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  emptyMessage = "Sin datos",
  className,
}: TableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className={cn("w-full overflow-hidden rounded-[10px] border border-[#222222]", className)}>
      <table className="w-full border-collapse">
        <thead className="bg-[#181818]">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                className={cn(
                  "px-4 py-3 text-xs font-semibold text-[#505050] uppercase tracking-wider border-b border-[#222222]",
                  col.align ? alignClass[col.align] : "text-left",
                  col.sortable && "cursor-pointer hover:text-[#a0a0a0] select-none"
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp className={cn("h-2.5 w-2.5", sortKey === col.key && sortDir === "asc" ? "text-[#a855f7]" : "text-[#505050]/40")} />
                      <ChevronDown className={cn("h-2.5 w-2.5 -mt-0.5", sortKey === col.key && sortDir === "desc" ? "text-[#a855f7]" : "text-[#505050]/40")} />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-[#505050]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, ri) => (
              <tr
                key={ri}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "transition-colors",
                  onRowClick && "cursor-pointer hover:bg-[#181818]/50"
                )}
              >
                {columns.map((col, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-3 text-sm text-[#a0a0a0]",
                      ri < sorted.length - 1 && "border-b border-[#222222]/50",
                      col.align ? alignClass[col.align] : "text-left"
                    )}
                  >
                    {col.render
                      ? col.render(row[String(col.key)], row)
                      : String(row[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
