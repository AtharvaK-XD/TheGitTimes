import React from 'react';
import type { GitTimesProfile } from '../data/mockProfiles';
import { TrendingUp, Sun, Flame, Award, Hash, Star, Users } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface FrontPageProps {
  profile: GitTimesProfile;
  onInspectClipping: (title: string, category: string, content: React.ReactNode) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({ profile, onInspectClipping }) => {
  const handleClickClipping = (title: string, category: string, content: React.ReactNode) => {
    audioEngine.playPaperRustle();
    onInspectClipping(title, category, content);
  };

  const maxCommits = Math.max(...profile.contributionChart.map(p => p.commits));

  return (
    <div className="w-full select-text text-ink flex flex-col" style={{ fontSize: '13px' }}>

      {/* ════════════════════════════════════════════════════
          MASTHEAD
          ════════════════════════════════════════════════════ */}
      <header className="text-center mb-0 flex-shrink-0">
        <div className="flex items-center justify-between font-body uppercase tracking-[0.2em] text-ink-muted pb-0.5"
          style={{ fontSize: '8px', borderBottom: '0.5px solid rgba(26,22,21,0.3)' }}>
          <span>{profile.location}</span>
          <span className="hidden md:inline font-typewriter tracking-[0.3em]" style={{ fontSize: '7px' }}>★ THE LEADING DAILY OF THE CODING REPUBLIC ★</span>
          <span>EST. MMVIII</span>
        </div>
        <div className="rule-double my-1" style={{ height: '3px' }} />
        <h1 className="font-masthead ink-bleed uppercase leading-none my-0.5" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '0.04em' }}>
          The Git Times
        </h1>
        <p className="font-headline italic text-ink-sepia" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)', letterSpacing: '0.15em' }}>
          "All the Commits Fit to Print"
        </p>
        <div className="rule-double mt-0.5 mb-0" style={{ height: '3px' }} />
        <div className="py-0.5 flex flex-wrap items-center justify-between font-typewriter uppercase tracking-[0.1em] text-ink font-bold"
          style={{ fontSize: '8px', borderBottom: '1.5px solid #1a1615' }}>
          <span>VOL. {profile.volumeNo}, NO. {profile.issueNo}</span>
          <span className="flex items-center gap-1"><span style={{ fontSize: '5px' }}>✦</span> PRICE: TWO PULL REQUESTS <span style={{ fontSize: '5px' }}>✦</span></span>
          <span>{profile.dateStr}</span>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          HEADLINE
          ════════════════════════════════════════════════════ */}
      <section
        onClick={() => handleClickClipping(profile.headline, 'Lead Story',
          <div>
            <p className="font-headline text-lg italic text-ink-sepia mb-3">{profile.subHeadline}</p>
            {profile.bioArticle.map((p, i) => <p key={i} className="mb-3 text-justify leading-relaxed font-body text-base">{p}</p>)}
          </div>
        )}
        className="newspaper-clipping py-1 flex-shrink-0"
        style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}
      >
        <h2 className="font-headline ink-bleed uppercase leading-[1.05] text-ink font-black" style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.8rem)', letterSpacing: '-0.01em' }}>
          {profile.headline}
        </h2>
        <div className="flex items-center gap-2">
          <h3 className="font-headline italic font-semibold text-ink-muted" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.78rem)' }}>
            {profile.subHeadline}
          </h3>
          <span className="font-typewriter text-ink-muted tracking-wider uppercase flex-shrink-0" style={{ fontSize: '7px' }}>— By Our Special Correspondent</span>
        </div>
      </section>

      {/* Ornament */}
      <div className="ornament-divider flex-shrink-0" style={{ fontSize: '9px', padding: '1px 0', letterSpacing: '8px' }}>❧ ❧ ❧</div>

      {/* ════════════════════════════════════════════════════
          MAIN BROADSHEET GRID — 5 COLUMN DENSE LAYOUT
          ════════════════════════════════════════════════════ */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_0.5px_1.2fr_0.5px_1fr] gap-0"
        style={{ fontSize: '12px' }}>

        {/* ━━━━━━━━ COLUMN 1: Photo + Bio ━━━━━━━━ */}
        <div className="flex flex-col gap-1.5 pr-2 min-h-0">
          {/* Photo Well */}
          <div
            onClick={() => handleClickClipping(`Portrait of @${profile.username}`, 'Developer Photograph',
              <div className="text-center">
                <div className="relative inline-block"><img src={profile.avatarUrl} alt={profile.fullName} className="w-52 h-52 halftone-sepia border border-stone-400 shadow-md" /><div className="halftone-dots-overlay" /></div>
                <p className="font-handwriting text-2xl text-ink-sepia mt-3">{profile.caption}</p>
              </div>
            )}
            className="newspaper-clipping flex-shrink-0"
          >
            <div className="torn-photo-frame max-w-[200px] mx-auto" style={{ padding: '4px 4px 14px 4px' }}>
              <div className="relative overflow-hidden border border-stone-300">
                <img src={profile.avatarUrl} alt={profile.fullName}
                  className="w-full aspect-square object-cover halftone-sepia transition-transform duration-500 hover:scale-105" />
                <div className="halftone-dots-overlay" />
                <div className="absolute inset-0 bg-amber-900/8 mix-blend-multiply pointer-events-none" />
              </div>
              <p className="font-handwriting text-center text-ink mt-1 leading-tight" style={{ fontSize: '11px' }}>
                {profile.caption}
              </p>
            </div>
          </div>

          {/* Bio Article (compact) */}
          <div
            onClick={() => handleClickClipping(`Editorial: @${profile.username}`, 'Editorial',
              <div>{profile.bioArticle.map((p, i) => <p key={i} className="mb-3 leading-relaxed font-body text-base">{p}</p>)}</div>
            )}
            className="newspaper-clipping flex-1 min-h-0 overflow-hidden"
          >
            <div className="font-body text-justify text-ink leading-[1.55]" style={{ fontSize: '11.5px' }}>
              <p className="drop-cap mb-1">{profile.bioArticle[0]}</p>
              <p className="line-clamp-4">{profile.bioArticle[1]}</p>
            </div>
          </div>
        </div>

        {/* Column Rule 1 */}
        <div className="hidden lg:block" style={{ background: 'rgba(26,22,21,0.15)' }} />

        {/* ━━━━━━━━ COLUMN 2: Stats + Markets + Weather ━━━━━━━━ */}
        <div className="flex flex-col gap-1.5 px-2 min-h-0">
          {/* Stats Manifesto (compact 3×2) */}
          <section
            onClick={() => handleClickClipping('Developer Statistics Manifesto', 'Gazette Record',
              <div className="grid grid-cols-2 gap-3 font-typewriter">
                {[
                  { label: 'Repositories', value: profile.statsManifest.totalRepos },
                  { label: 'Stars', value: profile.statsManifest.totalStars.toLocaleString() },
                  { label: 'Followers', value: profile.statsManifest.totalFollowers.toLocaleString() },
                  { label: 'Streak', value: `${profile.statsManifest.currentStreak} Days` },
                  { label: 'Commits/Year', value: profile.statsManifest.totalCommitsYear.toLocaleString() },
                  { label: 'PRs Merged', value: profile.statsManifest.pullRequestsMerged.toLocaleString() },
                ].map((s, i) => (
                  <div key={i} className="p-3 border border-ink/30" style={{ background: 'rgba(230,215,188,0.3)' }}>
                    <span className="text-[10px] text-ink-muted block uppercase">{s.label}</span>
                    <span className="text-xl font-bold text-ink">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            className="newspaper-clipping flex-shrink-0"
            style={{ borderBottom: '0.5px solid rgba(26,22,21,0.15)' }}
          >
            <div className="flex items-center gap-1 mb-1" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <Award className="w-3 h-3 text-ink-muted flex-shrink-0" />
              <h4 className="font-typewriter font-bold uppercase tracking-[0.1em] text-ink" style={{ fontSize: '8px' }}>Gazette Bulletin · Key Statistics</h4>
            </div>
            <div className="grid grid-cols-3 gap-0 font-typewriter" style={{ fontSize: '9px' }}>
              {[
                { icon: <Hash className="w-2.5 h-2.5" />, label: 'Repos', value: profile.statsManifest.totalRepos },
                { icon: <Star className="w-2.5 h-2.5" />, label: 'Stars', value: profile.statsManifest.totalStars.toLocaleString() },
                { icon: <Users className="w-2.5 h-2.5" />, label: 'Followers', value: profile.statsManifest.totalFollowers.toLocaleString() },
                { icon: <Flame className="w-2.5 h-2.5" />, label: 'Streak', value: `${profile.statsManifest.currentStreak}d` },
                { icon: <TrendingUp className="w-2.5 h-2.5" />, label: 'Commits', value: profile.statsManifest.totalCommitsYear.toLocaleString() },
                { icon: <Award className="w-2.5 h-2.5" />, label: 'PRs', value: profile.statsManifest.pullRequestsMerged.toLocaleString() },
              ].map((s, idx) => (
                <div key={idx} className="text-center py-1"
                  style={{ borderRight: idx % 3 !== 2 ? '0.5px solid rgba(26,22,21,0.1)' : 'none', borderBottom: idx < 3 ? '0.5px solid rgba(26,22,21,0.1)' : 'none' }}>
                  <div className="flex justify-center text-ink-muted mb-0.5">{s.icon}</div>
                  <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>{s.label}</div>
                  <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '14px' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Markets — Commit Index Chart */}
          <div
            onClick={() => handleClickClipping('Market Index: Weekly Commits', 'Financial Exchange',
              <div>
                <p className="mb-4 font-body">Strong bullish momentum across feature branches with zero merge halts.</p>
                <div className="p-3 border border-ink/30 font-typewriter text-xs" style={{ background: 'rgba(230,215,188,0.3)' }}>
                  {profile.contributionChart.map((pt) => (
                    <div key={pt.day} className="flex justify-between py-1" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.15)' }}>
                      <span>{pt.day}</span><span className="font-bold">{pt.commits} Commits</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            className="newspaper-clipping flex-shrink-0"
            style={{ borderBottom: '0.5px solid rgba(26,22,21,0.15)' }}
          >
            <div className="flex items-center justify-between mb-1" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <h4 className="font-typewriter font-bold uppercase tracking-[0.1em] text-ink flex items-center gap-1" style={{ fontSize: '8px' }}>
                <TrendingUp className="w-3 h-3 text-ink-muted" /> Markets · Commit Index
              </h4>
              <span className="font-typewriter text-ink font-bold" style={{ fontSize: '8px' }}>▲ 18.4%</span>
            </div>
            <div className="relative w-full" style={{ height: '70px', background: 'rgba(230,215,188,0.2)', border: '0.5px solid rgba(26,22,21,0.12)' }}>
              <svg className="w-full h-full overflow-visible p-1" viewBox="0 0 100 35" preserveAspectRatio="none">
                <polygon fill="rgba(26,22,21,0.04)"
                  points={`0,35 ${profile.contributionChart.map((pt, i) => `${(i / 6) * 100},${35 - (pt.commits / maxCommits) * 30}`).join(' ')} 100,35`} />
                <polyline fill="none" stroke="#1a1615" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  points={profile.contributionChart.map((pt, i) => `${(i / 6) * 100},${35 - (pt.commits / maxCommits) * 30}`).join(' ')} />
                {profile.contributionChart.map((pt, i) => (
                  <circle key={i} cx={(i / 6) * 100} cy={35 - (pt.commits / maxCommits) * 30} r="1.5" fill="#1a1615" stroke="#ede4d0" strokeWidth="0.6" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between font-typewriter text-ink-muted font-bold mt-0.5" style={{ fontSize: '7px' }}>
              {profile.contributionChart.map(pt => <span key={pt.day}>{pt.day}</span>)}
            </div>
          </div>

          {/* Weather Box */}
          <div
            onClick={() => handleClickClipping('Activity Weather Forecast', 'Atmospheric Dispatch',
              <div className="font-typewriter text-sm space-y-3">
                <p><strong>Forecast:</strong> {profile.weatherActivity.forecastSummary}</p>
                <p><strong>Peak:</strong> {profile.weatherActivity.peakHour}</p>
                <p><strong>Temp:</strong> {profile.weatherActivity.temperature}</p>
              </div>
            )}
            className="newspaper-clipping p-1.5 flex-shrink-0"
            style={{ background: 'rgba(230,215,188,0.15)', border: '0.5px solid rgba(26,22,21,0.12)' }}
          >
            <div className="flex items-center gap-1 mb-0.5" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <Sun className="w-2.5 h-2.5 text-ink-muted" />
              <h4 className="font-typewriter font-bold uppercase tracking-[0.1em] text-ink" style={{ fontSize: '8px' }}>Weather · Commit Climate</h4>
            </div>
            <div className="font-typewriter text-ink" style={{ fontSize: '9px', lineHeight: '1.4' }}>
              <p className="font-bold uppercase leading-tight">{profile.weatherActivity.forecastSummary}</p>
              <p className="text-ink-muted mt-0.5">Peak: {profile.weatherActivity.peakHour}</p>
              <p className="text-ink-muted">Heat: {profile.weatherActivity.temperature}</p>
            </div>
          </div>
        </div>

        {/* Column Rule 2 */}
        <div className="hidden lg:block" style={{ background: 'rgba(26,22,21,0.15)' }} />

        {/* ━━━━━━━━ COLUMN 3: Sports + Quote + Classifieds ━━━━━━━━ */}
        <div className="flex flex-col gap-1.5 pl-2 min-h-0">
          {/* Sports Table — Language League */}
          <div
            onClick={() => handleClickClipping('Language League Standings', 'Sports Gazette',
              <div>
                <table className="w-full font-typewriter text-xs text-left border-collapse">
                  <thead><tr style={{ borderBottom: '2px solid #1a1615' }}>
                    <th className="p-2">#</th><th className="p-2">Language</th><th className="p-2 text-right">Share</th><th className="p-2 text-right">Status</th>
                  </tr></thead>
                  <tbody>{profile.languages.map(l => (
                    <tr key={l.name} style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
                      <td className="p-2 font-bold">{l.rank}</td><td className="p-2">{l.name}</td>
                      <td className="p-2 text-right">{l.share}%</td><td className="p-2 text-right">{l.status}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
            className="newspaper-clipping flex-shrink-0"
            style={{ borderBottom: '0.5px solid rgba(26,22,21,0.15)' }}
          >
            <div className="flex items-center justify-between mb-1" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <h4 className="font-typewriter font-bold uppercase tracking-[0.1em] text-ink" style={{ fontSize: '8px' }}>Sports · Language League</h4>
              <span className="font-typewriter uppercase text-ink-muted" style={{ fontSize: '7px' }}>MMXXVI</span>
            </div>
            <table className="w-full font-typewriter" style={{ fontSize: '9px' }}>
              <thead>
                <tr className="font-bold text-ink-muted" style={{ borderBottom: '1px solid #1a1615' }}>
                  <th className="pb-0.5 text-left pr-1">#</th>
                  <th className="pb-0.5 text-left">Language</th>
                  <th className="pb-0.5 text-right">Share</th>
                  <th className="pb-0.5 text-right">Form</th>
                </tr>
              </thead>
              <tbody>
                {profile.languages.map(lang => (
                  <tr key={lang.name} className="hover:bg-amber-100/20 transition-colors" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.1)' }}>
                    <td className="py-0.5 pr-1 font-extrabold">{lang.rank}</td>
                    <td className="py-0.5 font-bold">{lang.name}</td>
                    <td className="py-0.5 text-right font-mono text-ink-muted">{lang.share}%</td>
                    <td className="py-0.5 text-right">
                      <span className="inline-block px-1 py-px font-bold uppercase tracking-wider"
                        style={{
                          fontSize: '7px',
                          background: lang.status === 'LEADER' ? '#1a1615' : 'transparent',
                          color: lang.status === 'LEADER' ? '#ede4d0' : '#3b342e',
                          border: lang.status !== 'LEADER' ? '0.5px solid #3b342e' : 'none',
                        }}>
                        {lang.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pull Quote (Sticky Note) */}
          <div
            onClick={() => handleClickClipping('Quote of the Edition', 'Handwritten Note',
              <div className="text-center p-4">
                <p className="font-handwriting text-3xl text-ink-sepia">"{profile.pullQuote.quote}"</p>
                <p className="font-body italic mt-2 text-ink-muted">— {profile.pullQuote.author}</p>
              </div>
            )}
            className="sticky-note p-2.5 relative cursor-pointer flex-shrink-0"
            style={{ transform: 'rotate(1.2deg)' }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2.5 tape-strip rounded-sm rotate-[0.5deg]" />
            <blockquote className="font-handwriting text-ink-sepia font-bold leading-snug" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
              "{profile.pullQuote.quote}"
            </blockquote>
            <cite className="block font-body italic text-ink-muted text-right mt-1 not-italic" style={{ fontSize: '10px' }}>
              — {profile.pullQuote.author}
            </cite>
            <div className="mt-1 pt-1 font-handwriting text-red-900" style={{ fontSize: '10px', borderTop: '0.5px solid rgba(180,140,60,0.3)' }}>
              ✎ {profile.pullQuote.handwrittenNote}
            </div>
          </div>

          {/* Classifieds Strip */}
          <footer
            onClick={() => handleClickClipping('Classifieds', 'Classified Advertisements',
              <div className="space-y-3 font-typewriter">
                {profile.classifieds.map((ad, i) => (
                  <div key={i} style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }} className="pb-2">
                    <h5 className="font-bold text-ink uppercase text-xs">{ad.title}</h5>
                    <p className="text-[11px] text-ink-muted mt-0.5">{ad.description}</p>
                    <span className="text-[10px] text-ink-sepia font-bold">{ad.contact}</span>
                  </div>
                ))}
              </div>
            )}
            className="newspaper-clipping flex-1 min-h-0 overflow-hidden"
            style={{ borderTop: '1.5px solid #1a1615' }}
          >
            <div className="text-center font-typewriter font-bold uppercase tracking-[0.15em] text-ink mb-1"
              style={{ fontSize: '7px', borderBottom: '0.5px solid rgba(26,22,21,0.2)', paddingBottom: '2px' }}>
              ✦ Classifieds ✦
            </div>
            <div className="font-typewriter text-ink" style={{ fontSize: '9px' }}>
              {profile.classifieds.map((ad, idx) => (
                <div key={idx} className="mb-1" style={{ borderBottom: idx < profile.classifieds.length - 1 ? '0.5px dotted rgba(26,22,21,0.15)' : 'none', paddingBottom: '2px' }}>
                  <span className="font-extrabold uppercase block leading-tight">{ad.title}</span>
                  <p className="text-ink-muted leading-tight line-clamp-2">{ad.description}</p>
                  <span className="text-ink-sepia font-bold" style={{ fontSize: '8px' }}>{ad.contact}</span>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
