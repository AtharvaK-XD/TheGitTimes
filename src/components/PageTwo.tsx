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
    <div className="w-full flex flex-col gap-6 text-ink font-body">
      {/* Header Bar Page 2 */}
      <div className="border-b-2 border-ink pb-2 flex justify-between items-center font-typewriter text-xs uppercase tracking-wider font-bold">
        <span>PAGE 2 · SUNDAY SUNDRY & FEATURES</span>
        <span>THE GIT TIMES GAZETTE</span>
        <span>ISSUE NO. {profile.issueNo}</span>
      </div>

      {/* FEATURE STORY */}
      <section
        onClick={() =>
          onInspectClipping(
            profile.featureStory.title,
            'Sunday Special Feature',
            <div>
              <p className="font-typewriter text-xs text-amber-900 font-bold mb-3">{profile.featureStory.author}</p>
              {profile.featureStory.content.map((p, idx) => (
                <p key={idx} className="mb-3 leading-relaxed">{p}</p>
              ))}
            </div>
          )
        }
        className="newspaper-clipping border-b-2 border-ink/40 pb-6"
      >
        <div className="font-typewriter text-xs font-bold text-amber-900 uppercase tracking-widest mb-1">
          Special Investigative Report
        </div>
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold uppercase text-ink leading-tight mb-2">
          {profile.featureStory.title}
        </h2>
        <div className="font-headline italic text-sm text-stone-700 mb-4">{profile.featureStory.author}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-justify leading-relaxed">
          {profile.featureStory.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* CROSSWORD + HOROSCOPE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b-2 border-ink/40 pb-6">
        {/* Interactive Git Crossword */}
        <div className="md:col-span-7 border border-ink/40 p-4 bg-amber-50/40">
          <div className="flex items-center justify-between border-b border-ink/40 pb-2 mb-3">
            <h4 className="font-typewriter text-xs font-bold uppercase tracking-widest text-ink flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-900" />
              <span>Interactive Git Crossword Riddle</span>
            </h4>
            {isCrosswordSolved && (
              <span className="flex items-center gap-1 font-typewriter text-xs text-emerald-800 font-bold animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-700" /> Solved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Clues */}
            <div className="font-typewriter text-xs space-y-2">
              <p className="font-bold text-amber-950">ACROSS CLUES:</p>
              <p><strong>1.</strong> The Distributed Version Control System created by Linus (3 Letters)</p>
              <p><strong>2.</strong> The pointer reference to current branch commit tip (4 Letters)</p>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3 justify-center items-center font-typewriter">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold mr-1">1.</span>
                {['1_1', '1_2', '1_3'].map((key) => (
                  <input
                    key={key}
                    maxLength={1}
                    value={crosswordAnswers[key] || ''}
                    onChange={(e) => handleCrosswordChange(key, e.target.value)}
                    className="w-8 h-8 text-center uppercase font-bold border-2 border-ink bg-stone-100 text-stone-900 focus:bg-amber-100 focus:outline-none"
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs font-bold mr-1">2.</span>
                {['2_1', '2_2', '2_3', '2_4'].map((key) => (
                  <input
                    key={key}
                    maxLength={1}
                    value={crosswordAnswers[key] || ''}
                    onChange={(e) => handleCrosswordChange(key, e.target.value)}
                    className="w-8 h-8 text-center uppercase font-bold border-2 border-ink bg-stone-100 text-stone-900 focus:bg-amber-100 focus:outline-none"
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
          className="md:col-span-5 newspaper-clipping border border-ink/40 p-4 bg-amber-100/30 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-ink/40 pb-1 mb-2">
              <h4 className="font-typewriter text-xs font-bold uppercase tracking-widest text-ink flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>Tech Horoscope & Fortune</span>
              </h4>
            </div>
            <div className="font-typewriter text-xs space-y-2">
              <span className="font-extrabold text-amber-950 block">{profile.horoscope.sign}</span>
              <p className="text-stone-800 leading-relaxed font-serif italic text-sm">
                "{profile.horoscope.prediction}"
              </p>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-ink/30 font-typewriter text-[11px] text-amber-900 font-bold">
            Talisman: {profile.horoscope.luckyTool}
          </div>
        </div>
      </div>

      {/* RETRO COMIC STRIP */}
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
        className="newspaper-clipping border-2 border-ink p-4 bg-amber-50/60 text-center"
      >
        <h4 className="font-typewriter text-xs font-bold uppercase tracking-widest text-ink mb-2">
          ★ SUNDAY FUNNIES: THE REBASE PARADOX ★
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-typewriter text-xs">
          <div className="border border-ink p-3 bg-stone-100 flex flex-col justify-between h-28">
            <span className="font-bold text-stone-800">Panel 1: "Clean History"</span>
            <p className="text-[11px] text-stone-700 italic">"I'll rebase interactively to keep linear commits!"</p>
            <span className="text-[9px] text-stone-500">Pick commit a1b2c3</span>
          </div>

          <div className="border border-ink p-3 bg-stone-100 flex flex-col justify-between h-28">
            <span className="font-bold text-red-900">Panel 2: "CONFLICT!"</span>
            <p className="text-[11px] text-red-950 font-extrabold">"CONFLICT (content): Merge conflict in main.rs"</p>
            <span className="text-[9px] text-stone-500">{'<<<<<<< HEAD'}</span>
          </div>

          <div className="border border-ink p-3 bg-stone-100 flex flex-col justify-between h-28">
            <span className="font-bold text-emerald-900">Panel 3: "git push --force"</span>
            <p className="text-[11px] text-emerald-950 italic">"Problem solved! Production will never know."</p>
            <span className="text-[9px] text-stone-500">Everything up-to-date</span>
          </div>
        </div>
      </section>
    </div>
  );
};
