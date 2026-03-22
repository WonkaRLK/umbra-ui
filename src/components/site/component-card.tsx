"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ComponentEntry } from "@/registry";

interface ComponentCardProps {
  entry: ComponentEntry;
}

export function ComponentCard({ entry }: ComponentCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(entry.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-[16px] border border-[#1e1640] bg-[#0d0b1a] overflow-hidden flex flex-col">
      {/* Preview area */}
      <div className="flex items-center justify-center min-h-[140px] p-6 bg-[#05040d] border-b border-[#1e1640]">
        {entry.preview}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-[#ddd6fe]">{entry.name}</p>
            <p className="text-xs text-[#7c6f9e] mt-0.5">{entry.description}</p>
          </div>
          <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1e1040] text-[#a855f7]">
            {entry.category}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 text-xs font-semibold py-2 rounded-[8px] bg-[#4c1d95] text-[#ede8ff] hover:bg-[#5b21b6] transition-colors"
          >
            {copied ? "¡Copiado!" : "Copiar código"}
          </button>
          <button
            onClick={() => setShowCode((v) => !v)}
            className="text-xs font-semibold px-3 py-2 rounded-[8px] border border-[#1e1640] text-[#7c6f9e] hover:text-[#ddd6fe] transition-colors"
          >
            {showCode ? "Ocultar" : "Ver código"}
          </button>
        </div>

        <AnimatePresence>
          {showCode && (
            <motion.pre
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <code className="block text-[11px] text-[#7c6f9e] bg-[#05040d] rounded-[8px] p-3 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                {entry.code}
              </code>
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
