import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  volume: number;
  setVolume: (val: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const startSoundscape = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain Node with gentle fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      const targetVolume = Math.max(0.001, volume * 0.055); // Soft low-volume ambiance
      masterGain.gain.exponentialRampToValueAtTime(targetVolume, ctx.currentTime + 1.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm Biquad lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filter.connect(masterGain);

      // Slow LFO for organic breathing modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.07, ctx.currentTime);
      lfoGain.gain.setValueAtTime(120, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      // Soft harmonic chord (C Major 9: C3, G3, B3, D4, E4)
      const notes = [130.81, 196.0, 246.94, 293.66, 329.63];
      const oscs: OscillatorNode[] = [];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        const detuneCents = (idx - 2) * 2.5;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime(detuneCents, ctx.currentTime);

        const oscGain = ctx.createGain();
        const noteGain = 0.16 / (1 + idx * 0.3);
        oscGain.gain.setValueAtTime(noteGain, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;

      // Very soft analog warmth noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 1.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(240, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.012, ctx.currentTime);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
      noiseNodeRef.current = noise;

      setIsPlaying(true);
    } catch (err) {
      console.warn('AudioContext soundscape initialization error:', err);
    }
  };

  const stopSoundscape = () => {
    if (!masterGainRef.current || !audioCtxRef.current) {
      setIsPlaying(false);
      return;
    }

    try {
      const ctx = audioCtxRef.current;
      const master = masterGainRef.current;
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        oscillatorsRef.current = [];

        if (lfoRef.current) {
          try {
            lfoRef.current.stop();
            lfoRef.current.disconnect();
          } catch {}
          lfoRef.current = null;
        }

        if (noiseNodeRef.current) {
          try {
            noiseNodeRef.current.stop();
            noiseNodeRef.current.disconnect();
          } catch {}
          noiseNodeRef.current = null;
        }

        setIsPlaying(false);
      }, 1250);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (masterGainRef.current && audioCtxRef.current && isPlaying) {
      const target = Math.max(0.0001, clamped * 0.055);
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, audioCtxRef.current.currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(target, audioCtxRef.current.currentTime + 0.1);
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {}
      });
      if (lfoRef.current) {
        try {
          lfoRef.current.stop();
        } catch {}
      }
      if (noiseNodeRef.current) {
        try {
          noiseNodeRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, toggleSound, volume, setVolume }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
