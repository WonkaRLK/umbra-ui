"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
}

export function CommandPalette({ items, open, onClose, placeholder = "Buscar comandos..." }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const cat = item.category ?? "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return map;
  }, [filtered]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setFocused(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setFocused((p) => Math.min(p + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setFocused((p) => Math.max(p - 1, 0));
      if (e.key === "Enter" && filtered[focused]) {
        filtered[focused].action();
        onClose();
      }
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose, filtered, focused]);

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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed z-50 top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg mx-4 rounded-[16px] border border-[#222222] bg-[#101010] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#222222]">
              <Search className="h-4 w-4 text-[#505050] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setFocused(0); }}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-[#a0a0a0] placeholder:text-[#505050] outline-none"
              />
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-[#505050] py-8">Sin resultados</p>
              ) : (
                (() => {
                  let globalIdx = 0;
                  return Array.from(grouped.entries()).map(([cat, catItems]) => (
                    <div key={cat}>
                      <p className="px-3 py-1 text-xs font-medium text-[#505050] uppercase tracking-wider">
                        {cat}
                      </p>
                      {catItems.map((item) => {
                        const idx = globalIdx++;
                        return (
                          <button
                            key={item.id}
                            onClick={() => { item.action(); onClose(); }}
                            onMouseEnter={() => setFocused(idx)}
                            className={cn(
                              "flex w-full items-center gap-3 px-3 py-2 mx-1 rounded-[7px] text-sm transition-colors focus:outline-none",
                              idx === focused
                                ? "bg-[#181818] border border-[#222222]"
                                : "hover:bg-[#181818]"
                            )}
                            style={{ width: "calc(100% - 8px)" }}
                          >
                            {item.icon && (
                              <span className="h-[18px] w-[18px] text-[#505050] shrink-0">{item.icon}</span>
                            )}
                            <div className="flex-1 text-left min-w-0">
                              <span className="text-[#a0a0a0]">{item.label}</span>
                              {item.description && (
                                <span className="ml-2 text-xs text-[#505050]">{item.description}</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
