import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { ScrollToTopButton } from './components/ScrollToTopButton';

function PortfolioApp() {
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 160]);
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -140]);
  const orb3Y = useTransform(scrollY, [0, 3000], [0, 120]);

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#263238] antialiased relative font-sans w-full max-w-full overflow-x-hidden box-border selection:bg-[#C58B3A]/30 selection:text-[#263238] transition-colors duration-200">
      {/* Horizontal Reading Progress Bar at the very top of the screen */}
      <ReadingProgressBar />

      {/* Floating Scroll to Top Quick Action */}
      <ScrollToTopButton />

      {/* Parallax Organic Background Glow Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: orb1Y }}
          className="absolute -top-24 right-1/4 w-[550px] h-[550px] rounded-full bg-[#C58B3A]/[0.035] dark:bg-[#E5A955]/[0.06] blur-[100px] will-change-transform"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-[#4F7CAC]/[0.03] dark:bg-[#7CA2D6]/[0.05] blur-[110px] will-change-transform"
        />
        <motion.div
          style={{ y: orb3Y }}
          className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-[#C58B3A]/[0.03] dark:bg-[#E5A955]/[0.05] blur-[100px] will-change-transform"
        />
      </div>

      {/* Deep Slate Navbar */}
      <Navbar />

      {/* Main Content Sections with Fluid Scroll-Triggered Choreography */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden box-border">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <ResumeSection />
        <Contact />
      </main>

      {/* Deep Slate Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <PortfolioApp />
      </SoundProvider>
    </ThemeProvider>
  );
}
