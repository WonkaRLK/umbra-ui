"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ComponentEntry } from "@/registry";
import { toSlug } from "@/lib/registry-utils";

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
    <div className="rounded-[16px] border border-[#222222] bg-[#101010] overflow-hidden flex flex-col">
      {/* Preview area */}
      <div className="flex items-center justify-center min-h-[140px] p-6 bg-[#080808] border-b border-[#222222]">
        {entry.preview}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <a
              href={`/components/${toSlug(entry.name)}`}
              className="text-sm font-semibold text-[#f0f0f0] hover:text-[#a855f7] transition-colors"
            >
              {entry.name}
            </a>
            <p className="text-xs text-[#505050] mt-0.5">{entry.description}</p>
          </div>
          <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1c1c2e] text-[#a855f7]">
            {entry.category}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 text-xs font-semibold py-2 rounded-[8px] bg-[#4c1d95] text-[#f0f0f0] hover:bg-[#5b21b6] transition-colors"
          >
            {copied ? "Copiado!" : "Copiar codigo"}
          </button>
          <button
            onClick={() => setShowCode((v) => !v)}
            className="text-xs font-semibold px-3 py-2 rounded-[8px] border border-[#222222] text-[#505050] hover:text-[#a0a0a0] transition-colors"
          >
            {showCode ? "Ocultar" : "Ver codigo"}
          </button>
          <a
            href={`/components/${toSlug(entry.name)}`}
            className="text-xs font-semibold px-3 py-2 rounded-[8px] border border-[#222222] text-[#505050] hover:text-[#a0a0a0] transition-colors"
            title="Ver pagina de documentacion"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <AnimatePresence>
          {showCode && (
            <motion.pre
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <code className="block text-[11px] text-[#505050] bg-[#080808] rounded-[8px] p-3 overflow-x-auto whitespace-pre font-[family-name:var(--font-mono)] leading-relaxed">
                {entry.code}
              </code>
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
