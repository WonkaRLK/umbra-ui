"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  value: string;
  trigger: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({ items, type = "single", defaultValue, className }: AccordionProps) {
  const initial = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];
  const [open, setOpen] = React.useState<string[]>(initial);

  const toggle = (value: string) => {
    if (type === "single") {
      setOpen((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpen((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className={cn("divide-y divide-[#222222] rounded-[10px] border border-[#222222] overflow-hidden", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value}>
            <button
              onClick={() => !item.disabled && toggle(item.value)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]",
                isOpen ? "text-[#f0f0f0] bg-[#181818]/50" : "text-[#a0a0a0] hover:text-[#f0f0f0] hover:bg-[#181818]/50",
                item.disabled && "opacity-50 pointer-events-none"
              )}
            >
              {item.trigger}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 ml-2"
              >
                <ChevronDown className="h-4 w-4 text-[#505050]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-sm text-[#505050]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
