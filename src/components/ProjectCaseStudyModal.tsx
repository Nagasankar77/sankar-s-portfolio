import React, { useEffect } from 'react';
import { X, Github, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      id="project-case-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="project-case-study-dialog"
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#FFFDF8] border border-[#263238]/20 rounded-2xl shadow-2xl overflow-hidden my-auto text-[#263238]"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#263238]/10 dark:border-white/10 bg-[#FFFDF8] dark:bg-[#192227] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#C58B3A]/10 border border-[#C58B3A]/30 text-[#C58B3A] dark:text-[#E5A955] font-bold">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-semibold text-[#4F7CAC] dark:text-[#7CA2D6]">
              {project.subtitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#263238]/5 dark:hover:bg-white/10 text-[#263238] dark:text-[#FFFDF8] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7 text-left bg-[#FFFDF8] dark:bg-[#192227]">
          {/* Title & Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#263238] dark:text-[#FFFDF8]">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-[#F5F0E6] dark:bg-[#141C20] border border-[#263238]/10 dark:border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-2">
                Problem Context
              </h4>
              <p className="text-xs sm:text-sm text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F5F0E6] dark:bg-[#141C20] border border-[#263238]/10 dark:border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C58B3A] dark:text-[#E5A955] font-bold mb-2">
                Solution Approach
              </h4>
              <p className="text-xs sm:text-sm text-[#4F5961] dark:text-[#D8D3C8] leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-3">
              Core Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {caseStudy.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4F5961] dark:text-[#D8D3C8]">
                  <CheckCircle2 className="w-4 h-4 text-[#C58B3A] dark:text-[#E5A955] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#263238] dark:text-[#FFFDF8] font-bold mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-[#F5F0E6] dark:bg-[#141C20] border border-[#263238]/15 dark:border-white/15 text-xs font-medium text-[#263238] dark:text-[#FFFDF8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#263238]/10 dark:border-white/10 bg-[#F5F0E6] dark:bg-[#141C20]">
          <span className="text-xs text-[#68747C] dark:text-[#9EADB6] font-mono">
            Naga Sankar Portfolio
          </span>
          <div className="flex items-center gap-3">
            <a
              href={caseStudy.githubUrl || 'https://github.com/Nagasankar77'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#263238] dark:bg-[#E5A955] hover:bg-[#C58B3A] dark:hover:bg-[#F0BC6D] text-[#FFFDF8] dark:text-[#12181B] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
