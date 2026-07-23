import React from 'react';
import type { PopularRepo } from '../data/mockProfiles';
import { Star, GitFork, ExternalLink, Code2, FolderGit2 } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface PopularReposProps {
  repos?: PopularRepo[];
  username: string;
}

export const PopularRepos: React.FC<PopularReposProps> = ({ repos, username }) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="w-full font-typewriter select-text">
      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-ink/30">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink flex items-center gap-1.5">
          <FolderGit2 className="w-3.5 h-3.5 text-ink-muted" />
          <span>Popular Repositories & Software Archives · @{username}</span>
        </h4>
        <span className="text-[8px] text-ink-muted uppercase">Public Dispatch</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {repos.map((repo) => (
          <div
            key={repo.name}
            className="p-2 flex flex-col justify-between transition-all hover:bg-amber-100/30 border border-ink/20"
            style={{ background: 'rgba(230,215,188,0.25)' }}
          >
            <div>
              {/* Header: Title + Stars */}
              <div className="flex items-start justify-between gap-1 mb-1">
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playPaperRustle()}
                  className="font-extrabold text-[11px] text-ink hover:text-amber-900 underline decoration-ink/40 underline-offset-2 flex items-center gap-1 leading-snug"
                  title={`View ${repo.name} on GitHub`}
                >
                  <Code2 className="w-3 h-3 text-ink-muted flex-shrink-0" />
                  <span>{repo.name}</span>
                </a>

                <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-ink-muted flex-shrink-0">
                  <Star className="w-2.5 h-2.5 text-amber-700 fill-amber-700" />
                  <span>{repo.stars.toLocaleString()}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-serif italic text-[10px] text-ink-muted leading-tight mb-2 line-clamp-2">
                "{repo.description}"
              </p>
            </div>

            {/* Footer: Language + Forks + Open Project CTA Buttons */}
            <div className="pt-1 border-t border-ink/15 flex items-center justify-between text-[8px] text-ink-muted">
              <div className="flex items-center gap-2 font-bold">
                <span className="px-1 py-0.5 border border-ink/30 bg-amber-950/10 text-ink">
                  {repo.language}
                </span>
                <span className="flex items-center gap-0.5">
                  <GitFork className="w-2.5 h-2.5" />
                  {repo.forks}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                {repo.homepage && (
                  <a
                    href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioEngine.playPaperRustle()}
                    className="px-1.5 py-0.5 bg-amber-950 text-amber-100 hover:bg-amber-900 font-bold uppercase tracking-wider flex items-center gap-1 rounded-[2px] transition-transform hover:scale-105 active:scale-95 shadow-sm"
                    title="Launch Live Application / Homepage"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playPaperRustle()}
                  className="px-1.5 py-0.5 border border-ink/40 text-ink hover:bg-amber-900/10 font-bold uppercase tracking-wider flex items-center gap-1 rounded-[2px]"
                  title="Open GitHub Repository Code"
                >
                  <span>Code</span>
                  <ExternalLink className="w-2.5 h-2.5 text-ink-muted" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
