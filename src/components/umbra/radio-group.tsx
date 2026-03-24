"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

export function RadioGroup({ options, value, defaultValue, onChange, name, className }: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const handleChange = (val: string, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  return (
    <div role="radiogroup" className={cn("flex flex-col gap-3", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "inline-flex items-center gap-2 cursor-pointer select-none",
            option.disabled && "opacity-50 pointer-events-none"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value, option.disabled)}
            disabled={option.disabled}
            className="sr-only"
          />
          <span
            onClick={() => handleChange(option.value, option.disabled)}
            className={cn(
              "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              selected === option.value ? "border-[#7c3aed]" : "border-[#222222] bg-[#101010]"
            )}
          >
            <AnimatePresence>
              {selected === option.value && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block h-2.5 w-2.5 rounded-full bg-[#7c3aed]"
                />
              )}
            </AnimatePresence>
          </span>
          <span className="text-sm text-[#a0a0a0]">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
