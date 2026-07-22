import React, { useState } from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

export const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(audioEngine.getMutedState());
  const [ambientActive, setAmbientActive] = useState(false);

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!ambientActive && !muted) {
      audioEngine.startAmbient();
      setAmbientActive(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-xl transition-all duration-300 font-typewriter text-xs tracking-wider uppercase ${
          isMuted
            ? 'bg-stone-900/90 text-stone-400 border-stone-700 hover:bg-stone-800'
            : 'bg-amber-950/90 text-amber-200 border-amber-700/80 shadow-amber-900/40 hover:bg-amber-900'
        }`}
        title="Toggle Vintage Audio (Typewriter & Fireplace Crackle)"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-stone-500" />
            <span>Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Sound ON</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 candle-flame ml-0.5" />
          </>
        )}
      </button>
    </div>
  );
};
