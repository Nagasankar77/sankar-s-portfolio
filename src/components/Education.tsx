import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../data/portfolioData';
import { ScrollSectionHeader } from './FadeInSection';

export const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="relative py-24 sm:py-28 bg-[#F5F0E6] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          badge="Academic Background"
          title="EDUCATION"
          id="education-heading"
          className="mb-14"
        />

        {/* Education Highlight Card with Smooth Elevation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FFFDF8] p-8 sm:p-10 rounded-2xl border border-[#263238]/15 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#263238]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#263238]/5 dark:bg-white/10 text-[#263238] dark:text-[#FFFDF8] text-[11px] font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-[#C58B3A] dark:text-[#E5A955]" />
                <span>Currently Enrolled • 2nd Year</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#263238] dark:text-[#FFFDF8] font-['Space_Grotesk']">
                {EDUCATION.institution}
              </h3>
              <p className="text-base font-semibold text-[#4F7CAC] dark:text-[#7CA2D6] mt-1">
                {EDUCATION.degree} — {EDUCATION.branch}
              </p>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-[#68747C] dark:text-[#9EADB6] gap-1.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C58B3A] dark:text-[#E5A955]" />
                <span>{EDUCATION.timeline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#68747C] dark:text-[#9EADB6]" />
                <span>{EDUCATION.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-3">
                Current Academic Highlights
              </h4>
              <ul className="space-y-2">
                {EDUCATION.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-2.5 text-xs text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C58B3A] dark:text-[#E5A955] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-3">
                Relevant Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.relevantCoursework.map((course, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.15 + idx * 0.04 }}
                    className="px-3 py-1 rounded bg-[#F5F0E6] dark:bg-[#1A2328] border border-[#263238]/10 dark:border-white/10 text-xs font-medium text-[#263238] dark:text-[#FFFDF8] hover:border-[#C58B3A]/40 transition-colors"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
