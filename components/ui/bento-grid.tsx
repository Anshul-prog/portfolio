import { cn } from "@/lib/utils";
import React from "react";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  title,
  description,
  header,
  icon,
  glow = true,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  glow?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-[1.5rem] bg-[#111111] overflow-hidden p-8 flex flex-col group/bento transition duration-500 hover:shadow-2xl border border-[#333333]",
        className
      )}
    >
      {glow && <GlowingEffect spread={40} proximity={64} className="z-10" />}
      
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-50 z-0"></div>

      <div className="z-20 flex-grow">
        {header && <div className="mb-4">{header}</div>}
      </div>

      <div className="z-20 relative transform group-hover/bento:-translate-y-2 transition duration-500 flex flex-col justify-end mt-4">
        {icon && <div className="mb-6">{icon}</div>}
        <div className="font-sans font-bold text-white text-xl mb-3 tracking-wide">{title}</div>
        <div className="font-sans font-normal text-[#888888] text-sm leading-relaxed max-w-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
