import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS, SKILL_CATEGORIES } from '../data/portfolioData';
import { DynamicIcon } from './DynamicIcon';
import { ScrollSectionHeader, StaggerContainer, StaggerItem } from './FadeInSection';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSkills = selectedCategory === 'all'
    ? SKILLS
    : SKILLS.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-28 bg-[#F5F0E6] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal Choreography */}
        <ScrollSectionHeader
          badge="Technical Skills"
          title="SKILLS & TOOLS"
          subtitle="Practical programming languages, AI concepts and modern development tools I actively work with."
          id="skills-heading"
          className="mb-12"
        />

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-12"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#C58B3A] text-[#263238] dark:bg-[#E5A955] dark:text-[#12181B] shadow-sm font-extrabold'
                    : 'bg-[#FFFDF8] dark:bg-[#1C252B] text-[#4F5961] dark:text-[#D8D3C8] hover:text-[#263238] dark:hover:text-[#FFFDF8] border border-[#263238]/15 dark:border-white/15 hover:border-[#263238]/30 dark:hover:border-[#E5A955]/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Staggered Skills Grid on Scroll */}
        <StaggerContainer
          key={selectedCategory}
          delay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <StaggerItem key={skill.name}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 sm:p-6 rounded-xl bg-[#FFFDF8] border border-[#263238]/12 hover:border-[#C58B3A]/60 dark:hover:border-[#E5A955]/60 transition-colors duration-200 shadow-sm hover:shadow-md flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-lg bg-[#F5F0E6] border border-[#263238]/10 flex items-center justify-center text-[#263238] group-hover:scale-105 transition-transform duration-200">
                        <DynamicIcon name={skill.icon} className="w-5 h-5 text-[#C58B3A]" />
                      </div>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          skill.category === 'aiml'
                            ? 'bg-[#4F7CAC]/10 text-[#4F7CAC]'
                            : skill.category === 'programming'
                            ? 'bg-[#C58B3A]/10 text-[#C58B3A]'
                            : skill.category === 'core'
                            ? 'bg-[#8F785E]/15 text-[#8F785E]'
                            : 'bg-[#263238]/5 text-[#4F5961]'
                        }`}
                      >
                        {skill.category === 'aiml'
                          ? 'AI / ML'
                          : skill.category === 'programming'
                          ? 'Code'
                          : skill.category === 'core'
                          ? 'Core'
                          : 'Dev'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#263238] font-['Space_Grotesk'] mb-1.5 group-hover:text-[#C58B3A] dark:group-hover:text-[#E5A955] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {skill.level && (
                    <div className="mt-4 pt-3 border-t border-[#263238]/10 flex items-center justify-between text-[11px] text-[#68747C] dark:text-[#9EADB6] font-medium">
                      <span>Track</span>
                      <span className="text-[#263238] dark:text-[#FFFDF8] font-semibold">{skill.level}</span>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </div>
    </section>
  );
};
