import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { SoundToggle } from './SoundToggle';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section calculation
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#263238] ${
        isScrolled
          ? 'py-3.5 shadow-md border-b border-black/20'
          : 'py-4 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Logo - NANI SANKAR */}
        <a
          href="#home"
          id="brand-logo-link"
          className="group flex items-center gap-2 text-left focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFDF8] font-['Space_Grotesk']">
            {PERSONAL_INFO.brandName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          id="desktop-nav"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.18em] font-semibold"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                id={`nav-link-${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-[#C58B3A] font-bold border-b-2 border-[#C58B3A]'
                    : 'text-[#FFFDF8]/80 hover:text-[#FFFDF8] border-b-2 border-transparent'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Ambient Sound Toggle Button */}
          <SoundToggle />

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Resume Button */}
          <a
            id="nav-resume-button"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 border border-[#C58B3A] hover:bg-[#C58B3A] hover:text-[#263238] rounded-md text-[11px] tracking-wider uppercase font-bold text-[#C58B3A] transition-all cursor-pointer shadow-sm items-center justify-center"
          >
            RESUME.PDF
          </a>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#FFFDF8] hover:text-[#C58B3A] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden absolute inset-x-0 top-full p-6 bg-[#263238] border-b border-white/10 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.18em] font-semibold transition-all ${
                    isActive
                      ? 'text-[#C58B3A] font-bold border-l-2 border-[#C58B3A] pl-3'
                      : 'text-[#FFFDF8]/80 hover:text-[#FFFDF8]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C58B3A]" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between px-3 py-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFDF8]/70 font-semibold">
                Ambient Sound
              </span>
              <SoundToggle showLabel className="px-3 py-1.5" />
            </div>

            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFDF8]/70 font-semibold">
                Theme Mode
              </span>
              <ThemeToggle showLabel className="px-3 py-1.5" />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                id="mobile-nav-resume-btn"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 border border-[#C58B3A] text-[#C58B3A] hover:bg-[#C58B3A] hover:text-[#263238] rounded-md text-[11px] tracking-wider uppercase font-bold transition-all text-center block"
              >
                RESUME.PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
