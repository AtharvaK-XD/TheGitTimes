import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Flame, Compass, AlertCircle } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface LandingPageProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  errorMessage?: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSearch, isLoading, errorMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tiltX = mousePos.y * -4;
  const tiltY = mousePos.x * 6;

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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none perspective-1000">
      
      {/* ═══════ BACKGROUND NEWSPAPER TEXTURE ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/newspaper_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.65) contrast(1.2) saturate(0.85)',
        }}
      />
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-[1]" />
      <div className="fixed inset-0 bg-amber-950/10 pointer-events-none z-[1] mix-blend-multiply" />

      {/* Warm Ambient Candle Light Glow */}
      <div
        className="fixed pointer-events-none z-[2] candle-glow-bleed rounded-full"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(255, 170, 50, 0.18) 0%, rgba(255, 140, 30, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* ═══════ MAIN ANCIENT TELEGRAPH BUREAU CARD (3D TILT) ═══════ */}
      <div
        className="relative z-10 w-full max-w-2xl mx-auto animate-press-slide-in px-2 sm:px-4"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
        
        {/* Ancient Newspaper Banner Header */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="flex items-center justify-center gap-2 font-typewriter text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-200/80 mb-1">
            <span>✦ POSTAL TELEGRAPH & TYPESETTING BUREAU ✦</span>
          </div>

          <h1 className="font-masthead ink-bleed text-3xl sm:text-5xl md:text-6xl uppercase text-amber-100 tracking-wider mb-0.5 drop-shadow-2xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 30px rgba(180,120,40,0.25)' }}>
            The Git Times
          </h1>

          <p className="font-headline italic text-amber-200/90 text-xs sm:text-sm tracking-widest">
            "All the Commits Fit to Print"
          </p>

          <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent mx-auto my-2" />
        </div>

        {/* ═══════ VINTAGE TELEGRAM BLANK / DESK FRAME ═══════ */}
        <div className="paper-texture deckled-paper coffee-stain p-6 sm:p-8 rounded-sm shadow-2xl relative border-2 border-[#1a1615] overflow-hidden"
          style={{
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,0,0,0.08)',
            backgroundColor: '#d8c49d',
          }}
        >
          {/* Aged Overlays & Fold Creases */}
          <div className="paper-aged-overlay" />
          <div className="paper-creases" />

          {/* Corner Rivet Details */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full border border-amber-900/60 bg-amber-800/40 shadow-inner z-20 pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full border border-amber-900/60 bg-amber-800/40 shadow-inner z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full border border-amber-900/60 bg-amber-800/40 shadow-inner z-20 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full border border-amber-900/60 bg-amber-800/40 shadow-inner z-20 pointer-events-none" />

          <div className="relative z-10">
            
            {/* Vintage Telegram Header Strip */}
            <div className="border-b-2 border-[#1a1615] pb-2.5 mb-4">
              <div className="flex items-center justify-between font-typewriter text-[10.5px] sm:text-xs font-extrabold uppercase tracking-[0.15em] text-[#1a1615]">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#3b2b18]" />
                  <span>TELEGRAPH DISPATCH BLANK · FORM NO. 1928-C</span>
                </div>
                <span>EST. MMVIII</span>
              </div>
              <div className="flex justify-between font-typewriter text-[9px] sm:text-[10px] uppercase tracking-wider text-ink-muted mt-1.5 pt-1.5"
                style={{ borderTop: '0.5px solid rgba(26,22,21,0.2)' }}>
                <span>DESTINATION: FRONT PAGE</span>
                <span>SERVICE: LIVE GITHUB FEED</span>
                <span>STATUS: {errorMessage ? 'TELEGRAM ERROR' : 'READY'}</span>
              </div>
            </div>

            {/* Telegram Error Alert Box */}
            {errorMessage && (
              <div
                className="mb-4 p-3 bg-red-950/90 text-red-100 font-typewriter text-xs uppercase tracking-wider rounded-none border-2 border-red-800 shadow-xl flex items-center gap-2 animate-fadeIn"
                style={{
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                }}
              >
                <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0" />
                <span className="leading-normal font-bold">⚠️ TELEGRAM NOTICE: {errorMessage}</span>
              </div>
            )}

            <p className="font-body text-xs sm:text-sm text-[#1a1615] leading-relaxed text-justify mb-4 font-medium">
              Enter any GitHub username below to order an authentic 1920s broadside edition. Our telegraph desk will live-fetch stats, repositories, and contribution records to compose a custom front page.
            </p>

            {/* Typesetting Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="relative">
                <div className="font-typewriter text-[10px] sm:text-[11px] uppercase tracking-widest text-[#1a1615] font-extrabold mb-1.5 flex justify-between">
                  <span>[ TYPESET GITHUB USERNAME ]</span>
                  <span className="text-ink-muted">PRESS ENTER TO PRINT</span>
                </div>
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. torvalds, octocat, gaearon..."
                  disabled={isLoading}
                  autoFocus
                  className="w-full text-ink placeholder-ink-muted/50 border-2 border-[#1a1615] rounded-none px-4 py-3 font-typewriter text-base sm:text-lg tracking-wider focus:outline-none focus:bg-[#eedaa9] transition-all disabled:opacity-50"
                  style={{
                    backgroundColor: 'rgba(220, 200, 160, 0.45)',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)',
                  }}
                />
              </div>

              {/* Submit CTA Button — Heavy Brass Press Plate with Metallic Shimmer */}
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-full py-3.5 px-6 font-typewriter text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] rounded-none transition-all transform active:scale-[0.97] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5 brass-shimmer-btn"
                style={{
                  background: 'linear-gradient(to bottom, #3b2410, #1f1207)',
                  color: '#e5b95c',
                  border: '2px solid #8b6914',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,200,100,0.25)',
                  textShadow: '0 1px 2px #000',
                }}
              >
                {isLoading ? (
                  <>
                    <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>TYPESETTING FRONT PAGE...</span>
                  </>
                ) : (
                  <>
                    <span>PRINT DISPATCH EDITION</span>
                    <ArrowRight className="w-4.5 h-4.5 text-amber-400" />
                  </>
                )}
              </button>
            </form>

            {/* Popular Developer Editions — Vintage Telegram Stamps */}
            <div className="mt-4 pt-3 font-typewriter" style={{ borderTop: '0.5px solid rgba(26,22,21,0.25)' }}>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#1a1615] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-950 animate-pulse" />
                <span>ARCHIVED POPULAR EDITIONS:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {famousPresets.map((preset, idx) => (
                  <button
                    key={preset.username}
                    onClick={() => handlePresetClick(preset.username)}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-xs sm:text-sm font-bold text-[#1a1615] hover:text-amber-950 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-1.5 hover:shadow-md"
                    style={{
                      backgroundColor: 'rgba(210, 190, 150, 0.55)',
                      border: '1px solid #1a1615',
                      transform: `rotate(${idx % 2 === 0 ? '-0.8deg' : '0.8deg'})`,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span>@{preset.username}</span>
                    <span className="text-[9.5px] text-ink-sepia">({preset.label})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Tagline */}
        <div className="text-center mt-3.5 font-typewriter text-[10px] uppercase tracking-widest text-amber-200/60">
          <span>The Git Times Telegraph Bureau · Established MMVIII</span>
        </div>

      </div>
    </div>
  );
};
