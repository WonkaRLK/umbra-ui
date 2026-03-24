import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatCard({ label, value, trend, trendValue, className, ...props }: StatCardProps) {
  const trendColor = trend === "up" ? "text-[#22c55e]" : trend === "down" ? "text-[#ef4444]" : "text-[#505050]";
  const trendIcon = trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "\u2014";

  return (
    <div className={cn("rounded-[16px] border border-[#222222] bg-[#101010] p-5", className)} {...props}>
      <p className="text-xs text-[#505050] uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-bold text-[#f0f0f0]">{value}</p>
      {trend && (
        <p className={cn("text-xs mt-1 font-medium", trendColor)}>
          {trendIcon} {trendValue}
        </p>
      )}
    </div>
  );
}
