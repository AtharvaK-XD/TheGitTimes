import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { GitTimesProfile } from '../data/mockProfiles';
import { TypewriterHeader } from './TypewriterHeader';
import { FrontPage } from './FrontPage';
import { PageTwo } from './PageTwo';
import { ClippingModal } from './ClippingModal';
import { audioEngine } from '../services/audioEngine';
import { BookOpen, RotateCcw, ArrowLeft, Search, X, ZoomIn } from 'lucide-react';

interface DeskSceneProps {
  profile: GitTimesProfile;
  onSearchUsername: (username: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

/* Dust particle generator — creates varied sizes/positions */
function generateDustParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const size = ['dust-particle-sm', 'dust-particle-md', 'dust-particle-lg'][i % 3];
    particles.push({
      id: i,
      className: `dust-particle ${size}`,
      style: {
        left: `${8 + ((i * 13 + 7) % 80)}%`,
        top: `${15 + ((i * 17 + 3) % 65)}%`,
        animationDelay: `${(i * 1.1) % 8}s`,
        animationDuration: `${8 + (i % 7)}s`,
      },
    });
  }
  return particles;
}

/* Foxing spot generator — those brown age spots on old paper */
function generateFoxingSpots() {
  const spots = [
    { top: '12%', left: '85%', width: 18, height: 16 },
    { top: '35%', left: '8%', width: 14, height: 14 },
    { top: '58%', right: '15%', width: 24, height: 22 },
    { top: '78%', left: '45%', width: 12, height: 12 },
    { top: '25%', left: '55%', width: 10, height: 9 },
    { top: '90%', left: '25%', width: 16, height: 14 },
    { top: '5%', left: '40%', width: 8, height: 7 },
    { top: '68%', left: '72%', width: 14, height: 12 },
    { top: '18%', left: '15%', width: 11, height: 10 },
    { top: '82%', right: '8%', width: 20, height: 18 },
    { top: '48%', left: '92%', width: 15, height: 13 },
    { top: '42%', left: '3%', width: 12, height: 11 },
  ];
  return spots;
}

export const DeskScene: React.FC<DeskSceneProps> = ({
  profile,
  onSearchUsername,
  onBack,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<'front' | 'two'>('front');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clientPos, setClientPos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [isFlipping, setIsFlipping] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [paperRelPos, setPaperRelPos] = useState({ x: 0, y: 0, width: 1140, height: 800 });
  
  const paperRef = useRef<HTMLDivElement>(null);

  const [clippingModal, setClippingModal] = useState<{
    isOpen: boolean;
    title: string;
    category: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    category: '',
    content: null,
  });

  const dustParticles = useMemo(() => generateDustParticles(18), []);
  const foxingSpots = useMemo(() => generateFoxingSpots(), []);

  // Smooth mouse tracking with lerp for silky parallax & paper rel pos calculation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
      setClientPos({ x: e.clientX, y: e.clientY });

      if (paperRef.current) {
        const rect = paperRef.current.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        setPaperRelPos({ x: relX, y: relY, width: rect.width, height: rect.height });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lerp interpolation for buttery smooth parallax
  useEffect(() => {
    let rafId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    const animate = () => {
      setSmoothMouse(prev => ({
        x: lerp(prev.x, mousePos.x, 0.08),
        y: lerp(prev.y, mousePos.y, 0.08),
      }));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [mousePos]);

  const handleFlipPage = useCallback(() => {
    if (isFlipping) return;
    audioEngine.playPaperRustle();
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(prev => (prev === 'front' ? 'two' : 'front'));
      setIsFlipping(false);
    }, 600);
  }, [isFlipping]);

  const handleInspectClipping = useCallback((title: string, category: string, content: React.ReactNode) => {
    setClippingModal({ isOpen: true, title, category, content });
  }, []);

  const handleSearchSubmit = (username: string) => {
    setIsSearchOpen(false);
    onSearchUsername(username);
  };

  const toggleLoupe = () => {
    audioEngine.playPaperRustle();
    setIsLoupeActive(prev => !prev);
  };

  // Parallax depth layers
  const tiltX = smoothMouse.y * -3;
  const tiltY = smoothMouse.x * 5;
  const layer2X = smoothMouse.x * -10;
  const layer2Y = smoothMouse.y * -10;
  const shadowX = -smoothMouse.x * 30;
  const shadowY = 30 + smoothMouse.y * 25;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-950 flex flex-col items-center py-2 px-2 sm:px-4 justify-center">

      {/* ═══════ TOP-LEFT BACK, SEARCH & LOUPE CONTROLS ═══════ */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            audioEngine.playPaperRustle();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-amber-700/80 bg-amber-950/90 hover:bg-amber-900 text-amber-200 shadow-xl shadow-amber-950/40 transition-all font-typewriter text-xs uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95"
          title="Back to Previous Edition"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-amber-900/60 bg-stone-900/90 hover:bg-stone-800 text-amber-200/80 hover:text-amber-100 shadow-lg transition-all font-typewriter text-xs uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95"
          title="Typeset New GitHub Username"
        >
          <Search className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Search</span>
        </button>

        <button
          onClick={toggleLoupe}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full border shadow-lg transition-all font-typewriter text-xs uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95 ${
            isLoupeActive
              ? 'bg-amber-500 text-amber-950 border-amber-300 font-extrabold shadow-amber-500/50'
              : 'bg-stone-900/90 text-amber-200/80 border-amber-900/60 hover:bg-stone-800'
          }`}
          title="Toggle Antique Brass Magnifying Glass (2.2x Optical Zoom)"
        >
          <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">{isLoupeActive ? 'Lens ON (2.2x)' : 'Loupe'}</span>
        </button>
      </div>

      {/* ═══════ LAYER 0: NEWSPAPER BACKGROUND ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/newspaper_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.68) contrast(1.15) saturate(0.85)',
        }}
      />
      {/* Vignette overlay */}
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-[1]" opacity-60 />
      <div className="fixed inset-0 bg-amber-950/10 pointer-events-none z-[1] mix-blend-multiply" />

      {/* ═══════ LAYER 1: CANDLE GLOW LIGHTS ═══════ */}
      <div
        className="fixed pointer-events-none z-[2] candle-glow-bleed rounded-full"
        style={{
          top: '-80px',
          right: '-60px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 170, 50, 0.18) 0%, rgba(255, 140, 30, 0.08) 40%, transparent 70%)',
          transform: `translate(${layer2X * 0.3}px, ${layer2Y * 0.3}px)`,
        }}
      />
      <div
        className="fixed pointer-events-none z-[2] candle-glow-bleed rounded-full"
        style={{
          bottom: '-100px',
          left: '-80px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 160, 40, 0.1) 0%, transparent 60%)',
          transform: `translate(${-layer2X * 0.2}px, ${-layer2Y * 0.2}px)`,
          animationDelay: '1.5s',
        }}
      />
      <div
        className="fixed pointer-events-none z-[15] warm-light-on-paper rounded-full"
        style={{
          top: '10%',
          right: '20%',
          width: '350px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(255, 180, 60, 0.06) 0%, transparent 70%)',
          transform: `translate(${layer2X * 0.4}px, ${layer2Y * 0.4}px)`,
        }}
      />

      {/* ═══════ LAYER 2: ATMOSPHERIC DUST MOTES ═══════ */}
      <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
        {dustParticles.map(p => (
          <div key={p.id} className={p.className} style={p.style} />
        ))}
      </div>

      {/* ═══════ 3D NEWSPAPER HERO SHEET ═══════ */}
      <main className="relative z-[20] w-full max-w-[1140px] xl:max-w-[1220px] mx-auto h-[82vh] max-h-[820px] flex-shrink-0 perspective-1000 my-auto px-3 sm:px-6">
        {/* 3D Parallax + Idle Breathing Wrapper */}
        <div
          className="paper-idle-sway h-full"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s linear',
          }}
        >
          {/* Paper Sheet */}
          <div
            ref={paperRef}
            className={`relative w-full h-full paper-texture deckled-paper coffee-stain coffee-stain-2 transition-all duration-700 transform-gpu flex flex-col ${
              isFlipping ? 'scale-[0.97] opacity-90' : ''
            }`}
            style={{
              boxShadow: `${shadowX}px ${shadowY}px 50px rgba(0,0,0,0.55), ${shadowX * 0.3}px ${shadowY * 0.5}px 15px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.03)`,
              padding: 'clamp(14px, 2.5vw, 32px)',
            }}
          >
            {/* Aged discoloration overlay */}
            <div className="paper-aged-overlay" />

            {/* Paper fold creases & cross folds */}
            <div className="paper-creases" />

            {/* Foxing spots */}
            <div className="foxing-spots">
              {foxingSpots.map((spot, i) => (
                <div key={i} className="foxing-spot"
                  style={{ ...spot, width: `${spot.width}px`, height: `${spot.height}px` }} />
              ))}
            </div>

            {/* Corner curl */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-[5]"
              style={{
                background: 'linear-gradient(225deg, rgba(180, 160, 120, 0.3) 0%, rgba(220, 200, 160, 0.15) 30%, transparent 50%)',
                clipPath: 'polygon(100% 0, 30% 0, 100% 70%)',
                boxShadow: 'inset -2px 2px 4px rgba(0,0,0,0.08)',
              }}
            />

            {/* Page Turn Button */}
            <button
              onClick={handleFlipPage}
              disabled={isFlipping}
              className="absolute top-3 right-3 z-[30] px-3 py-1.5 font-typewriter text-[10px] uppercase tracking-[0.15em] flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              style={{
                background: 'linear-gradient(to bottom, #3d2510, #2a1a0c)',
                color: '#d4a84a',
                border: '1px solid #5c3a18',
                borderRadius: '3px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,200,100,0.1)',
              }}
              title="Flip to next newspaper page"
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: '#d4a84a' }} />
              <span>{currentPage === 'front' ? 'Turn to Page 2 →' : '← Return to Front Page'}</span>
            </button>

            {/* ── CONTENT AREA ── */}
            <div className="relative z-[10] flex-1 min-h-0 flex flex-col">
              {/* LOADING STATE — INK BLOT ANIMATION */}
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="ink-blot absolute inset-0" />
                    <div className="ink-blot absolute inset-2" style={{ animationDelay: '0.5s' }} />
                    <div className="ink-blot absolute inset-4" style={{ animationDelay: '1s' }} />
                  </div>
                  <h3 className="font-typewriter text-xl text-ink-muted font-bold uppercase tracking-[0.2em]">
                    Typesetting Edition
                  </h3>
                  <p className="font-body italic text-base text-ink-sepia">
                    Composing dispatch for <strong>@{profile.username}</strong> ...
                  </p>
                  <div className="flex justify-center items-center gap-1 font-typewriter text-sm text-ink-muted">
                    <span>■</span>
                    <span className="typewriter-cursor">|</span>
                  </div>
                </div>
              ) : currentPage === 'front' ? (
                <FrontPage profile={profile} onInspectClipping={handleInspectClipping} />
              ) : (
                <PageTwo profile={profile} onInspectClipping={handleInspectClipping} />
              )}
            </div>

            {/* Bottom Page Indicator */}
            <div className="relative z-[10] mt-2 pt-1.5 border-t border-ink/30 flex justify-between items-center font-typewriter uppercase tracking-[0.12em] text-ink-muted flex-shrink-0" style={{ fontSize: '8px' }}>
              <span>The Git Times</span>
              <button
                onClick={handleFlipPage}
                className="hover:text-ink font-bold flex items-center gap-1 transition-colors"
              >
                <span>{currentPage === 'front' ? 'Page 1 of 2' : 'Page 2 of 2'}</span>
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
              <span>{profile.dateStr}</span>
            </div>
          </div>
        </div>
      </main>

      {/* ═══════ BRASS MAGNIFYING GLASS LOUPE (REAL 2.2X OPTICAL MAGNIFICATION) ═══════ */}
      {isLoupeActive && (
        <div
          className="fixed pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] rounded-full overflow-hidden"
          style={{
            left: `${clientPos.x}px`,
            top: `${clientPos.y}px`,
            border: '6px solid #b8860b',
            boxShadow: '0 16px 45px rgba(0,0,0,0.75), inset 0 0 20px rgba(0,0,0,0.5), 0 0 0 2px rgba(80,55,15,0.9)',
          }}
        >
          {/* Brass handle extending diagonally */}
          <div className="absolute -bottom-14 -right-14 w-4 h-32 bg-gradient-to-t from-amber-950 via-amber-800 to-amber-600 rounded-full border-2 border-amber-500 shadow-2xl rotate-45 z-30 pointer-events-none" />

          {/* Convex Lens Reflection Glare */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none z-20"
            style={{
              background: 'radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)',
              boxShadow: 'inset 0 0 15px rgba(212,175,55,0.3)',
            }}
          />

          {/* 2.2X OPTICAL MAGNIFIED CLONED VIEWPORT */}
          <div
            className="absolute paper-texture pointer-events-none select-none overflow-hidden"
            style={{
              width: `${paperRelPos.width}px`,
              height: `${paperRelPos.height}px`,
              transform: `translate(${105 - paperRelPos.x * 2.2}px, ${105 - paperRelPos.y * 2.2}px) scale(2.2)`,
              transformOrigin: '0 0',
            }}
          >
            <div className="p-3 md:p-7">
              {currentPage === 'front' ? (
                <FrontPage profile={profile} onInspectClipping={() => {}} />
              ) : (
                <PageTwo profile={profile} onInspectClipping={() => {}} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ SEARCH MODAL OVERLAY ═══════ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute -top-10 right-0 text-stone-400 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <TypewriterHeader
              onSearch={handleSearchSubmit}
              isLoading={isLoading}
              activeProfileName={profile.username}
            />
          </div>
        </div>
      )}

      {/* ═══════ CLIPPING LIGHTBOX MODAL ═══════ */}
      <ClippingModal
        isOpen={clippingModal.isOpen}
        onClose={() => setClippingModal(prev => ({ ...prev, isOpen: false }))}
        title={clippingModal.title}
        category={clippingModal.category}
      >
        {clippingModal.content}
      </ClippingModal>
    </div>
  );
};
