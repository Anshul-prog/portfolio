"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  className?: string;
}

export const GlowingEffect = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  className,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        x > -proximity &&
        x < rect.width + proximity &&
        y > -proximity &&
        y < rect.height + proximity
      ) {
        container.style.setProperty("--x", `${x}px`);
        container.style.setProperty("--y", `${y}px`);
        container.style.setProperty("--opacity", glow ? "1" : "0");
      } else {
        container.style.setProperty("--opacity", "0");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [disabled, proximity, glow]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full rounded-[inherit] opacity-0 transition-opacity duration-500",
        className
      )}
      style={{
        background: `radial-gradient(${spread * 2}px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.1), transparent 100%)`,
        opacity: "var(--opacity, 0)",
      }}
    />
  );
};
