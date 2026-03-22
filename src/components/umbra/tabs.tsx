"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue ?? tabs[0]?.value);
  const current = tabs.find((t) => t.value === active);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex gap-1 rounded-[10px] border border-[#1e1640] bg-[#0d0b1a] p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-[7px] transition-colors",
              active === tab.value ? "text-[#ddd6fe]" : "text-[#7c6f9e] hover:text-[#ddd6fe]"
            )}
          >
            {active === tab.value && (
              <motion.span
                layoutId="umbra-tab-indicator"
                className="absolute inset-0 rounded-[7px] bg-[#1e1040]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}
