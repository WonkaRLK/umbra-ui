"use client";
import { motion } from "motion/react";

const features = [
  {
    icon: "✦",
    title: "Distinto de todo",
    description: "Un tema Dark Luxury con identidad propia. No más el gris genérico de shadcn.",
  },
  {
    icon: "⬡",
    title: "Listo para producción",
    description: "Componentes completos para apps reales: tablas, formularios, navegación y más.",
  },
  {
    icon: "⌥",
    title: "Copy-paste. Vos sos el dueño.",
    description: "El mismo modelo que shadcn/ui. Copiás el código, lo modificás como querés.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 px-6 border-t border-[#1e1640]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-[#ddd6fe] font-[family-name:var(--font-display)] mb-12"
        >
          Por qué Umbra
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[16px] border border-[#1e1640] bg-[#0d0b1a] p-6 flex flex-col gap-4"
            >
              <span className="text-2xl text-[#7c3aed]">{f.icon}</span>
              <h3 className="text-base font-semibold text-[#ddd6fe]">{f.title}</h3>
              <p className="text-sm text-[#7c6f9e] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
