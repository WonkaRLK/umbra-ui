"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Collapsible({ trigger, children, defaultOpen = false, open, onOpenChange, className }: CollapsibleProps) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  const toggle = () => {
    if (!isControlled) setInternal((p) => !p);
    onOpenChange?.(!isOpen);
  };

  return (
    <div className={cn("w-full", className)}>
      <CollapsibleTrigger onClick={toggle} aria-expanded={isOpen}>
        {trigger}
      </CollapsibleTrigger>
      <AnimatePresence initial={false}>
        {isOpen && (
          <CollapsibleContent>
            {children}
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CollapsibleTrigger({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] rounded-[7px]"
      {...props}
    >
      {children}
    </button>
  );
}

export function CollapsibleContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pt-2">{children}</div>
    </motion.div>
  );
}
