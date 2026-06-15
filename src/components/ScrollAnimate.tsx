import React from 'react';
import { motion } from 'motion/react';

interface ScrollAnimateProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollAnimate({ children, className = "" }: ScrollAnimateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration: 0.9, 
        ease: [0.215, 0.61, 0.355, 1] // premium cubic-bezier easeOutExpo-like feeling
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
