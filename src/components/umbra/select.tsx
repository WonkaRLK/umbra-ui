"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, value, defaultValue, onChange, placeholder, label, error, disabled, className }, ref) => {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <span className="mb-1 text-xs text-[#505050]">{label}</span>
        )}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3 pr-9 rounded-[10px] border bg-[#101010] text-[#a0a0a0] text-sm appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-[#7c3aed] disabled:opacity-50 disabled:pointer-events-none",
              error ? "border-[#ef4444]" : "border-[#222222]"
            )}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#505050] pointer-events-none"
          />
        </div>
        {error && <span className="mt-1 text-xs text-[#ef4444]">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
