"use client";
import * as React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperStep {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({ steps, currentStep, orientation = "horizontal", className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col", className)}>
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="flex gap-3 relative">
              <div className="flex flex-col items-center">
                <StepIndicator completed={isCompleted} active={isActive} index={i} />
                {!isLast && <div className={cn("w-0.5 flex-1 mt-1 mb-1", isCompleted ? "bg-[#7c3aed]" : "bg-[#222222]")} />}
              </div>
              <div className={cn("pb-8", isLast && "pb-0")}>
                <p className={cn("text-xs font-medium", isActive || isCompleted ? "text-[#a0a0a0]" : "text-[#505050]")}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-[#505050] mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-start", className)}>
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {!isLast && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 w-full h-0.5 -z-0",
                  isCompleted ? "bg-[#7c3aed]" : "bg-[#222222]"
                )}
              />
            )}
            <StepIndicator completed={isCompleted} active={isActive} index={i} />
            <p className={cn("text-xs font-medium mt-2 text-center", isActive || isCompleted ? "text-[#a0a0a0]" : "text-[#505050]")}>
              {step.label}
            </p>
            {step.description && (
              <p className="text-xs text-[#505050] mt-0.5 text-center">{step.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepIndicator({ completed, active, index }: { completed: boolean; active: boolean; index: number }) {
  return (
    <motion.div
      animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={active ? { repeat: Infinity, duration: 2 } : {}}
      className={cn(
        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
        completed
          ? "bg-[#7c3aed] border-[#7c3aed] text-white"
          : active
          ? "bg-transparent border-[#7c3aed] text-[#a855f7]"
          : "bg-transparent border-[#222222] text-[#505050]"
      )}
    >
      {completed ? <Check className="h-3.5 w-3.5" /> : index + 1}
    </motion.div>
  );
}
