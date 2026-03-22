"use client";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a1f4e] bg-[#110f1e] px-4 py-1.5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
        <span className="text-xs font-medium text-[#a855f7] tracking-wide">Dark Luxury · React + Tailwind v4</span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#ede8ff] leading-tight max-w-4xl"
      >
        Componentes que se ven{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #a855f7, #7c3aed)" }}
        >
          diferentes.
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-lg text-[#7c6f9e] leading-relaxed"
      >
        Umbra UI es una librería de componentes React con el tema Dark Luxury — distinto al shadcn gris de siempre. Copy-paste, production-ready.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="/components"
          className="inline-flex items-center gap-2 rounded-[10px] bg-[#4c1d95] px-6 py-3 text-sm font-semibold text-[#ede8ff] hover:bg-[#5b21b6] transition-colors"
        >
          Ver componentes
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a
          href="https://github.com"
          className="inline-flex items-center gap-2 rounded-[10px] border border-[#1e1640] px-6 py-3 text-sm font-semibold text-[#7c6f9e] hover:text-[#ddd6fe] hover:border-[#2a1f4e] transition-colors"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
          </svg>
          GitHub
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 flex items-center gap-8 text-center"
      >
        {[
          { value: "8+", label: "Componentes" },
          { value: "1", label: "Tema Dark Luxury" },
          { value: "0", label: "Dependencias extra" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-2xl font-bold text-[#ddd6fe] font-[family-name:var(--font-display)]">{value}</p>
            <p className="text-xs text-[#7c6f9e] mt-1">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
