/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Match, GroupStanding } from '../types';
import { TEAMS } from '../data/worldCupData';
import { calculateGroupStandings } from '../utils/standings';
import { Award, Eye, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TeamFlag from './TeamFlag';

interface GroupStandingsViewProps {
  matches: Match[];
}

export default function GroupStandingsView({ matches }: GroupStandingsViewProps) {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const [viewMode, setViewMode] = useState<'grid' | 'focus'>('grid');
  const [selectedGroup, setSelectedGroup] = useState<string>('A');

  // Multi-grid calculation or single focus calculation
  const getStandingsData = (g: string) => {
    return calculateGroupStandings(g, matches);
  };

  const renderGroupTable = (gLetter: string, size: 'compact' | 'full' = 'compact') => {
    const standings = getStandingsData(gLetter);

    return (
      <div 
        id={`group-${gLetter}-table`} 
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-md backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/70" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pl-2.5">
          <span className="font-bold text-slate-100 uppercase tracking-tight text-sm">
            Group {gLetter}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">
            Standings
          </span>
        </div>

        {/* Column labels */}
        <div className="grid grid-cols-12 gap-1 text-[10px] uppercase font-mono font-bold text-slate-500 pb-1.5 border-b border-slate-800/80 px-2 text-center">
          <div className="col-span-1 text-left">#</div>
          <div className="col-span-4 text-left">Team</div>
          <div className="col-span-1.5">P</div>
          <div className="col-span-1.5">W</div>
          <div className="col-span-1.5">D</div>
          <div className="col-span-1.5">L</div>
          <div className="col-span-2">GD</div>
          <div className="col-span-1.5 text-right font-black text-amber-500">Pts</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col space-y-1 pt-1.5">
          {standings.map((standing, index) => {
            const team = TEAMS[standing.teamCode];
            const isQualified = index < 2; // Top 2 normally qualify directly

            return (
              <div
                key={standing.teamCode}
                className={`grid grid-cols-12 gap-1 items-center py-2 px-2 rounded-lg text-xs leading-none transition-colors ${
                  isQualified 
                    ? 'bg-emerald-950/20 text-slate-200 hover:bg-emerald-950/40' 
                    : 'text-slate-400 hover:bg-slate-800/20'
                }`}
              >
                {/* Pos */}
                <div className={`col-span-1 text-left font-mono font-bold ${isQualified ? 'text-emerald-400' : 'text-slate-550'}`}>
                  {index + 1}
                </div>

                {/* Team Info */}
                <div className="col-span-4 flex items-center gap-2 text-left font-semibold text-slate-100 truncate">
                  <TeamFlag iso2={team?.iso2} name={team?.name || standing.teamCode} size="xs" className="shrink-0" />
                  <span className="truncate">{team?.name || standing.teamCode}</span>
                </div>

                {/* Played */}
                <div className="col-span-1.5 text-center font-mono font-medium">{standing.played}</div>

                {/* Won */}
                <div className="col-span-1.5 text-center font-mono">{standing.won}</div>

                {/* Drawn */}
                <div className="col-span-1.5 text-center font-mono">{standing.drawn}</div>

                {/* Lost */}
                <div className="col-span-1.5 text-center font-mono">{standing.lost}</div>

                {/* GD */}
                <div className={`col-span-2 text-center font-mono font-medium ${
                  standing.goalDifference > 0 
                    ? 'text-emerald-400' 
                    : standing.goalDifference < 0 
                      ? 'text-rose-400' 
                      : 'text-slate-500'
                }`}>
                  {standing.goalDifference > 0 ? `+${standing.goalDifference}` : standing.goalDifference}
                </div>

                {/* Points */}
                <div className={`col-span-1.5 text-right font-mono font-extrabold ${isQualified ? 'text-amber-400' : 'text-slate-300'}`}>
                  {standing.points}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Qualified indicator label */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/40 flex items-center gap-1.5 text-[9px] text-slate-500 pl-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
          Qualified for Round of 32
        </div>
      </div>
    );
  };

  return (
    <div id="group-standings-section" className="space-y-6">
      {/* Control Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-slate-100">
            Group Tables & Standings
          </h2>
          <p className="text-xs text-slate-500">
            Real-time computed standings across all 12 groups. Top 2 advance directly.
          </p>
        </div>

        {/* Toggle Grid vs Focus */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0 self-end">
          <button
            id="view-grid-btn"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            All 12 Groups
          </button>
          <button
            id="view-focus-btn"
            onClick={() => setViewMode('focus')}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'focus'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Focus View
          </button>
        </div>
      </div>

      {/* Focus View Selector */}
      {viewMode === 'focus' && (
        <div className="flex flex-wrap gap-2 pb-2">
          {groups.map(g => (
            <button
              id={`select-group-btn-${g}`}
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                g === selectedGroup
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              Group {g}
            </button>
          ))}
        </div>
      )}

      {/* Tables layout representation */}
      <AnimatePresence mode="wait">
        {viewMode === 'focus' ? (
          <motion.div
            key={`focus-${selectedGroup}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="max-w-xl mx-auto"
          >
            {renderGroupTable(selectedGroup, 'full')}
          </motion.div>
        ) : (
          <motion.div
            key="grid-all"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {groups.map(g => (
              <div key={g} className="transition-all hover:scale-[1.01] hover:-translate-y-0.5 duration-300">
                {renderGroupTable(g, 'compact')}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
