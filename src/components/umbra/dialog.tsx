"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogSize = "sm" | "md" | "lg";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: DialogSize;
}

const sizeClass: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Dialog({ open, onClose, title, description, children, footer, size = "md" }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-4 rounded-[16px] border border-[#222222] bg-[#101010] shadow-2xl",
              sizeClass[size]
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
            {(title || description) && (
              <div className="px-6 pt-6 pb-0">
                {title && <h2 className="text-[#f0f0f0] font-semibold text-lg pr-6">{title}</h2>}
                {description && <p className="text-[#505050] text-sm mt-1">{description}</p>}
              </div>
            )}
            {children && <div className="px-6 py-4 text-[#a0a0a0] text-sm">{children}</div>}
            {footer && <div className="px-6 pb-6 flex justify-end gap-2">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex justify-end gap-2", className)}>{children}</div>;
}
