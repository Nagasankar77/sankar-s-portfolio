import React, { useState } from 'react';
import { ArrowUpRight, Github, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { ScrollSectionHeader, StaggerContainer, StaggerItem } from './FadeInSection';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-28 bg-[#FFFDF8] border-b border-[#263238]/10 overflow-hidden text-[#263238]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header with Scroll Reveal */}
        <ScrollSectionHeader
          badge="Selected Work"
          title="PROJECTS"
          subtitle="Practical applications built while learning machine learning, web engineering and interactive design."
          id="projects-heading"
          className="mb-16"
        />

        {/* Responsive Project Grid with Staggered Scroll Animation */}
        <StaggerContainer
          delay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                className="flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-[#F5F0E6] border border-[#263238]/15 hover:border-[#C58B3A]/60 dark:hover:border-[#E5A955]/60 transition-colors duration-200 shadow-sm hover:shadow-lg h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#C58B3A] dark:text-[#E5A955] tracking-widest">
                      PROJECT {project.number}
                    </span>
                    <span className="text-[11px] font-semibold text-[#4F7CAC] dark:text-[#7CA2D6] uppercase tracking-wider">
                      {project.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#263238] font-['Space_Grotesk'] mb-3 group-hover:text-[#C58B3A] dark:group-hover:text-[#E5A955] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#68747C] dark:text-[#9EADB6] font-bold mb-2">
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#FFFDF8] dark:bg-[#1E282E] border border-[#263238]/12 dark:border-white/15 text-[#263238] dark:text-[#FFFDF8] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons: View Project & GitHub */}
                <div className="pt-6 border-t border-[#263238]/12 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#263238] dark:bg-[#E5A955] hover:bg-[#C58B3A] dark:hover:bg-[#F0BC6D] text-[#FFFDF8] dark:text-[#12181B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Project</span>
                  </button>

                  <a
                    href={project.caseStudy.githubUrl || 'https://github.com/Nagasankar77'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md bg-[#FFFDF8] dark:bg-[#1E282E] hover:bg-[#FFFDF8] border border-[#263238]/20 dark:border-white/20 hover:border-[#263238] dark:hover:border-[#E5A955] text-[#263238] dark:text-[#FFFDF8] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-[#263238]/60 dark:text-[#FFFDF8]/70" />
                  </a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
