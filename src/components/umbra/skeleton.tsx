"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type SkeletonRounded = "sm" | "md" | "lg" | "full";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: SkeletonRounded;
  className?: string;
  lines?: number;
}

const roundedClass: Record<SkeletonRounded, string> = {
  sm: "rounded-[7px]",
  md: "rounded-[10px]",
  lg: "rounded-[16px]",
  full: "rounded-full",
};

export function Skeleton({ width, height, rounded = "md", className, lines }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-[#222222] animate-pulse",
              roundedClass[rounded],
              i === lines - 1 && "w-3/4",
              className
            )}
            style={{ width: i === lines - 1 ? undefined : width, height: height ?? "1rem" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("bg-[#222222] animate-pulse", roundedClass[rounded], className)}
      style={{ width, height: height ?? "1rem" }}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return <Skeleton lines={lines} height="0.875rem" />;
}

export function SkeletonAvatar() {
  return <Skeleton width="2.5rem" height="2.5rem" rounded="full" />;
}
