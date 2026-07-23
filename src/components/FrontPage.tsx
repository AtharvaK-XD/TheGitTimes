import React from 'react';
import type { GitTimesProfile } from '../data/mockProfiles';
import { Sun, Award, Hash, Star, Users, ExternalLink, UserCheck, Activity } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { ContributionsGrid } from './ContributionsGrid';

interface FrontPageProps {
  profile: GitTimesProfile;
  onInspectClipping: (title: string, category: string, content: React.ReactNode) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({ profile, onInspectClipping }) => {
  const handleClickClipping = (title: string, category: string, content: React.ReactNode) => {
    audioEngine.playPaperRustle();
    onInspectClipping(title, category, content);
  };

  const profileUrl = profile.profileUrl || `https://github.com/${profile.username}`;
  const followersUrl = profile.followersUrl || `${profileUrl}?tab=followers`;
  const followingUrl = profile.followingUrl || `${profileUrl}?tab=following`;
  const reposUrl = profile.reposUrl || `${profileUrl}?tab=repositories`;
  const prsUrl = `https://github.com/pulls?q=is%3Apr+author%3A${profile.username}`;

  return (
    <div className="w-full select-text text-ink flex flex-col" style={{ fontSize: '13px' }}>

      {/* ════════════════════════════════════════════════════
          MASTHEAD
          ════════════════════════════════════════════════════ */}
      <header className="text-center mb-0 flex-shrink-0 relative">
        {/* Vintage Red Rubber Stamp on Top Corner */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playStampThud();
          }}
          className="absolute top-1 right-2 hidden sm:block rubber-stamp text-[9px] cursor-pointer"
          title="Click to verify stamp"
        >
          <span>✓ VERIFIED DISPATCH</span>
        </div>

        <div className="flex items-center justify-between font-body uppercase tracking-[0.18em] text-ink-muted pb-0.5"
          style={{ fontSize: '7.5px', borderBottom: '0.5px solid rgba(26,22,21,0.25)' }}>
          <span>{profile.location}</span>
          <span className="hidden md:inline font-typewriter tracking-[0.25em]" style={{ fontSize: '6.5px' }}>★ THE LEADING DAILY OF THE CODING REPUBLIC ★</span>
          <span>EST. MMVIII</span>
        </div>
        <div className="rule-double my-0.5" style={{ height: '2px' }} />
        <h1 className="font-masthead ink-bleed uppercase leading-none py-0.5" style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)', letterSpacing: '0.05em' }}>
          The Git Times
        </h1>
        <p className="font-headline italic text-ink-sepia -mt-0.5 mb-0.5 font-semibold" style={{ fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)', letterSpacing: '0.12em' }}>
          "All the Commits Fit to Print"
        </p>
        <div className="rule-double my-0.5" style={{ height: '2px' }} />
        <div className="py-0.5 flex flex-wrap items-center justify-between font-typewriter uppercase tracking-[0.08em] text-ink font-bold"
          style={{ fontSize: '7.5px', borderBottom: '1.5px solid #1a1615' }}>
          <span>VOL. {profile.volumeNo}, NO. {profile.issueNo}</span>
          <span className="flex items-center gap-1"><span style={{ fontSize: '4.5px' }}>✦</span> PRICE: TWO PULL REQUESTS <span style={{ fontSize: '4.5px' }}>✦</span></span>
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
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-headline italic font-semibold text-ink-muted" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.78rem)' }}>
            {profile.subHeadline}
          </h3>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); audioEngine.playPaperRustle(); }}
            className="font-typewriter text-ink hover:text-amber-900 font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
            style={{ fontSize: '8px' }}
            title={`View @${profile.username} on GitHub`}
          >
            <span>@{profile.username}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
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
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-3 py-1 bg-amber-950 text-amber-100 font-typewriter text-xs uppercase font-bold rounded">
                  Open Official GitHub Profile ↗
                </a>
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

        {/* ━━━━━━━━ COLUMN 2: Stats + Contributions Grid + Markets ━━━━━━━━ */}
        <div className="flex flex-col gap-1.5 px-2 min-h-0">
          {/* Real Stats Manifesto with Direct GitHub Links */}
          <section className="newspaper-clipping flex-shrink-0" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.15)' }}>
            <div className="flex items-center justify-between mb-1 pb-0.5" style={{ borderBottom: '0.5px solid rgba(26,22,21,0.2)' }}>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-ink-muted flex-shrink-0" />
                <h4 className="font-typewriter font-bold uppercase tracking-[0.1em] text-ink" style={{ fontSize: '8px' }}>
                  Gazette Bulletin · Real GitHub Telemetry
                </h4>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="font-typewriter text-[7.5px] uppercase font-bold text-ink-muted hover:text-ink hover:underline flex items-center gap-0.5"
              >
                <span>Profile</span>
                <ExternalLink className="w-2 h-2" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-0 font-typewriter" style={{ fontSize: '9px' }}>
              {/* Repos Link */}
              <a
                href={reposUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="text-center py-1 hover:bg-amber-100/30 transition-colors cursor-pointer"
                style={{ borderRight: '0.5px solid rgba(26,22,21,0.1)', borderBottom: '0.5px solid rgba(26,22,21,0.1)' }}
                title="View All Repositories on GitHub"
              >
                <div className="flex justify-center text-ink-muted mb-0.5"><Hash className="w-2.5 h-2.5" /></div>
                <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>Repos ↗</div>
                <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '13px' }}>{profile.statsManifest.totalRepos}</div>
              </a>

              {/* Stars Link */}
              <a
                href={reposUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="text-center py-1 hover:bg-amber-100/30 transition-colors cursor-pointer"
                style={{ borderRight: '0.5px solid rgba(26,22,21,0.1)', borderBottom: '0.5px solid rgba(26,22,21,0.1)' }}
                title="View Starred Repositories"
              >
                <div className="flex justify-center text-ink-muted mb-0.5"><Star className="w-2.5 h-2.5 text-amber-800" /></div>
                <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>Stars ↗</div>
                <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '13px' }}>{profile.statsManifest.totalStars.toLocaleString()}</div>
              </a>

              {/* Followers Link */}
              <a
                href={followersUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="text-center py-1 hover:bg-amber-100/30 transition-colors cursor-pointer"
                style={{ borderRight: '0.5px solid rgba(26,22,21,0.1)', borderBottom: '0.5px solid rgba(26,22,21,0.1)' }}
                title="View Followers on GitHub"
              >
                <div className="flex justify-center text-ink-muted mb-0.5"><Users className="w-2.5 h-2.5" /></div>
                <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>Followers ↗</div>
                <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '13px' }}>{profile.statsManifest.totalFollowers.toLocaleString()}</div>
              </a>

              {/* Following Link */}
              <a
                href={followingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="text-center py-1 hover:bg-amber-100/30 transition-colors cursor-pointer"
                style={{ borderRight: '0.5px solid rgba(26,22,21,0.1)' }}
                title="View Following on GitHub"
              >
                <div className="flex justify-center text-ink-muted mb-0.5"><Users className="w-2.5 h-2.5 text-amber-900" /></div>
                <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>Following ↗</div>
                <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '13px' }}>{profile.statsManifest.totalFollowing ?? 0}</div>
              </a>

              {/* PRs Link */}
              <a
                href={prsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playPaperRustle()}
                className="text-center py-1 hover:bg-amber-100/30 transition-colors cursor-pointer"
                title="View Pull Requests on GitHub"
              >
                <div className="flex justify-center text-ink-muted mb-0.5"><UserCheck className="w-2.5 h-2.5" /></div>
                <div className="uppercase text-ink-muted tracking-wider font-bold" style={{ fontSize: '7px' }}>PRs ↗</div>
                <div className="font-extrabold text-ink ink-bleed leading-none mt-0.5" style={{ fontSize: '13px' }}>{profile.statsManifest.pullRequestsMerged.toLocaleString()}</div>
              </a>
            </div>
          </section>

          {/* ══════ COMPACT CONTRIBUTION CLIPPING (CLICK TO EXPAND IN LIGHTBOX) ══════ */}
          {profile.contributionsGrid && profile.contributionsGrid.length > 0 && (
            <div
              onClick={() =>
                handleClickClipping(
                  `Annual Contribution Activity Gazette — @${profile.username}`,
                  '52-Week Telemetry Record',
                  <ContributionsGrid contributions={profile.contributionsGrid!} username={profile.username} />
                )
              }
              className="newspaper-clipping p-1.5 flex-shrink-0 cursor-pointer hover:bg-amber-100/20 transition-all"
              style={{ background: 'rgba(230,215,188,0.18)', border: '0.5px solid rgba(26,22,21,0.18)' }}
              title="Click to expand full 52-week contribution heat map"
            >
              <div className="flex items-center justify-between mb-1 pb-0.5 border-b border-ink/20 font-typewriter">
                <h4 className="text-[8px] font-bold uppercase tracking-[0.1em] text-ink flex items-center gap-1">
                  <Activity className="w-3 h-3 text-ink-muted flex-shrink-0" />
                  <span>Contribution Heatmap · 52 Weeks</span>
                </h4>
                <span className="text-[7.5px] text-amber-900 font-bold uppercase hover:underline">Expand 🔍</span>
              </div>

              {/* Compact Mini Heatmap Ribbon */}
              <div className="flex gap-[1.5px] justify-between items-center py-1 overflow-hidden">
                {profile.contributionsGrid.filter((_, idx) => idx % 7 === 0).slice(-36).map((day, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-3.5 rounded-[0.5px]"
                    style={{
                      backgroundColor:
                        day.level === 4 ? '#3a2208' :
                        day.level === 3 ? '#6a4a1c' :
                        day.level === 2 ? '#9a743a' :
                        day.level === 1 ? '#cda86c' : 'rgba(180, 150, 110, 0.25)',
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[7.5px] font-typewriter text-ink-muted pt-0.5 border-t border-ink/10">
                <span className="font-bold text-ink">{profile.statsManifest.totalCommitsYear.toLocaleString()} commits this year</span>
                <span className="italic text-ink-sepia">Click to inspect full map →</span>
              </div>
            </div>
          )}

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

          {/* Classifieds Strip with Wax Seal */}
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
            className="newspaper-clipping flex-1 min-h-0 overflow-hidden relative"
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

            {/* 3D Wax Seal Emblem */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                audioEngine.playStampThud();
              }}
              className="wax-seal absolute bottom-1 right-2 hidden sm:flex items-center justify-center text-center select-none"
              title="Official Gazette Wax Seal (Click for stamp thud)"
            >
              <div className="text-[7px] font-masthead text-amber-200 uppercase leading-none tracking-tighter">
                <span>GIT</span>
                <span className="block font-sans text-[5px] text-amber-300/80">★ MMVIII ★</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
