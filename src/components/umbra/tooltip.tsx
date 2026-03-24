"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: TooltipSide;
  delay?: number;
}

const positionClass: Record<TooltipSide, string> = {
  top: "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-1.5 left-1/2 -translate-x-1/2",
  left: "right-full mr-1.5 top-1/2 -translate-y-1/2",
  right: "left-full ml-1.5 top-1/2 -translate-y-1/2",
};

const motionInitial: Record<TooltipSide, Record<string, number>> = {
  top: { opacity: 0, scale: 0.9, y: 4 },
  bottom: { opacity: 0, scale: 0.9, y: -4 },
  left: { opacity: 0, scale: 0.9, x: 4 },
  right: { opacity: 0, scale: 0.9, x: -4 },
};

export function Tooltip({ content, children, side = "top", delay = 400 }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  const typedChildren = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  const child = React.cloneElement(typedChildren, {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      typedChildren.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      typedChildren.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      typedChildren.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      typedChildren.props.onBlur?.(e);
    },
  });

  return (
    <span className="relative inline-block">
      {child}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={motionInitial[side]}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={motionInitial[side]}
            transition={{ duration: 0.12 }}
            className={cn(
              "absolute z-50 px-2 py-1 rounded-[7px] border border-[#222222] bg-[#181818] text-[#a0a0a0] text-xs whitespace-nowrap shadow-lg pointer-events-none",
              positionClass[side]
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
