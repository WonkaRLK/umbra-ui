"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, defaultChecked, onChange, disabled, indeterminate, className }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internal;
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    const handleChange = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        <input
          ref={inputRef}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span
          onClick={handleChange}
          className={cn(
            "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#a855f7]",
            isChecked || indeterminate
              ? "bg-[#7c3aed] border-[#7c3aed]"
              : "bg-[#101010] border-[#222222]"
          )}
        >
          <AnimatePresence mode="wait">
            {indeterminate ? (
              <motion.span
                key="indeterminate"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Minus className="h-3 w-3 text-white" strokeWidth={3} />
              </motion.span>
            ) : isChecked ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </span>
        {label && <span className="text-sm text-[#a0a0a0]">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
