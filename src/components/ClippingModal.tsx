import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface ClippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  children: React.ReactNode;
}

export const ClippingModal: React.FC<ClippingModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  children,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    audioEngine.playPaperRustle();
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Check out "${title}" on The Git Times`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}>
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Clipped Paper Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto paper-texture deckled-paper z-10"
        style={{
          padding: 'clamp(20px, 4vw, 36px)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 10px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,0,0,0.03)',
        }}
      >
        {/* Paper grain overlay */}
        <div className="paper-aged-overlay" style={{ borderRadius: 'inherit' }} />

        {/* Red push-pin at top center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-5 h-5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e74c3c, #922b21)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        />

        {/* Action Header */}
        <div className="relative z-10 flex items-center justify-between pb-2 mb-3"
          style={{ borderBottom: '1.5px solid rgba(26,22,21,0.3)' }}>
          <div className="font-typewriter text-[9px] uppercase tracking-[0.15em] text-ink-muted font-bold flex items-center gap-2">
            <span>The Git Times · Clipping Vault</span>
            <span>·</span>
            <span className="text-ink">{category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={handleCopy}
              className="p-1.5 rounded hover:bg-amber-900/10 text-ink-muted transition-colors flex items-center gap-1 font-typewriter text-[9px]"
              title="Copy clipping">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button onClick={handleClose}
              className="p-1.5 rounded hover:bg-red-900/10 text-ink transition-colors" title="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="relative z-10 font-headline text-ink uppercase tracking-tight leading-tight mb-4 ink-bleed font-extrabold"
          style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
          {title}
        </h3>

        {/* Content */}
        <div className="relative z-10 font-body text-ink text-base leading-relaxed space-y-4">
          {children}
        </div>

        {/* Footer seal */}
        <div className="relative z-10 mt-6 pt-3 text-center font-typewriter text-[8px] text-ink-muted uppercase tracking-[0.2em]"
          style={{ borderTop: '0.5px solid rgba(26,22,21,0.25)' }}>
          ✦ Archived from The Git Times Historical Gazette — All Commits Preserved ✦
        </div>
      </div>
    </div>
  );
};
