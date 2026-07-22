import React, { useState } from 'react';
import { Search, Sparkles, Terminal } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface TypewriterHeaderProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  activeProfileName: string;
}

export const TypewriterHeader: React.FC<TypewriterHeaderProps> = ({
  onSearch,
  isLoading,
  activeProfileName,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      audioEngine.playTypewriterKey();
    } else {
      audioEngine.playCarriageReturn();
      if (inputValue.trim()) {
        onSearch(inputValue.trim());
      }
    }
  };

  const handleQuickSelect = (username: string) => {
    audioEngine.playCarriageReturn();
    setInputValue(username);
    onSearch(username);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      audioEngine.playCarriageReturn();
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mb-2 z-30 relative px-4">
      {/* Typewriter Body Frame */}
      <div className="bg-stone-900/95 border border-amber-900/60 rounded-lg p-2.5 md:p-3 shadow-2xl shadow-black/80 backdrop-blur-md relative overflow-hidden">
        {/* Top Metallic Bar & Ribbon Indicator */}
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-1.5 mb-2 text-amber-200/80 font-typewriter tracking-widest uppercase" style={{ fontSize: '9px' }}>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-500" />
            <span>Underwood Model 1928 — GitHub Dispatch Feed</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-stone-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
            <span>Ink Ribbon: Prime</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type GitHub username (e.g. torvalds, gaearon)..."
              disabled={isLoading}
              className="w-full bg-stone-950/90 text-amber-100 placeholder-amber-900/60 border border-amber-800/60 focus:border-amber-500 rounded-md px-3 py-1.5 font-typewriter text-xs tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all shadow-inner disabled:opacity-50"
            />
            <Search className="absolute right-3 top-2 w-3.5 h-3.5 text-amber-700 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
              className="w-auto px-4 py-1.5 bg-gradient-to-b from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-amber-100 font-typewriter text-[10px] font-bold uppercase tracking-widest rounded-md border border-amber-600/60 shadow-lg shadow-amber-950/60 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>Typing Story...</span>
              </>
            ) : (
              <>
                <span>Publish Dispatch</span>
              </>
            )}
          </button>
        </form>

        {/* Preset Famous Dev Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-1.5 border-t border-stone-800/80 font-typewriter" style={{ fontSize: '9px' }}>
          <span className="text-stone-400 font-serif italic mr-1">Famous Editions:</span>
          {['octocat', 'torvalds', 'gaearon'].map((preset) => (
            <button
              key={preset}
              onClick={() => handleQuickSelect(preset)}
              className={`px-3 py-1 rounded border transition-all ${
                activeProfileName === preset
                  ? 'bg-amber-900/80 text-amber-200 border-amber-600 font-bold'
                  : 'bg-stone-950/60 text-stone-300 border-stone-800 hover:bg-amber-950/50 hover:text-amber-300 hover:border-amber-800'
              }`}
            >
              @{preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
