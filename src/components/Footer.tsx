import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#263238] text-[#FFFDF8] pt-16 pb-12 overflow-hidden border-t border-black/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-2">
            <span className="text-2xl font-black font-['Space_Grotesk'] text-[#FFFDF8] tracking-wider block">
              {PERSONAL_INFO.brandName}
            </span>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C58B3A] font-bold">
              B.Tech AI & ML Student
            </div>
            <p className="text-xs text-[#FFFDF8]/70 max-w-md pt-1">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFFDF8]/80 hover:text-[#C58B3A] hover:border-[#C58B3A]/50 hover:bg-white/10 transition-colors"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFFDF8]/80 hover:text-[#C58B3A] hover:border-[#C58B3A]/50 hover:bg-white/10 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FFFDF8]/80 hover:text-[#C58B3A] hover:border-[#C58B3A]/50 hover:bg-white/10 transition-colors"
                title="Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-[#FFFDF8]/80 hover:text-[#C58B3A] hover:border-[#C58B3A]/50 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C58B3A]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FFFDF8]/60">
          <div>© 2026 NAGA SANKAR. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
