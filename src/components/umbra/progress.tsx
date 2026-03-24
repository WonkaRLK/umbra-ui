"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ProgressVariant = "default" | "success" | "warning" | "destructive";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressProps {
  value?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  className?: string;
}

const variantColor: Record<ProgressVariant, string> = {
  default: "bg-[#7c3aed]",
  success: "bg-[#22c55e]",
  warning: "bg-[#eab308]",
  destructive: "bg-[#ef4444]",
};

const sizeClass: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function Progress({ value = 0, label, showValue, variant = "default", size = "md", indeterminate, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-[#505050]">{label}</span>}
          {showValue && !indeterminate && (
            <span className="text-xs text-[#a0a0a0]">{clamped}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("w-full rounded-full bg-[#222222] overflow-hidden", sizeClass[size])}
      >
        {indeterminate ? (
          <div className={cn("h-full w-1/3 rounded-full animate-pulse", variantColor[variant])} />
        ) : (
          <motion.div
            className={cn("h-full rounded-full", variantColor[variant])}
            initial={{ width: 0 }}
            animate={{ width: `${clamped}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        )}
      </div>
    </div>
  );
}
