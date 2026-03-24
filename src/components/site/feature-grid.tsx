"use client";
import { motion } from "motion/react";

const features = [
  {
    icon: "✦",
    title: "Distinto de todo",
    description: "Un tema Dark Luxury con identidad propia. No mas el gris generico de shadcn.",
  },
  {
    icon: "◈",
    title: "Listo para produccion",
    description: "Componentes completos para apps reales: tablas, formularios, navegacion y mas.",
  },
  {
    icon: "⬡",
    title: "Copy-paste. Vos sos el dueno.",
    description: "El mismo modelo que shadcn/ui. Copias el codigo, lo modificas como queres.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 px-6 border-t border-[#222222]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-[#f0f0f0] font-[family-name:var(--font-display)] mb-12"
        >
          Por que Umbra
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[16px] border border-[#222222] bg-[#101010] p-6 flex flex-col gap-4 hover:border-[#7c3aed]/30 transition-colors"
            >
              <span className="text-2xl text-[#7c3aed]">{f.icon}</span>
              <h3 className="text-base font-semibold text-[#f0f0f0]">{f.title}</h3>
              <p className="text-sm text-[#505050] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}