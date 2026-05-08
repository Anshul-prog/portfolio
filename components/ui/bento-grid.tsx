import { cn } from "@/lib/utils";
import React from "react";
import { GlowingEffect } from "./glowing-effect";
import { Card3DWrapper } from "./3d-card-wrapper";
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
  bgImage,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  glow?: boolean;
  bgImage?: string;
}) => {
  return (
    <Card3DWrapper
      className={cn(
        "relative rounded-[1.5rem] bg-transparent overflow-hidden p-8 flex flex-col group/bento transition duration-500 hover:shadow-2xl border border-white/[0.08]",
        className
      )}
    >
      {/* Background image with dark overlay */}
      {bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover z-[11]" />
          <div className="absolute inset-0 bg-black/[0.65] z-[12]" />
        </>
      )}

      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-50 z-[13]"></div>

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
    </Card3DWrapper>
  );
};
