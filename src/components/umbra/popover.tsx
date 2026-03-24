"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type PopoverSide = "top" | "bottom" | "left" | "right";
type PopoverAlign = "start" | "center" | "end";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: PopoverSide;
  align?: PopoverAlign;
  className?: string;
}

const sideClasses: Record<PopoverSide, string> = {
  bottom: "top-full mt-2",
  top: "bottom-full mb-2",
  right: "left-full ml-2 top-0",
  left: "right-full mr-2 top-0",
};

const alignClasses: Record<PopoverAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

const motionVariants: Record<PopoverSide, { initial: object }> = {
  bottom: { initial: { opacity: 0, scale: 0.95, y: -4 } },
  top: { initial: { opacity: 0, scale: 0.95, y: 4 } },
  right: { initial: { opacity: 0, scale: 0.95, x: -4 } },
  left: { initial: { opacity: 0, scale: 0.95, x: 4 } },
};

export function Popover({ trigger, children, side = "bottom", align = "start", className }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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

  const mv = motionVariants[side];
  const isHorizontal = side === "left" || side === "right";

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((p) => !p)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={mv.initial}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={mv.initial}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 rounded-[10px] border border-[#222222] bg-[#181818] shadow-xl p-4 min-w-[200px]",
              sideClasses[side],
              !isHorizontal && alignClasses[align],
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
