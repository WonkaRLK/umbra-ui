import { Hero } from "@/components/site/hero";
import { ShowcaseStrip } from "@/components/site/showcase-strip";
import { FeatureGrid } from "@/components/site/feature-grid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05040d]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#1e1640] bg-[#05040d]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-base font-bold text-[#ddd6fe] font-[family-name:var(--font-display)]">
            Umbra <span className="text-[#7c3aed]">UI</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/components" className="text-sm text-[#7c6f9e] hover:text-[#ddd6fe] transition-colors">
              Componentes
            </a>
            <a href="#" className="text-sm text-[#7c6f9e] hover:text-[#ddd6fe] transition-colors">
              Docs
            </a>
            <a
              href="/components"
              className="text-sm font-semibold px-4 py-2 rounded-[8px] bg-[#4c1d95] text-[#ede8ff] hover:bg-[#5b21b6] transition-colors"
            >
              Empezar
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-14">
        <Hero />
        <ShowcaseStrip />
        <FeatureGrid />
      </div>

      <footer className="border-t border-[#1e1640] py-8 text-center">
        <p className="text-xs text-[#7c6f9e]">
          Umbra UI · Built with Next.js + Tailwind v4 + shadcn/ui
        </p>
      </footer>
    </main>
  );
}
