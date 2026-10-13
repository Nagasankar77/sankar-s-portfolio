import React from 'react';
import { Brain, Rocket, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollSectionHeader } from './FadeInSection';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 bg-[#FFFDF8] border-y border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          title="ABOUT ME"
          id="about-heading"
          className="mb-16"
        />

        {/* Narrative & Focus Cards with Coordinated Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Content Card (Slide in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between bg-[#F5F0E6] p-8 sm:p-10 rounded-2xl border border-[#263238]/12 relative shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#263238]/10 dark:bg-white/10 border border-[#263238]/20 dark:border-white/20 flex items-center justify-center text-[#263238]">
                  <Brain className="w-5 h-5 text-[#C58B3A] dark:text-[#E5A955]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#263238] dark:text-[#FFFDF8] font-['Space_Grotesk']">
                    The Mindset of an AI & ML Student
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#68747C] dark:text-[#9EADB6] font-semibold">
                    Learning and building, step by step
                  </span>
                </div>
              </div>

              {/* Exact user requested content */}
              <p className="text-lg sm:text-xl text-[#263238] dark:text-[#FFFDF8] font-medium leading-relaxed mb-6 border-l-3 border-[#C58B3A] dark:border-[#E5A955] pl-5">
                "{PERSONAL_INFO.detailedBio}"
              </p>

              {/* Focus highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#263238]/10">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-[#263238]/5 dark:bg-white/10 text-[#C58B3A] dark:text-[#E5A955] mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#263238] dark:text-[#FFFDF8]">Foundational First</h4>
                    <p className="text-xs text-[#4F5961] dark:text-[#D8D3C8] mt-0.5 leading-normal">
                      Mastering Python syntax, algorithm complexities and data manipulation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-[#263238]/5 dark:bg-white/10 text-[#4F7CAC] dark:text-[#7CA2D6] mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#263238] dark:text-[#FFFDF8]">Practical Applications</h4>
                    <p className="text-xs text-[#4F5961] dark:text-[#D8D3C8] mt-0.5 leading-normal">
                      Creating real tools for exam blueprints, career roadmaps and interactive web apps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics & Highlights (Slide in from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-5"
          >
            {/* Aspirations box */}
            <div className="h-full p-8 sm:p-10 rounded-2xl bg-[#263238] dark:bg-[#1A2328] border border-transparent dark:border-[#E5A955]/30 text-[#FFFDF8] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-[#C58B3A] dark:text-[#E5A955]" />
                  <h4 className="text-lg font-bold font-['Space_Grotesk'] text-[#FFFDF8]">
                    Career Vision
                  </h4>
                </div>
                <p className="text-base text-[#FFFDF8]/85 leading-relaxed">
                  Aiming to graduate ready to contribute as an AI Engineer, with solid software craft and a genuine passion for solving human problems with machine learning.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-[#FFFDF8]/60 uppercase tracking-widest font-mono">
                <span>Focus</span>
                <span className="text-[#C58B3A] dark:text-[#E5A955] font-bold">Applied AI & Software</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
