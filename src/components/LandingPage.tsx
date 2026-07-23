import React, { useState } from 'react';
import { Search, Sparkles, Terminal, ArrowRight, Flame } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface LandingPageProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      audioEngine.playCarriageReturn();
      onSearch(inputValue.trim());
    }
  };

  const handlePresetClick = (preset: string) => {
    setInputValue(preset);
    audioEngine.playTypewriterKey();
    onSearch(preset);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' && e.key !== 'Tab' && e.key !== 'Shift') {
      audioEngine.playTypewriterKey();
    }
  };

  const famousPresets = [
    { username: 'octocat', label: 'The Mascot' },
    { username: 'torvalds', label: 'Linux Creator' },
    { username: 'gaearon', label: 'React Artisan' },
    { username: 'yyx99', label: 'Vue Pioneer' },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      
      {/* ═══════ BACKGROUND NEWSPAPER TEXTURE ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/newspaper_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.62) contrast(1.2) saturate(0.8)',
        }}
      />
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-amber-950/15 pointer-events-none z-[1] mix-blend-multiply" />

      {/* Warm Ambient Candle Light Glow */}
      <div
        className="fixed pointer-events-none z-[2] candle-glow-bleed rounded-full"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255, 170, 50, 0.16) 0%, rgba(255, 140, 30, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* ═══════ MAIN ANCIENT TELEGRAPH BUREAU CARD ═══════ */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Ancient Newspaper Banner Header */}
        <div className="text-center mb-6 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 font-typewriter text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-200/80 mb-2">
            <span>★ OFFICIAL TELEGRAPH & TYPESETTING BUREAU ★</span>
          </div>

          <h1 className="font-masthead ink-bleed text-4xl sm:text-6xl md:text-7xl uppercase text-amber-100 tracking-wider mb-2 drop-shadow-2xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(180,120,40,0.3)' }}>
            The Git Times
          </h1>

          <p className="font-headline italic text-amber-200/90 text-sm sm:text-base tracking-widest">
            "All the Commits Fit to Print"
          </p>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent mx-auto my-3" />
        </div>

        {/* ═══════ TYPEWRITER DESK FRAME ═══════ */}
        <div className="paper-texture deckled-paper coffee-stain p-6 sm:p-8 rounded-lg shadow-2xl relative border-2 border-amber-900/60 overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,0,0,0.06)',
            backgroundColor: '#d8c49d',
          }}
        >
          {/* Aged Overlays */}
          <div className="paper-aged-overlay" />
          <div className="paper-creases" />

          <div className="relative z-10">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-5">
              <div className="flex items-center gap-2 font-typewriter text-xs font-extrabold uppercase tracking-wider text-ink">
                <Terminal className="w-4 h-4 text-amber-950" />
                <span>Underwood Dispatch Station No. 9</span>
              </div>
              <span className="font-typewriter text-[9px] uppercase tracking-widest text-ink-muted font-bold hidden sm:inline">
                EST. MMVIII
              </span>
            </div>

            <p className="font-body text-sm sm:text-base text-ink leading-relaxed text-justify mb-5 font-medium">
              Enter any GitHub username below to order an authentic 1920s broadside edition. Our telegraph desk will live-fetch stats, repositories, and contribution records to compose a custom front page.
            </p>

            {/* Search Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type GitHub username (e.g. torvalds, octocat)..."
                  disabled={isLoading}
                  autoFocus
                  className="w-full bg-amber-50/70 text-ink placeholder-ink-muted/60 border-2 border-ink rounded-md px-4 py-3 font-typewriter text-sm sm:text-base tracking-wider focus:outline-none focus:bg-amber-100 focus:border-amber-950 transition-all shadow-inner disabled:opacity-50"
                  style={{
                    backgroundColor: 'rgba(245, 235, 215, 0.8)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.15)',
                  }}
                />
                <Search className="absolute right-4 top-3.5 w-5 h-5 text-ink-muted pointer-events-none" />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-full py-3.5 px-6 font-typewriter text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] rounded-md transition-all transform active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl"
                style={{
                  background: 'linear-gradient(to bottom, #3d2510, #2a1a0c)',
                  color: '#d4a84a',
                  border: '1.5px solid #5c3a18',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,200,100,0.15)',
                }}
              >
                {isLoading ? (
                  <>
                    <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>Typesetting Front Page...</span>
                  </>
                ) : (
                  <>
                    <span>PRINT DISPATCH EDITION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Famous Editions Presets */}
            <div className="mt-6 pt-4 border-t border-ink/30 font-typewriter">
              <div className="flex items-center gap-1 text-xs text-ink-muted font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-900" />
                <span>Popular Developer Editions:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {famousPresets.map((preset) => (
                  <button
                    key={preset.username}
                    onClick={() => handlePresetClick(preset.username)}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-[11px] font-bold text-ink hover:text-amber-950 rounded transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-1"
                    style={{
                      backgroundColor: 'rgba(220, 200, 160, 0.4)',
                      border: '0.5px solid rgba(26,22,21,0.3)',
                    }}
                  >
                    <span>@{preset.username}</span>
                    <span className="text-[9px] text-ink-sepia">({preset.label})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Tagline */}
        <div className="text-center mt-4 font-typewriter text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-200/60">
          <span>The Git Times Telegraph Bureau · Established MMVIII</span>
        </div>

      </div>
    </div>
  );
};
