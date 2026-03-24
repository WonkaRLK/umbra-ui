"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type TimelineVariant = "default" | "success" | "warning" | "destructive";

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  variant?: TimelineVariant;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const variantConfig: Record<TimelineVariant, { border: string; bg: string; text: string; dot: string }> = {
  default: { border: "border-[#7c3aed]", bg: "bg-[#7c3aed]/10", text: "text-[#a855f7]", dot: "bg-[#7c3aed]" },
  success: { border: "border-[#22c55e]", bg: "bg-[#22c55e]/10", text: "text-[#22c55e]", dot: "bg-[#22c55e]" },
  warning: { border: "border-[#eab308]", bg: "bg-[#eab308]/10", text: "text-[#eab308]", dot: "bg-[#eab308]" },
  destructive: { border: "border-[#ef4444]", bg: "bg-[#ef4444]/10", text: "text-[#ef4444]", dot: "bg-[#ef4444]" },
};

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const config = variantConfig[event.variant ?? "default"];

        return (
          <div key={event.id} className="flex gap-4 relative">
            {/* Left column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  config.border,
                  config.bg,
                  config.text
                )}
              >
                {event.icon ? (
                  <span className="h-3.5 w-3.5">{event.icon}</span>
                ) : (
                  <span className={cn("h-2 w-2 rounded-full", config.dot)} />
                )}
              </div>
              {!isLast && <div className="w-0.5 flex-1 bg-[#222222] mt-1 mb-1" />}
            </div>

            {/* Right column */}
            <div className={cn("flex-1 min-w-0", !isLast ? "pb-8" : "pb-0")}>
              <p className="text-sm font-medium text-[#a0a0a0]">{event.title}</p>
              {event.timestamp && (
                <p className="text-xs text-[#505050] mt-0.5">{event.timestamp}</p>
              )}
              {event.description && (
                <p className="text-xs text-[#505050] mt-1">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
