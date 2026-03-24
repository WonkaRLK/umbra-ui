"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function NumberInput({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  onChange,
  label,
  disabled,
  className,
}: NumberInputProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const clamp = (v: number) => {
    if (min !== undefined && v < min) return min;
    if (max !== undefined && v > max) return max;
    return v;
  };

  const update = (v: number) => {
    const clamped = clamp(v);
    if (!isControlled) setInternal(clamped);
    onChange?.(clamped);
  };

  const btnBase =
    "flex h-10 w-10 items-center justify-center border border-[#222222] bg-[#101010] text-[#505050] hover:text-[#a0a0a0] hover:bg-[#181818] transition-colors disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#a855f7]";

  return (
    <div className={cn("flex flex-col", className)}>
      {label && <span className="mb-1 text-xs text-[#505050]">{label}</span>}
      <div className={cn("flex items-center", disabled && "opacity-50 pointer-events-none")}>
        <button
          aria-label="Decrementar"
          onClick={() => update(current - step)}
          disabled={disabled || (min !== undefined && current <= min)}
          className={cn(btnBase, "rounded-l-[10px] border-r-0")}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          type="number"
          value={current}
          onChange={(e) => update(Number(e.target.value))}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className="h-10 w-20 border-y border-[#222222] bg-[#101010] text-[#a0a0a0] text-sm text-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a855f7] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          aria-label="Incrementar"
          onClick={() => update(current + step)}
          disabled={disabled || (max !== undefined && current >= max)}
          className={cn(btnBase, "rounded-r-[10px] border-l-0")}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
