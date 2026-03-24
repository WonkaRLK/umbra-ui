"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerVariant = "default" | "accent" | "muted";

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  className?: string;
}

const sizeClass: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
};

const variantClass: Record<SpinnerVariant, string> = {
  default: "border-t-[#7c3aed]",
  accent: "border-t-[#a855f7]",
  muted: "border-t-[#505050]",
};

export function Spinner({ size = "md", variant = "default", label, className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "Cargando"}
      className={cn(
        "inline-block rounded-full border-[#222222] animate-spin",
        sizeClass[size],
        variantClass[variant],
        className
      )}
    />
  );
}
