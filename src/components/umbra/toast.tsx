"use client";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  default: "border-[#1e1640]",
  success: "border-[#22c55e]/30",
  error:   "border-[#ef4444]/30",
  info:    "border-[#a855f7]/30",
};

const variantDot: Record<ToastVariant, string> = {
  default: "bg-[#7c3aed]",
  success: "bg-[#22c55e]",
  error:   "bg-[#ef4444]",
  info:    "bg-[#a855f7]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((item: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...item, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className={cn(
                "flex items-start gap-3 rounded-[12px] border bg-[#0d0b1a] px-4 py-3 shadow-lg min-w-[280px]",
                variantStyles[t.variant ?? "default"]
              )}
            >
              <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", variantDot[t.variant ?? "default"])} />
              <div>
                <p className="text-sm font-medium text-[#ddd6fe]">{t.message}</p>
                {t.description && <p className="text-xs text-[#7c6f9e] mt-0.5">{t.description}</p>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
