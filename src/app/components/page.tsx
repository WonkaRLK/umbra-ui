"use client";
import * as React from "react";
import { registry, categories, type ComponentCategory } from "@/registry";
import { ComponentCard } from "@/components/site/component-card";

export default function ComponentsPage() {
  const [active, setActive] = React.useState<ComponentCategory | "Todos">("Todos");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    let list = active === "Todos" ? registry : registry.filter((c) => c.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  const countByCategory = React.useMemo(() => {
    const map: Record<string, number> = { Todos: registry.length };
    for (const cat of categories) {
      map[cat] = registry.filter((c) => c.category === cat).length;
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header */}
      <div className="border-b border-[#222222] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold text-[#f0f0f0] font-[family-name:var(--font-display)]">
            Umbra <span className="text-[#7c3aed]">UI</span>
          </a>
          <nav className="flex gap-6">
            <a href="/components" className="text-sm text-[#f0f0f0] font-medium">Componentes</a>
            <a href="#" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">Temas</a>
            <a href="#" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">Docs</a>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <p className="text-xs text-[#505050] uppercase tracking-widest mb-3">Categorías</p>
          <ul className="flex flex-col gap-0.5">
            {(["Todos", ...categories] as const).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActive(cat as ComponentCategory | "Todos")}
                  className={`w-full text-left text-sm px-3 py-2 rounded-[8px] transition-colors flex items-center justify-between ${
                    active === cat
                      ? "bg-[#1c1c2e] text-[#f0f0f0] font-semibold"
                      : "text-[#505050] hover:text-[#a0a0a0]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[11px] tabular-nums ${active === cat ? "text-[#7c3aed]" : "text-[#222222]"}`}>
                    {countByCategory[cat]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-[#f0f0f0] font-[family-name:var(--font-display)] shrink-0">
              Componentes
            </h1>

            {/* Search */}
            <div className="flex-1 relative max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#505050] pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 16.65z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar componente..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-[8px] border border-[#222222] bg-[#101010] text-[#a0a0a0] text-xs placeholder:text-[#505050] focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed]/50 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#505050] hover:text-[#a0a0a0] transition-colors"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <span className="ml-auto text-sm text-[#505050] shrink-0">
              {filtered.length} {filtered.length === 1 ? "componente" : "componentes"}
            </span>
          </div>

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-12 w-12 rounded-full border border-[#222222] flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-[#505050]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 16.65z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#a0a0a0] mb-1">Sin resultados</p>
              <p className="text-xs text-[#505050]">No hay componentes que coincidan con &quot;{query}&quot;</p>
              <button
                onClick={() => { setQuery(""); setActive("Todos"); }}
                className="mt-4 text-xs text-[#7c3aed] hover:text-[#a855f7] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((entry) => (
                <ComponentCard key={entry.name} entry={entry} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
