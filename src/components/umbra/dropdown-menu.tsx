"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

export function DropdownMenu({ trigger, items, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((p) => !p)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className={cn(
              "absolute top-full mt-1 z-50 rounded-[10px] border border-[#222222] bg-[#101010] shadow-xl overflow-hidden min-w-[160px] py-1",
              align === "end" ? "right-0" : "left-0",
              className
            )}
          >
            {items.map((item, i) => {
              if (item.separator) {
                return <div key={i} className="my-1 border-t border-[#222222]" />;
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (item.disabled) return;
                    item.onClick?.();
                    setOpen(false);
                  }}
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors focus:outline-none",
                    item.destructive
                      ? "text-[#ef4444] hover:bg-[#ef4444]/10"
                      : "text-[#a0a0a0] hover:bg-[#181818]",
                    item.disabled && "opacity-40 pointer-events-none"
                  )}
                >
                  {item.icon && <span className="h-4 w-4 text-[#505050] shrink-0">{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
