"use client";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  const defaultSeparator = <ChevronRight className="h-3 w-3 text-[#505050]/50" />;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-sm font-medium text-[#a0a0a0]" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none",
                    !item.onClick && "cursor-default"
                  )}
                >
                  {item.label}
                </button>
              )}
              {!isLast && (
                <span aria-hidden="true">{separator ?? defaultSeparator}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
