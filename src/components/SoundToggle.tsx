import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '../context/SoundContext';

interface SoundToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { isPlaying, toggleSound } = useSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      id="ambient-sound-toggle-btn"
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
      title={isPlaying ? 'Mute ambient soundscape' : 'Play soft ambient soundscape'}
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#C58B3A]/60 ${
        isPlaying
          ? 'bg-[#C58B3A]/15 text-[#C58B3A] dark:text-[#E5A955] border border-[#C58B3A]/40 dark:border-[#E5A955]/40 shadow-sm shadow-[#C58B3A]/10'
          : 'bg-[#FFFDF8]/10 text-[#FFFDF8]/80 hover:text-[#FFFDF8] hover:bg-[#FFFDF8]/15 border border-white/15'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isPlaying ? (
          <div className="flex items-center gap-[2px] h-3.5 px-[1px]">
            {/* Animated Equalizer Waves */}
            <motion.span
              animate={{ height: ['4px', '12px', '6px', '10px', '4px'] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="w-[2px] bg-[#C58B3A] dark:bg-[#E5A955] rounded-full inline-block"
            />
            <motion.span
              animate={{ height: ['8px', '4px', '13px', '6px', '8px'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              className="w-[2px] bg-[#C58B3A] dark:bg-[#E5A955] rounded-full inline-block"
            />
            <motion.span
              animate={{ height: ['10px', '6px', '4px', '12px', '10px'] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.4 }}
              className="w-[2px] bg-[#C58B3A] dark:bg-[#E5A955] rounded-full inline-block"
            />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 transition-transform duration-200" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-bold tracking-wider uppercase">
          {isPlaying ? 'Sound On' : 'Sound Off'}
        </span>
      )}
    </button>
  );
};
