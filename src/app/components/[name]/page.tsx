"use client";
import * as React from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "motion/react";
import { registry } from "@/registry";
import { fromSlug, toSlug } from "@/lib/registry-utils";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold border border-[#222222] text-[#505050] hover:text-[#a0a0a0] hover:border-[#7c3aed]/40 transition-all"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar código
        </>
      )}
    </button>
  );
}

export default function ComponentDetailPage() {
  const params = useParams();
  const slug = typeof params.name === "string" ? params.name : "";
  const componentName = fromSlug(slug);
  const index = registry.findIndex((e) => e.name === componentName);

  if (index === -1) {
    notFound();
  }

  const entry = registry[index];
  const prev = index > 0 ? registry[index - 1] : null;
  const next = index < registry.length - 1 ? registry[index + 1] : null;

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header */}
      <div className="border-b border-[#222222] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold text-[#f0f0f0] font-[family-name:var(--font-display)]">
            Umbra <span className="text-[#7c3aed]">UI</span>
          </a>
          <nav className="flex gap-6">
            <a href="/components" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">Componentes</a>
            <a href="#" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">Temas</a>
            <a href="#" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">Docs</a>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs text-[#505050] mb-8"
        >
          <a href="/components" className="hover:text-[#a0a0a0] transition-colors">Componentes</a>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#a0a0a0]">{entry.name}</span>
        </motion.div>

        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex items-start justify-between gap-4 mb-2"
        >
          <h1 className="text-3xl font-bold text-[#f0f0f0] font-[family-name:var(--font-display)]">
            {entry.name}
          </h1>
          <span className="mt-1 shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1c1c2e] text-[#a855f7]">
            {entry.category}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm text-[#505050] mb-10 max-w-xl"
        >
          {entry.description}
        </motion.p>

        {/* Preview */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#505050] mb-3">Preview</p>
          <div
            className="flex items-center justify-center min-h-[200px] p-10 rounded-[16px] border border-[#222222] bg-[#080808]"
            style={{ backgroundImage: "radial-gradient(circle, #a855f7 1px, transparent 1px)", backgroundSize: "28px 28px", backgroundBlendMode: "overlay" }}
          >
            <div className="relative z-10 flex items-center justify-center" style={{ opacity: 1 }}>
              {entry.preview}
            </div>
          </div>
        </motion.section>

        {/* Code */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#505050]">Código</p>
            <CopyButton code={entry.code} />
          </div>
          <div className="rounded-[12px] border border-[#222222] bg-[#101010] overflow-hidden">
            {/* Code header bar */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#222222]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/40" />
              <span className="ml-3 text-[11px] text-[#505050] font-[family-name:var(--font-mono)]">{toSlug(entry.name)}.tsx</span>
            </div>
            <pre className="overflow-x-auto p-5">
              <code className="text-[12px] text-[#a0a0a0] font-[family-name:var(--font-mono)] leading-relaxed whitespace-pre">
                {entry.code}
              </code>
            </pre>
          </div>
        </motion.section>

        {/* Prev / Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between border-t border-[#222222] pt-8"
        >
          {prev ? (
            <a
              href={`/components/${toSlug(prev.name)}`}
              className="group flex items-center gap-2 text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>
                <span className="block text-[10px] uppercase tracking-widest text-[#505050] mb-0.5">Anterior</span>
                {prev.name}
              </span>
            </a>
          ) : <div />}

          {next ? (
            <a
              href={`/components/${toSlug(next.name)}`}
              className="group flex items-center gap-2 text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors text-right"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-widest text-[#505050] mb-0.5">Siguiente</span>
                {next.name}
              </span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          ) : <div />}
        </motion.div>
      </div>
    </div>
  );
}
