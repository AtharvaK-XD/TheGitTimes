import React, { useState } from 'react';
import type { GitTimesProfile } from '../data/mockProfiles';
import { Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface PageTwoProps {
  profile: GitTimesProfile;
  onInspectClipping: (title: string, category: string, content: React.ReactNode) => void;
}

export const PageTwo: React.FC<PageTwoProps> = ({ profile, onInspectClipping }) => {
  // Interactive Git Crossword State
  const [crosswordAnswers, setCrosswordAnswers] = useState<Record<string, string>>({
    '1_1': '', '1_2': '', '1_3': '',
    '2_1': '', '2_2': '', '2_3': '', '2_4': '',
  });

  const handleCrosswordChange = (key: string, val: string) => {
    audioEngine.playTypewriterKey();
    setCrosswordAnswers((prev) => ({
      ...prev,
      [key]: val.toUpperCase(),
    }));
  };

  const isCrosswordSolved =
    (crosswordAnswers['1_1'] + crosswordAnswers['1_2'] + crosswordAnswers['1_3']) === 'GIT' &&
    (crosswordAnswers['2_1'] + crosswordAnswers['2_2'] + crosswordAnswers['2_3'] + crosswordAnswers['2_4']) === 'HEAD';

  return (
    <div className="w-full flex flex-col select-text text-ink" style={{ fontSize: '13px' }}>

      {/* ════════════════════════════════════════════════════
          PAGE 2 HEADER BAR
          ════════════════════════════════════════════════════ */}
      <header className="flex-shrink-0 mb-1">
        <div className="flex items-center justify-between font-typewriter uppercase tracking-[0.12em] text-ink font-bold pb-1"
          style={{ fontSize: '8px', borderBottom: '1.5px solid #1a1615' }}>
          <span>PAGE 2 · SUNDAY SUNDRY & FEATURES</span>
          <span className="hidden sm:inline">THE GIT TIMES GAZETTE</span>
          <span>ISSUE NO. {profile.issueNo}</span>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          FEATURE STORY
          ════════════════════════════════════════════════════ */}
      <section
        onClick={() =>
          onInspectClipping(
            profile.featureStory.title,
            'Sunday Special Feature',
            <div>
              <p className="font-typewriter text-xs text-ink-muted font-bold mb-3">{profile.featureStory.author}</p>
              {profile.featureStory.content.map((p, idx) => (
                <p key={idx} className="mb-3 text-justify leading-relaxed font-body text-base">{p}</p>
              ))}
            </div>
          )
        }
        className="newspaper-clipping py-2 flex-shrink-0"
        style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}
      >
        <div className="font-typewriter font-bold text-ink-muted uppercase tracking-[0.15em] mb-0.5" style={{ fontSize: '8px' }}>
          Special Investigative Report
        </div>
        <h2 className="font-headline ink-bleed font-black uppercase text-ink leading-[1.05]" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)' }}>
          {profile.featureStory.title}
        </h2>
        <div className="font-headline italic text-ink-sepia mb-2" style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)' }}>
          {profile.featureStory.author}
        </div>

        <div className="columns-1 sm:columns-2 gap-5 font-body text-[12px] leading-[1.6] text-justify text-ink" style={{ columnRule: '1px solid rgba(26,22,21,0.12)' }}>
          {profile.featureStory.content.map((para, idx) => (
            <p key={idx} className={idx === 0 ? 'drop-cap mb-2' : 'mb-2'}>{para}</p>
          ))}
        </div>
      </section>

      {/* Fleuron ornament */}
      <div className="ornament-divider flex-shrink-0" style={{ fontSize: '9px', padding: '1px 0', letterSpacing: '8px' }}>❧ ❧ ❧</div>

      {/* ════════════════════════════════════════════════════
          CROSSWORD + HOROSCOPE
          ════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 py-2 flex-shrink-0" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
        {/* Interactive Git Crossword */}
        <div className="md:col-span-7 newspaper-clipping p-2.5 md:pr-4 md:border-r md:border-ink/15 pb-3 md:pb-0"
          style={{ background: 'rgba(230,215,188,0.2)', border: '0.5px solid rgba(26,22,21,0.15)' }}>
          <div className="flex items-center justify-between pb-1 mb-2" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
            <h4 className="font-typewriter text-[10px] font-bold uppercase tracking-[0.12em] text-ink flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-ink-muted" />
              <span>Interactive Git Crossword Riddle</span>
            </h4>
            {isCrosswordSolved && (
              <span className="flex items-center gap-1 font-typewriter text-[9px] text-emerald-900 font-bold">
                <CheckCircle className="w-3 h-3 text-emerald-800" /> Solved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Clues */}
            <div className="font-typewriter text-[9.5px] space-y-1 text-ink-muted leading-tight">
              <p className="font-bold text-ink uppercase">ACROSS CLUES:</p>
              <p><strong>1.</strong> DVCS created by Linus (3 Letters)</p>
              <p><strong>2.</strong> Pointer to current branch commit tip (4 Letters)</p>
            </div>

            {/* Inputs — Aged paper boxes instead of white inputs */}
            <div className="flex flex-col gap-2 justify-center items-center font-typewriter">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold text-ink-muted mr-1">1.</span>
                {['1_1', '1_2', '1_3'].map((key) => (
                  <input
                    key={key}
                    maxLength={1}
                    value={crosswordAnswers[key] || ''}
                    onChange={(e) => handleCrosswordChange(key, e.target.value)}
                    className="w-7 h-7 text-center uppercase font-bold border border-ink/60 text-ink text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: crosswordAnswers[key] ? '#e8d8b8' : 'rgba(230,215,188,0.5)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12)',
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[9px] font-bold text-ink-muted mr-1">2.</span>
                {['2_1', '2_2', '2_3', '2_4'].map((key) => (
                  <input
                    key={key}
                    maxLength={1}
                    value={crosswordAnswers[key] || ''}
                    onChange={(e) => handleCrosswordChange(key, e.target.value)}
                    className="w-7 h-7 text-center uppercase font-bold border border-ink/60 text-ink text-xs focus:outline-none transition-colors"
                    style={{
                      backgroundColor: crosswordAnswers[key] ? '#e8d8b8' : 'rgba(230,215,188,0.5)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.12)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Horoscope */}
        <div
          onClick={() =>
            onInspectClipping(
              `Developer Horoscope: ${profile.horoscope.sign}`,
              'Celestial Guidance',
              <div className="font-typewriter text-sm space-y-3">
                <p><strong>Astrological Sign:</strong> {profile.horoscope.sign}</p>
                <p><strong>Prophecy:</strong> {profile.horoscope.prediction}</p>
                <p><strong>Lucky Talisman:</strong> {profile.horoscope.luckyTool}</p>
              </div>
            )
          }
          className="md:col-span-5 newspaper-clipping p-2.5 md:pl-4 flex flex-col justify-between"
          style={{ background: 'rgba(230,215,188,0.15)' }}
        >
          <div>
            <div className="flex items-center justify-between pb-1 mb-1.5" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <h4 className="font-typewriter text-[10px] font-bold uppercase tracking-[0.12em] text-ink flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-ink-muted" />
                <span>Tech Horoscope & Fortune</span>
              </h4>
            </div>
            <div className="font-typewriter text-[10px] space-y-1">
              <span className="font-extrabold text-ink uppercase block">{profile.horoscope.sign}</span>
              <p className="text-ink-muted leading-snug font-serif italic text-xs">
                "{profile.horoscope.prediction}"
              </p>
            </div>
          </div>
          <div className="mt-2 pt-1 font-typewriter text-[9px] text-ink font-bold" style={{ borderTop: '0.5px solid rgba(26,22,21,0.15)' }}>
            Talisman: {profile.horoscope.luckyTool}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          RETRO COMIC STRIP — SUNDAY FUNNIES
          ════════════════════════════════════════════════════ */}
      <section
        onClick={() =>
          onInspectClipping(
            'Sunday Comic Strip: Rebase vs Merge',
            'Sunday Funnies',
            <div className="text-center font-typewriter">
              <p className="text-base mb-2">"Developer A attempts a clean fast-forward rebase."</p>
              <p className="text-sm italic text-stone-700">"Developer B merges with --no-ff creating a glorious octopus graph!"</p>
            </div>
          )
        }
        className="newspaper-clipping py-2.5 px-2 flex-1 min-h-0 mt-1 flex flex-col justify-between"
        style={{ borderTop: '1.5px solid #1a1615', borderBottom: '1.5px solid #1a1615', background: 'rgba(230,215,188,0.15)' }}
      >
        <h4 className="font-typewriter text-[9px] font-bold uppercase tracking-[0.2em] text-ink text-center mb-1.5 pb-0.5"
          style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
          ★ SUNDAY FUNNIES: THE REBASE PARADOX ★
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-typewriter text-[10px]">
          <div className="p-2 flex flex-col justify-between" style={{ border: '0.5px solid rgba(26,22,21,0.25)', background: 'rgba(230,215,188,0.3)' }}>
            <span className="font-bold text-ink uppercase text-[9px]">Panel 1: "Clean History"</span>
            <p className="text-ink-muted italic my-1 leading-tight" style={{ fontSize: '9.5px' }}>"I'll rebase interactively to keep linear commits!"</p>
            <span className="text-[8px] text-ink-muted">Pick commit a1b2c3</span>
          </div>

          <div className="p-2 flex flex-col justify-between" style={{ border: '0.5px solid rgba(26,22,21,0.25)', background: 'rgba(230,215,188,0.3)' }}>
            <span className="font-bold text-ink uppercase text-[9px]">Panel 2: "CONFLICT!"</span>
            <p className="text-ink font-extrabold my-1 leading-tight" style={{ fontSize: '9.5px' }}>"CONFLICT (content): Merge conflict in main.rs"</p>
            <span className="text-[8px] text-ink-muted">{'<<<<<<< HEAD'}</span>
          </div>

          <div className="p-2 flex flex-col justify-between" style={{ border: '0.5px solid rgba(26,22,21,0.25)', background: 'rgba(230,215,188,0.3)' }}>
            <span className="font-bold text-ink uppercase text-[9px]">Panel 3: "git push --force"</span>
            <p className="text-ink-muted italic my-1 leading-tight" style={{ fontSize: '9.5px' }}>"Problem solved! Production will never know."</p>
            <span className="text-[8px] text-ink-muted">Everything up-to-date</span>
          </div>
        </div>
      </section>
    </div>
  );
};
