"use client";
import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
  className?: string;
}

export function CodeBlock({ code, language, filename, showCopy = true, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split("\n");
  const hasHeader = filename || language || showCopy;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-[10px] border border-[#222222] overflow-hidden bg-[#101010]", className)}>
      {hasHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#222222] bg-[#181818]">
          <span className="text-xs text-[#505050] font-[family-name:var(--font-mono)]">{filename}</span>
          <div className="flex items-center gap-2 ml-auto">
            {language && (
              <span className="text-xs text-[#a855f7] font-[family-name:var(--font-mono)]">{language}</span>
            )}
            {showCopy && (
              <button
                onClick={handleCopy}
                aria-label="Copiar código"
                className="text-[#505050] hover:text-[#a0a0a0] transition-colors focus:outline-none"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#22c55e]" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <pre className="px-4 py-4">
          <code className="text-xs font-[family-name:var(--font-mono)] leading-relaxed text-[#a0a0a0] whitespace-pre">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="select-none text-[#505050]/40 text-right w-6 shrink-0">
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
