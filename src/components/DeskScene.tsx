import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { GitTimesProfile } from '../data/mockProfiles';
import { TypewriterHeader } from './TypewriterHeader';
import { FrontPage } from './FrontPage';
import { PageTwo } from './PageTwo';
import { ClippingModal } from './ClippingModal';
import { audioEngine } from '../services/audioEngine';
import { BookOpen, RotateCcw } from 'lucide-react';

interface DeskSceneProps {
  profile: GitTimesProfile;
  onSearchUsername: (username: string) => void;
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
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<'front' | 'two'>('front');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [isFlipping, setIsFlipping] = useState(false);
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

  // Smooth mouse tracking with lerp for silky parallax
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

  // Parallax depth layers
  const tiltX = smoothMouse.y * -3;
  const tiltY = smoothMouse.x * 5;
  const layer1X = smoothMouse.x * -18;
  const layer1Y = smoothMouse.y * -18;
  const layer2X = smoothMouse.x * -10;
  const layer2Y = smoothMouse.y * -10;
  const shadowX = -smoothMouse.x * 30;
  const shadowY = 30 + smoothMouse.y * 25;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-950 flex flex-col items-center py-3 px-2 sm:px-4">

      {/* ═══════ LAYER 0: MAHOGANY DESK BACKGROUND ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/assets/newspaper_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.55) contrast(1.2) saturate(0.8)',
        }}
      />
      {/* Vignette overlay — deeper, warmer */}
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-[1]" />
      {/* Warm color wash */}
      <div className="fixed inset-0 bg-amber-950/15 pointer-events-none z-[1] mix-blend-multiply" />

      {/* ═══════ LAYER 1: CANDLE GLOW LIGHTS ═══════ */}
      {/* Primary candle glow — top right */}
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
      {/* Secondary candle glow — bottom left (softer) */}
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
      {/* Warm light bleed on paper edges */}
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

      {/* ═══════ LAYER 3: PERIOD PROPS (DEEP PARALLAX) ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-[4]"
        style={{ transform: `translate3d(${layer1X}px, ${layer1Y}px, 0)`, transition: 'transform 0.1s linear' }}
      >
        {/* ── TOP-RIGHT CANDLE (realistic multi-part) ── */}
        <div className="absolute top-4 right-6 md:right-14 flex flex-col items-center">
          {/* Flame outer glow aura */}
          <div className="absolute -top-8 w-20 h-20 rounded-full candle-glow-bleed"
            style={{ background: 'radial-gradient(circle, rgba(255, 180, 60, 0.35) 0%, transparent 70%)' }} />
          {/* Flame outer (amber/orange) */}
          <div className="relative">
            <div className="w-4 h-7 rounded-full candle-flame mx-auto"
              style={{ background: 'linear-gradient(to top, #e67e22 0%, #f39c12 30%, #f1c40f 60%, rgba(255,255,255,0.9) 100%)' }}>
              {/* Flame inner core (blue/white) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-full flame-core"
                style={{ background: 'linear-gradient(to top, #3498db 0%, #ecf0f1 60%, white 100%)' }} />
            </div>
            {/* Wick */}
            <div className="w-0.5 h-2 bg-stone-800 mx-auto" />
            {/* Candle body — wax with realistic gradient + drip marks */}
            <div className="w-7 h-20 mx-auto rounded-t-sm relative overflow-hidden"
              style={{ background: 'linear-gradient(to right, #f5e6c8, #faf0dc 40%, #f0dbb8)' }}>
              {/* Wax drip */}
              <div className="absolute top-0 left-1 w-2 h-5 rounded-b-full"
                style={{ background: 'linear-gradient(to bottom, #faf0dc, #ebe0c8)' }} />
            </div>
            {/* Brass candlestick holder */}
            <div className="w-10 h-2 rounded-sm mx-auto -mt-0.5"
              style={{ background: 'linear-gradient(to bottom, #c9a84c, #8b6914, #a67c23)' }} />
            <div className="w-14 h-3 rounded-full mx-auto"
              style={{ background: 'linear-gradient(to bottom, #a67c23, #7a5c16, #8b6914)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
          </div>
        </div>

        {/* ── TOP-LEFT VINTAGE PROPS ── */}
        <div className="absolute top-8 left-3 md:left-10 hidden sm:block">
          <img
            src="/assets/vintage_props.png"
            alt="Vintage desk props"
            className="w-40 md:w-52 opacity-85 -rotate-6"
            style={{ filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.6)) brightness(0.9) contrast(1.1)' }}
          />
        </div>

        {/* ── BOTTOM-LEFT SCATTERED LEAVES (CSS only) ── */}
        <div className="absolute bottom-16 left-8 hidden md:block">
          <div className="w-8 h-5 rounded-full rotate-[35deg] opacity-40"
            style={{ background: 'linear-gradient(135deg, #6b4226, #8b5e3c)', boxShadow: '2px 3px 6px rgba(0,0,0,0.3)' }} />
          <div className="w-6 h-4 rounded-full rotate-[-20deg] opacity-35 ml-4 -mt-1"
            style={{ background: 'linear-gradient(135deg, #5c3a1e, #7a4f30)', boxShadow: '2px 3px 6px rgba(0,0,0,0.3)' }} />
        </div>

        {/* ── BOTTOM-RIGHT SMALL CANDLE (oil lamp style) ── */}
        <div className="absolute bottom-12 right-10 hidden md:flex flex-col items-center">
          <div className="w-3 h-5 rounded-full candle-flame mx-auto"
            style={{ background: 'linear-gradient(to top, #d35400 0%, #f39c12 50%, rgba(255,255,200,0.9) 100%)', animationDelay: '0.7s' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full flame-core"
              style={{ background: 'linear-gradient(to top, #2980b9 0%, white 100%)', animationDelay: '0.9s' }} />
          </div>
          <div className="w-8 h-6 rounded-b-full"
            style={{ background: 'linear-gradient(to bottom, #8b6914, #5c4510)', boxShadow: '0 3px 8px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      {/* ═══════ LAYER 4: SECONDARY PROPS (SHALLOW PARALLAX) ═══════ */}
      <div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ transform: `translate3d(${layer2X}px, ${layer2Y}px, 0)`, transition: 'transform 0.1s linear' }}
      >
        {/* Faint quill feather shadow on desk */}
        <div className="absolute top-40 left-6 hidden lg:block opacity-20 rotate-[150deg]"
          style={{ width: '120px', height: '4px', background: 'linear-gradient(to right, transparent, rgba(200,180,140,0.5), transparent)', filter: 'blur(2px)' }} />
      </div>

      {/* ═══════ TYPEWRITER INPUT HEADER ═══════ */}
      <div className="relative z-[20] flex-shrink-0">
        <TypewriterHeader
          onSearch={onSearchUsername}
          isLoading={isLoading}
          activeProfileName={profile.username}
        />
      </div>

      {/* ═══════ 3D NEWSPAPER HERO SHEET ═══════ */}
      <main className="relative z-[20] w-full max-w-[1400px] mx-auto flex-1 min-h-0 perspective-1000 my-2">
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
            className={`relative w-full h-full paper-texture deckled-paper coffee-stain coffee-stain-2 transition-all duration-700 transform-gpu flex flex-col ${
              isFlipping ? 'scale-[0.97] opacity-90' : ''
            }`}
            style={{
              boxShadow: `${shadowX}px ${shadowY}px 50px rgba(0,0,0,0.55), ${shadowX * 0.3}px ${shadowY * 0.5}px 15px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.03)`,
              padding: 'clamp(12px, 2.5vw, 28px)',
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

            {/* Paper grain pseudo-element is in CSS ::before */}

            {/* Corner curl — top right (realistic fold shadow) */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-[5]"
              style={{
                background: 'linear-gradient(225deg, rgba(180, 160, 120, 0.3) 0%, rgba(220, 200, 160, 0.15) 30%, transparent 50%)',
                clipPath: 'polygon(100% 0, 30% 0, 100% 70%)',
                boxShadow: 'inset -2px 2px 4px rgba(0,0,0,0.08)',
              }}
            />
            {/* Corner curl — bottom left (very subtle) */}
            <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none z-[5]"
              style={{
                background: 'linear-gradient(45deg, rgba(180, 160, 120, 0.2) 0%, transparent 40%)',
                clipPath: 'polygon(0 100%, 0 40%, 60% 100%)',
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

            {/* ── CONTENT AREA (relative z-index above overlays) ── */}
            <div className="relative z-[10] flex-1 min-h-0 flex flex-col">
              {/* LOADING STATE — INK BLOT ANIMATION */}
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  {/* Ink blot */}
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
