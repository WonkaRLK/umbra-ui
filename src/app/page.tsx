import { Hero } from "@/components/site/hero";
import { ShowcaseStrip } from "@/components/site/showcase-strip";
import { FeatureGrid } from "@/components/site/feature-grid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#222222] bg-[#080808]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-base font-bold text-[#a0a0a0] font-[family-name:var(--font-display)]">
            Umbra <span className="text-[#7c3aed]">UI</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/components" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">
              Componentes
            </a>
            <a href="#" className="text-sm text-[#505050] hover:text-[#a0a0a0] transition-colors">
              Docs
            </a>
            <a
              href="/components"
              className="text-sm font-semibold px-4 py-2 rounded-[8px] bg-[#4c1d95] text-[#f0f0f0] hover:bg-[#5b21b6] transition-colors"
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

      <footer className="border-t border-[#222222] py-8 text-center">
        <p className="text-xs text-[#505050]">
          Umbra UI � Built with Next.js + Tailwind v4 + shadcn/ui
        </p>
      </footer>
    </main>
  );
}
