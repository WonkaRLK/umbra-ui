"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ListItem {
  id: string;
  primary: string;
  secondary?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface ListProps {
  items: ListItem[];
  divided?: boolean;
  className?: string;
}

export function List({ items, divided = true, className }: ListProps) {
  return (
    <div role="list" className={cn("rounded-[10px] border border-[#222222] overflow-hidden", className)}>
      {items.map((item, i) => (
        <div
          key={item.id}
          role="listitem"
          onClick={item.disabled ? undefined : item.onClick}
          className={cn(
            "flex items-center gap-3 px-4 py-3 bg-[#101010] transition-colors",
            item.onClick && !item.disabled && "cursor-pointer hover:bg-[#181818]",
            divided && i < items.length - 1 && "border-b border-[#222222]",
            item.disabled && "opacity-40 pointer-events-none"
          )}
        >
          {item.leading && (
            <div className="shrink-0 h-8 w-8 flex items-center justify-center text-[#505050]">
              {item.leading}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#a0a0a0] truncate">{item.primary}</p>
            {item.secondary && (
              <p className="text-xs text-[#505050] mt-0.5 truncate">{item.secondary}</p>
            )}
          </div>
          {item.trailing && (
            <div className="ml-auto shrink-0">{item.trailing}</div>
          )}
        </div>
      ))}
    </div>
  );
}
