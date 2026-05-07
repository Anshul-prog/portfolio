"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export const Card3DWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${bgX} ${bgY}, rgba(168,85,247,0.15) 0%, transparent 60%)`;
  const borderBackground = useMotionTemplate`radial-gradient(circle at ${bgX} ${bgY}, rgba(168,85,247,0.8) 0%, transparent 40%)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        rotateX,
        rotateY,
      }}
      className={`relative group/3d h-full w-full ${className || ""}`}
    >
      {/* Glow border pseudo-element effect (via background layer) */}
      <motion.div 
        className="absolute -inset-[1px] z-0 rounded-[inherit] opacity-0 group-hover/3d:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: borderBackground }}
      />

      {/* Inner wrapper for card background to obscure center of border glow */}
      <div className="absolute inset-0 z-10 rounded-[inherit] bg-[#0d0d0d] pointer-events-none" />

      {/* Spotlight hover effect inside the card */}
      <motion.div 
        className="absolute inset-0 z-20 rounded-[inherit] opacity-0 group-hover/3d:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightBackground }}
      />
      
      {/* Apply translation to children for depth */}
      <motion.div
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
        }}
        className="w-full h-full transition-transform duration-300 ease-out relative z-30 flex flex-col"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
