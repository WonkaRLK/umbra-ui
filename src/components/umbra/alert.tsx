"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "destructive";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantConfig: Record<AlertVariant, { border: string; bg: string; icon: React.ReactNode; iconColor: string }> = {
  info: {
    border: "border-[#a855f7]/30",
    bg: "bg-[#a855f7]/5",
    icon: <Info className="h-4 w-4" />,
    iconColor: "text-[#a855f7]",
  },
  success: {
    border: "border-[#22c55e]/30",
    bg: "bg-[#22c55e]/5",
    icon: <CheckCircle className="h-4 w-4" />,
    iconColor: "text-[#22c55e]",
  },
  warning: {
    border: "border-[#eab308]/30",
    bg: "bg-[#eab308]/5",
    icon: <AlertTriangle className="h-4 w-4" />,
    iconColor: "text-[#eab308]",
  },
  destructive: {
    border: "border-[#ef4444]/30",
    bg: "bg-[#ef4444]/5",
    icon: <XCircle className="h-4 w-4" />,
    iconColor: "text-[#ef4444]",
  },
};

export function Alert({ variant = "info", title, description, icon, onClose, className }: AlertProps) {
  const [visible, setVisible] = React.useState(true);
  const config = variantConfig[variant];

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className={cn(
            "relative flex items-start gap-3 rounded-[10px] border px-4 py-3",
            config.border,
            config.bg,
            className
          )}
          role="alert"
        >
          <span className={cn("mt-0.5 shrink-0", config.iconColor)}>{icon ?? config.icon}</span>
          <div className="flex-1 min-w-0">
            {title && <p className="text-sm font-semibold text-[#a0a0a0]">{title}</p>}
            {description && <p className="text-xs text-[#505050] mt-0.5">{description}</p>}
          </div>
          {onClose && (
            <button
              onClick={handleClose}
              className="shrink-0 text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
