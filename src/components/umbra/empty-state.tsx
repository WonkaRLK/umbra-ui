"use client";
import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center text-center gap-4 py-12 px-6", className)}>
      <div className="flex h-16 w-16 items-center justify-center rounded-[16px] border border-[#222222] bg-[#181818] text-[#7c3aed]">
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[#a0a0a0] font-semibold text-lg font-serif">{title}</h3>
        {description && (
          <p className="text-[#505050] text-sm max-w-xs">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
