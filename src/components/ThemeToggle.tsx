import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to High-Contrast Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to High-Contrast Dark Mode'}
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#C58B3A]/60 ${
        isDark
          ? 'bg-[#1F2A30] text-[#E5A955] hover:bg-[#2A373F] border border-[#E5A955]/30 shadow-sm shadow-[#E5A955]/10'
          : 'bg-[#FFFDF8]/10 text-[#FFFDF8] hover:bg-[#FFFDF8]/20 border border-white/15'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#E5A955] transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-[#FFFDF8] transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-bold tracking-wider uppercase">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
