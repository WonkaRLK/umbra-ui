"use client";
import * as React from "react";
import { registry, categories, type ComponentCategory } from "@/registry";
import { ComponentCard } from "@/components/site/component-card";

export default function ComponentsPage() {
  const [active, setActive] = React.useState<ComponentCategory | "Todos">("Todos");

  const filtered = active === "Todos"
    ? registry
    : registry.filter((c) => c.category === active);

  return (
    <div className="min-h-screen bg-[#05040d]">
      {/* Header */}
      <div className="border-b border-[#1e1640] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold text-[#ddd6fe] font-[family-name:var(--font-display)]">
            Umbra <span className="text-[#7c3aed]">UI</span>
          </a>
          <nav className="flex gap-6">
            <a href="/components" className="text-sm text-[#ddd6fe] font-medium">Componentes</a>
            <a href="#" className="text-sm text-[#7c6f9e] hover:text-[#ddd6fe] transition-colors">Temas</a>
            <a href="#" className="text-sm text-[#7c6f9e] hover:text-[#ddd6fe] transition-colors">Docs</a>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar */}
        <aside className="w-44 shrink-0">
          <p className="text-xs text-[#7c6f9e] uppercase tracking-widest mb-3">Categorías</p>
          <ul className="flex flex-col gap-1">
            {(["Todos", ...categories] as const).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActive(cat as ComponentCategory | "Todos")}
                  className={`w-full text-left text-sm px-3 py-2 rounded-[8px] transition-colors ${
                    active === cat
                      ? "bg-[#1e1040] text-[#ddd6fe] font-semibold"
                      : "text-[#7c6f9e] hover:text-[#ddd6fe]"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#ddd6fe] font-[family-name:var(--font-display)]">
              Componentes
            </h1>
            <span className="text-sm text-[#7c6f9e]">{filtered.length} componentes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <ComponentCard key={entry.name} entry={entry} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
