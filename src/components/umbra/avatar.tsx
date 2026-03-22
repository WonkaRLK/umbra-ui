"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const avatarSizes = {
  sm: "h-8  w-8  text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: keyof typeof avatarSizes;
  className?: string;
}

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);
  const initials = fallback
    ? fallback.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-[#1e1040] border border-[#2a1f4e] text-[#a855f7] font-semibold overflow-hidden shrink-0",
        avatarSizes[size],
        className
      )}
    >
      {src && !imgError ? (
        <img src={src} alt={alt ?? fallback ?? "avatar"} className="h-full w-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
