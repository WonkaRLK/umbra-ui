"use client";
import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onChange, onClear, loading, className, value, defaultValue, ...props }, ref) => {
    const [internal, setInternal] = React.useState((defaultValue as string) ?? "");
    const isControlled = value !== undefined;
    const current = isControlled ? (value as string) : internal;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.value);
      onChange?.(e.target.value);
    };

    const handleClear = () => {
      if (!isControlled) setInternal("");
      onClear?.();
      onChange?.("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSearch?.(current);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#505050] pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={current}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-10 pl-9 pr-9 rounded-[10px] border border-[#222222] bg-[#101010] text-[#a0a0a0] text-sm placeholder:text-[#505050] focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-[#7c3aed] transition-colors"
          {...props}
        />
        {current && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none"
            aria-label="Limpiar búsqueda"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
