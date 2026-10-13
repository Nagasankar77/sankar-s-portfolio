import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ReadingProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="w-full h-full bg-gradient-to-r from-[#263238] via-[#C58B3A] to-[#4F7CAC] dark:from-[#E5A955] dark:via-[#7CA2D6] dark:to-[#FFFDF8] shadow-[0_0_8px_rgba(197,139,58,0.5)] dark:shadow-[0_0_10px_rgba(229,169,85,0.6)]"
      />
    </div>
  );
};
