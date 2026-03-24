"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

interface KbdGroupProps {
  keys: string[];
  separator?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeClass = { sm: "text-xs min-w-[20px] px-1.5 py-0.5", md: "text-sm min-w-[24px] px-2 py-0.5" };

export function Kbd({ children, size = "md", className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-[5px] border border-[#222222] bg-[#181818] text-[#a0a0a0] font-[family-name:var(--font-mono)] shadow-[0_1px_0_#222222] select-none",
        sizeClass[size],
        className
      )}
    >
      {children}
    </kbd>
  );
}

export function KbdGroup({ keys, separator = "+", size = "md", className }: KbdGroupProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <React.Fragment key={key}>
          <Kbd size={size}>{key}</Kbd>
          {i < keys.length - 1 && (
            <span className="text-[#505050] text-xs">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
