import React from 'react';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollSectionHeader } from './FadeInSection';

export const Achievements: React.FC = () => {
  return (
    <section
      id="achievements"
      className="relative py-24 sm:py-28 bg-[#FFFDF8] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          badge="Status & Milestones"
          title="ACHIEVEMENTS"
          id="achievements-heading"
          className="mb-14"
        />

        {/* Clean Honest Status Card with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-10 rounded-2xl bg-[#F5F0E6] border border-[#263238]/15 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-12 h-12 rounded-xl bg-[#263238]/5 dark:bg-white/10 border border-[#263238]/12 dark:border-white/20 flex items-center justify-center mx-auto mb-5 text-[#C58B3A] dark:text-[#E5A955]"
          >
            <Compass className="w-6 h-6" />
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#263238] dark:text-[#FFFDF8] mb-3">
            Currently building my skills and projects.
          </h3>

          <p className="text-sm sm:text-base text-[#4F5961] dark:text-[#D8D3C8] max-w-xl mx-auto leading-relaxed">
            As a 2nd-year B.Tech student in Artificial Intelligence & Machine Learning, my primary focus is mastering programming fundamentals, data structures, and developing useful applied projects like PROXIMUS, CareerPath AI, and THE HOUSE OF DEVIL.
          </p>

          <div className="mt-6 pt-6 border-t border-[#263238]/10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#4F5961] dark:text-[#D8D3C8]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C58B3A] dark:bg-[#E5A955]" />
              Hands-on Project Building
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4F7CAC] dark:bg-[#7CA2D6]" />
              Academic Foundations
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#263238] dark:bg-white/70" />
              Python & DSA Mastery
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
