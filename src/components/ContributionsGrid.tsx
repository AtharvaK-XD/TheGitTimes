import React from 'react';
import type { ContributionDay } from '../data/mockProfiles';

interface ContributionsGridProps {
  contributions: ContributionDay[];
  username: string;
}

export const ContributionsGrid: React.FC<ContributionsGridProps> = ({ contributions, username }) => {
  if (!contributions || contributions.length === 0) return null;

  // Group 364/365 contribution days into 52 weeks (7 days per week: Sun=0 to Sat=6)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate Month labels across 52 weeks
  const monthLabels: Array<{ label: string; weekIndex: number }> = [];
  let lastMonth = '';
  weeks.forEach((w, wIdx) => {
    const firstDayInWeek = w[0];
    if (firstDayInWeek && firstDayInWeek.date) {
      const d = new Date(firstDayInWeek.date);
      const mName = d.toLocaleDateString('en-US', { month: 'short' });
      if (mName !== lastMonth && wIdx % 4 === 0) {
        monthLabels.push({ label: mName, weekIndex: wIdx });
        lastMonth = mName;
      }
    }
  });

  // Newsprint Sepia Ink Color Map
  const getSepiaColor = (level: number) => {
    switch (level) {
      case 1:
        return '#cda86c'; // Warm Sepia Gold
      case 2:
        return '#9a743a'; // Vintage Aged Bronze
      case 3:
        return '#6a4a1c'; // Deep Oak Ink
      case 4:
        return '#3a2208'; // Victorian Dark Black Ink
      case 0:
      default:
        return 'rgba(180, 150, 110, 0.22)'; // Faint Paper Mesh
    }
  };

  return (
    <div className="w-full font-typewriter select-text p-2" style={{ background: 'rgba(230,215,188,0.2)', border: '0.5px solid rgba(26,22,21,0.2)' }}>
      <div className="flex items-center justify-between mb-1 pb-1 border-b border-ink/20">
        <h4 className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink flex items-center gap-1.5">
          <span>★</span>
          <span>Annual Contribution Activity Gazette · @{username}</span>
        </h4>
        <span className="text-[8px] text-ink-muted uppercase">52 Weeks Record</span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <div className="inline-block min-w-full">
          {/* Month Header Row */}
          <div className="flex text-[7px] text-ink-muted uppercase tracking-wider mb-1 ml-5">
            {monthLabels.map((m, i) => (
              <span key={i} className="flex-1 text-left font-bold" style={{ marginLeft: `${m.weekIndex * 2}px` }}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid: 7 Rows for Days of Week */}
          <div className="flex gap-1 items-start">
            {/* Day Labels Column */}
            <div className="flex flex-col justify-between h-[66px] text-[7px] text-ink-muted font-bold pr-1 select-none">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* 52 Weeks Grid Columns */}
            <div className="flex gap-[2px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="w-[9px] h-[9px] rounded-[1px] transition-transform duration-150 hover:scale-125 hover:z-20 cursor-pointer relative group"
                      style={{
                        backgroundColor: getSepiaColor(day.level),
                        border: day.level === 0 ? '0.5px solid rgba(80, 50, 20, 0.18)' : 'none',
                        boxShadow: day.level > 0 ? 'inset 0 0 2px rgba(0,0,0,0.3)' : 'none',
                      }}
                      title={`${day.count} contributions on ${day.date}`}
                    >
                      {/* Native Tooltip Popover on Hover */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-amber-950 text-amber-100 text-[9px] whitespace-nowrap rounded shadow-xl pointer-events-none z-50 font-typewriter border border-amber-800">
                        {day.count} commits on {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Footer Legend */}
      <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-ink/15 text-[8px] text-ink-muted">
        <span>Daily Commit Density Heatmap</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <span
              key={lvl}
              className="w-2.5 h-2.5 rounded-[1px] inline-block"
              style={{
                backgroundColor: getSepiaColor(lvl),
                border: lvl === 0 ? '0.5px solid rgba(80,50,20,0.2)' : 'none',
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
