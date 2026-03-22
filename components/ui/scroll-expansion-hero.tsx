"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollExpandMediaProps {
  mediaType?: "image" | "video";
  mediaSrc: string;
  bgImageSrc?: string;
  title: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  className,
  children
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.35, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.8]);

  return (
    <div ref={containerRef} className={cn("relative h-[200vh] bg-[#000000] w-full", className)}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {bgImageSrc && (
          <motion.div 
            className="absolute inset-0 z-0 bg-cover bg-center mix-blend-screen"
            style={{ backgroundImage: `url(${bgImageSrc})`, opacity: bgOpacity }}
          />
        )}
        
        <div className="absolute inset-0 bg-[#000000]/50 z-[1] pointer-events-none" />

        <motion.div 
          style={{ opacity }}
          className={cn(
            "absolute top-[20%] z-10 flex flex-col items-center justify-center text-center w-full",
            textBlend && "mix-blend-difference"
          )}
        >
          {date && <div className="text-white text-xs tracking-widest uppercase font-space-grotesk mb-4">{date}</div>}
          {children ? children : (
             <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black font-syne max-w-6xl mx-auto px-4 uppercase leading-[1.05]">{title}</h1>
          )}
        </motion.div>

        <motion.div
           style={{ scale, y }}
           className="relative z-20 w-[85vw] md:w-[60vw] h-[40vh] md:h-[60vh] rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-[#333333]"
        >
           {mediaType === "video" ? (
             <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
           ) : (
             <img src={mediaSrc} className="w-full h-full object-cover" alt="Expanded Media" />
           )}
           <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>

        <motion.div style={{ opacity }} className="absolute bottom-10 z-10 text-[#888888] font-space-grotesk text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2">
          {scrollToExpand}
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#888888] to-transparent"></div>
        </motion.div>
      </div>
    </div>
  );
};
