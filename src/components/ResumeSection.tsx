import React from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollSectionHeader } from './FadeInSection';

interface ResumeSectionProps {
  onOpenResume?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = () => {
  return (
    <section
      id="resume"
      className="relative py-24 sm:py-28 bg-[#FFFDF8] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          badge="Curriculum Vitae"
          title="STUDENT RESUME"
          id="resume-heading"
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-12 rounded-2xl bg-[#F5F0E6] border border-[#263238]/15 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-base text-[#4F5961] dark:text-[#D8D3C8] max-w-xl mx-auto leading-relaxed mb-6">
            Review my complete academic coursework, technical skills in Python and machine learning, and hands-on projects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-semibold text-[#263238] dark:text-[#FFFDF8]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C58B3A] dark:text-[#E5A955]" />
              <span>2nd-Year B.Tech AI & ML</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C58B3A] dark:text-[#E5A955]" />
              <span>Python, DSA & AI/ML</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C58B3A] dark:text-[#E5A955]" />
              <span>Hands-on Project Portfolio</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              id="resume-section-view-btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#263238] dark:bg-[#E5A955] hover:bg-[#C58B3A] dark:hover:bg-[#F0BC6D] text-[#FFFDF8] dark:text-[#12181B] font-bold uppercase tracking-wider text-xs rounded-md transition-colors cursor-pointer shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>RESUME.PDF</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              id="resume-section-download-btn"
              href="/resume.pdf"
              download="NagaSankar-Resume.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-[#263238] dark:border-[#E5A955] hover:bg-[#263238]/5 dark:hover:bg-[#E5A955]/15 text-[#263238] dark:text-[#E5A955] font-bold uppercase tracking-wider text-xs rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
