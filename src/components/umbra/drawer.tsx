"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TargetAndTransition } from "motion/react";

type DrawerSide = "right" | "left" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  width?: string;
}

const panelVariants: Record<DrawerSide, { className: string; initial: TargetAndTransition; animate: TargetAndTransition }> = {
  right: {
    className: "fixed right-0 top-0 h-full z-50 bg-[#101010] border-l border-[#222222] flex flex-col",
    initial: { x: "100%" },
    animate: { x: 0 },
  },
  left: {
    className: "fixed left-0 top-0 h-full z-50 bg-[#101010] border-r border-[#222222] flex flex-col",
    initial: { x: "-100%" },
    animate: { x: 0 },
  },
  bottom: {
    className: "fixed bottom-0 left-0 right-0 max-h-[85vh] z-50 bg-[#101010] border-t border-[#222222] rounded-t-[16px] flex flex-col",
    initial: { y: "100%" },
    animate: { y: 0 },
  },
};

export function Drawer({ open, onClose, side = "right", title, description, children, width = "360px" }: DrawerProps) {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const pv = panelVariants[side];

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            initial={pv.initial}
            animate={pv.animate}
            exit={pv.initial}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className={pv.className}
            style={side !== "bottom" ? { width } : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] shrink-0">
              <div>
                {title && <h2 className="text-[#f0f0f0] font-semibold">{title}</h2>}
                {description && <p className="text-[#505050] text-xs mt-0.5">{description}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
