"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - items.length * 40 - 16);
    setPosition({ x, y });
  };

  const close = () => setPosition(null);

  React.useEffect(() => {
    const handleClick = () => close();
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const handleScroll = () => close();
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const menu = (
    <AnimatePresence>
      {position && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[100] rounded-[10px] border border-[#222222] bg-[#101010] shadow-xl overflow-hidden min-w-[180px] py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, i) => {
            if (item.separator) {
              return <div key={i} className="my-1 border-t border-[#222222]" />;
            }
            return (
              <button
                key={i}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    close();
                  }
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
  );

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>
      {typeof document !== "undefined" && createPortal(menu, document.body)}
    </>
  );
}
