"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const sizes = {
  sm: { track: "w-8 h-4", thumb: "w-3.5 h-3.5", onX: 14, offX: 1 },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", onX: 20, offX: 2 },
};

export function Switch({ label, checked, defaultChecked, onChange, disabled, size = "md", className }: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const s = sizes[size];

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        role="switch"
        aria-checked={isOn}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]",
          s.track,
          isOn ? "bg-[#7c3aed]" : "bg-[#222222]"
        )}
      >
        <motion.span
          className={cn("block rounded-full bg-white shadow-sm", s.thumb)}
          animate={{ x: isOn ? s.onX : s.offX }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      {label && <span className="text-sm text-[#a0a0a0]">{label}</span>}
    </label>
  );
}
