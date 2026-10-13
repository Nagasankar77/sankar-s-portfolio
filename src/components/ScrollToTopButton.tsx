import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          id="floating-scroll-to-top"
          aria-label="Scroll back to top"
          title="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#263238] dark:bg-[#1E282E] text-[#FFFDF8] dark:text-[#E5A955] border border-white/15 dark:border-[#E5A955]/30 shadow-lg shadow-black/20 hover:border-[#C58B3A] dark:hover:border-[#E5A955] hover:bg-[#C58B3A] dark:hover:bg-[#2A373F] dark:hover:text-[#FFFDF8] transition-colors cursor-pointer group"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
