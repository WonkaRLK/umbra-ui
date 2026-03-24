"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoResize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, autoResize, className, maxLength, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!);
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = "auto";
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
      onChange?.(e);
    };

    return (
      <div className="flex flex-col w-full">
        {label && <span className="mb-1 text-xs text-[#505050]">{label}</span>}
        <textarea
          ref={internalRef}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "w-full min-h-[100px] px-3 py-2.5 rounded-[10px] border bg-[#101010] text-[#a0a0a0] text-sm placeholder:text-[#505050] resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#a855f7] focus:border-[#7c3aed] disabled:opacity-50",
            error ? "border-[#ef4444]" : "border-[#222222]",
            className
          )}
          {...props}
        />
        <div className="flex justify-between mt-1">
          {error && <span className="text-xs text-[#ef4444]">{error}</span>}
          {maxLength && (
            <span className="text-xs text-[#505050] ml-auto">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
