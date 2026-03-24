"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipVariant = "default" | "accent" | "success" | "warning" | "destructive";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  variant?: ChipVariant;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  default: "bg-[#181818] text-[#a0a0a0] border border-[#222222] hover:border-[#7c3aed]",
  accent: "bg-[#4c1d95]/30 text-[#a855f7] border border-[#7c3aed]/50",
  success: "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30",
  warning: "bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30",
  destructive: "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30",
};

export function Chip({ label, onRemove, onClick, selected, disabled, variant = "default", className }: ChipProps) {
  return (
    <AnimatePresence>
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={disabled ? undefined : onClick}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors",
          variantStyles[variant],
          selected && "ring-1 ring-[#7c3aed]",
          onClick && !disabled && "cursor-pointer",
          disabled && "opacity-40 pointer-events-none",
          className
        )}
      >
        {label}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-0.5 hover:text-[#ef4444] transition-colors focus:outline-none"
            aria-label={`Eliminar ${label}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </motion.span>
    </AnimatePresence>
  );
}
