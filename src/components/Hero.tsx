import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import proPic from '../assets/pro_pic_main.png';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TypewriterText } from './TypewriterText';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-28 pb-16 overflow-hidden w-full max-w-full box-border"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 box-border">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-10 lg:gap-14 items-center w-full">
          {/* LEFT COLUMN: Editorial Student Introduction with Staggered Motion */}
          <div className="flex flex-col justify-center text-left min-w-0 w-full">
            {/* Dynamic Typewriter Sub-headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#4F7CAC] dark:text-[#7CA2D6] mb-3 min-h-[1.75rem]"
              aria-label="Areas of Focus: AI & Machine Learning Student, AI Researcher, Full-Stack Developer, ML Engineer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58B3A] dark:bg-[#E5A955] shrink-0" />
              <TypewriterText
                words={['AI & MACHINE LEARNING STUDENT', 'AI RESEARCHER', 'FULL-STACK DEVELOPER', 'ML ENGINEER']}
                typingSpeed={80}
                deletingSpeed={45}
                pauseDuration={2000}
                className="font-bold tracking-[0.2em] text-[#4F7CAC] dark:text-[#7CA2D6]"
              />
            </motion.div>

            {/* Main heading: NAGA SANKAR */}
            <motion.h1
              id="hero-brand-heading"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(1.85rem, 5.2vw, 52px)',
                lineHeight: 1.1,
                maxWidth: '100%',
              }}
              className="font-black tracking-tight text-[#263238] dark:text-[#FFFDF8] uppercase font-['Space_Grotesk'] mb-4 whitespace-nowrap"
            >
              NAGA SANKAR
            </motion.h1>

            {/* Exact hero description */}
            <motion.p
              id="hero-intro-text"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#4F5961] dark:text-[#D8D3C8] max-w-xl leading-relaxed mb-8 font-normal"
            >
              {PERSONAL_INFO.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              id="hero-cta-group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                id="hero-btn-view-work"
                onClick={scrollToProjects}
                className="btn-primary px-7 py-3.5 bg-[#C58B3A] hover:bg-[#b0782f] text-[#263238] dark:bg-[#E5A955] dark:hover:bg-[#F0BC6D] dark:text-[#12181B] font-bold uppercase tracking-wider text-xs rounded-md transition-colors cursor-pointer shadow-md shadow-[#C58B3A]/20"
              >
                VIEW MY WORK
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                id="hero-btn-download-resume"
                href="/resume.pdf"
                download="NagaSankar-Resume.pdf"
                className="px-7 py-3.5 bg-transparent border-2 border-[#263238] dark:border-[#E5A955] hover:bg-[#263238]/5 dark:hover:bg-[#E5A955]/15 text-[#263238] dark:text-[#E5A955] font-bold uppercase tracking-wider text-xs rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
              >
                DOWNLOAD RESUME
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Real Uploaded Photograph in Warm Cream / Dark Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-full min-w-0"
          >
            <div
              id="hero-photo-frame"
              className="w-full max-w-[400px] lg:max-w-[440px] aspect-square shadow-md transition-all rounded-[24px] p-3 bg-[#FFFDF8] dark:bg-[#1A2328] border border-[#263238]/15 dark:border-[#E5A955]/30 shadow-[#C58B3A]/5 hover:shadow-xl hover:shadow-[#C58B3A]/10 transition-shadow duration-300"
            >
              <div className="w-full h-full rounded-[16px] overflow-hidden bg-[#F5F0E6] dark:bg-[#12181B] flex items-center justify-center">
                <img
                  src={proPic}
                  alt="NAGA Sankar"
                  className="profile-photo w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    if (!el.src.includes('/pro_pic_main.png')) {
                      el.src = '/pro_pic_main.png';
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Down Hint with gentle floating motion */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.7, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.8, duration: 0.6 },
          y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
        }}
        className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#263238]/60 dark:text-[#9EADB6]">
          Scroll Down
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#C58B3A] dark:text-[#E5A955]" />
      </motion.div>
    </section>
  );
};
