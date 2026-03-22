import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ label, value, trend, trendValue, className, ...props }: StatCardProps) {
  const trendColor = trend === "up" ? "text-[#22c55e]" : trend === "down" ? "text-[#ef4444]" : "text-[#7c6f9e]";
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "–";

  return (
    <div className={cn("rounded-[16px] border border-[#1e1640] bg-[#0d0b1a] p-5", className)} {...props}>
      <p className="text-xs text-[#7c6f9e] uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-bold text-[#ddd6fe]">{value}</p>
      {trend && (
        <p className={cn("text-xs mt-1 font-medium", trendColor)}>
          {trendIcon} {trendValue}
        </p>
      )}
    </div>
  );
}
