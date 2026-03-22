"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[#4c1d95] text-[#ede8ff] hover:bg-[#5b21b6]",
  outline: "border border-[#1e1640] text-[#ddd6fe] hover:bg-[#0d0b1a]",
  ghost:   "text-[#ddd6fe] hover:bg-[#110f1e]",
  destructive: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
};

const buttonSizes = {
  sm: "h-8  px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
