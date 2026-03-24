import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-[#1c1c2e] text-[#a855f7]",
  outline: "border border-[#4c1d95] text-[#a855f7]",
  subtle:  "bg-[#161616] text-[#7c3aed]",
};

const badgeColors = {
  accent:      "",
  success:     "!bg-[#052e16] !text-[#22c55e]",
  warning:     "!bg-[#422006] !text-[#eab308]",
  destructive: "!bg-[#450a0a] !text-[#ef4444]",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
  color?: keyof typeof badgeColors;
}

export function Badge({ className, variant = "default", color = "accent", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        badgeVariants[variant],
        badgeColors[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
