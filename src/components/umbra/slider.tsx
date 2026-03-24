"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue,
  label,
  disabled,
  className,
}: SliderProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const pct = ((current - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-[#505050]">{label}</span>}
          {showValue && <span className="text-sm font-medium text-[#a0a0a0]">{current}</span>}
        </div>
      )}
      <div className={cn("relative h-1.5 w-full rounded-full bg-[#222222]", disabled && "opacity-50")}>
        {/* fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#7c3aed] transition-all"
          style={{ width: `${pct}%` }}
        />
        {/* thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-[#a855f7] border-2 border-[#7c3aed] shadow-lg pointer-events-none"
          style={{ left: `${pct}%` }}
        />
        {/* native input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:pointer-events-none"
        />
      </div>
    </div>
  );
}
