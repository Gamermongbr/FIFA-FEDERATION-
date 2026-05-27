/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Match, Team } from '../types';
import { TEAMS } from '../data/worldCupData';
import { Calendar, Trophy, Zap, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { formatIST } from '../utils/dateUtils';
import TeamFlag from './TeamFlag';

interface KnockoutBracketProps {
  matches: Match[];
  onUpdateScore: (id: number, score1: number | null, score2: number | null) => void;
}

export default function KnockoutBracket({ matches, onUpdateScore }: KnockoutBracketProps) {
  const [activeStageTab, setActiveStageTab] = useState<'r32' | 'r16' | 'qf' | 'sf_f'>('r16');

  // Filter matches based on rounds
  const roundOf32 = matches.filter(m => m.round === 'Round of 32');
  const roundOf16 = matches.filter(m => m.round === 'Round of 16');
  const quarterFinals = matches.filter(m => m.round === 'Quarter-finals');
  const finalStages = matches.filter(
    m => m.round === 'Semi-finals' || m.round === 'Third place' || m.round === 'Final'
  );

  const renderBracketTeam = (teamCode: string, score: number | null | undefined, isWinner: boolean) => {
    const isRealTeam = teamCode.length === 3;
    const team: Team | undefined = isRealTeam ? TEAMS[teamCode] : undefined;

    return (
      <div
        className={`flex items-center justify-between p-2 rounded-xl transition-all ${
          isWinner 
            ? 'bg-rose-500/10 text-slate-100 border border-rose-500/20' 
            : 'bg-slate-950/40 text-slate-400 border border-transparent'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {team ? (
            <>
              <TeamFlag iso2={team.iso2} name={team.name} size="xs" className="shrink-0" />
              <span className="font-bold text-[10px] uppercase tracking-tight truncate">{team.name}</span>
            </>
          ) : (
            <span className="text-[10px] font-mono lowercase italic text-slate-500 pl-1">{teamCode}</span>
          )}
        </div>
        
        <div className="flex items-center justify-center font-mono font-black text-[10px] px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 min-w-8 text-center ml-2">
          {score !== undefined && score !== null ? score : '-'}
        </div>
      </div>
    );
  };

  const renderBracketCard = (m: Match) => {
    const score1 = m.team1Score;
    const score2 = m.team2Score;
    const hasResult = score1 !== undefined && score1 !== null && score2 !== undefined && score2 !== null;
    const team1Winner = hasResult && score1! > score2!;
    const team2Winner = hasResult && score2! > score1!;
    
    const ist = formatIST(m.date);

    return (
      <div
        key={m.id}
        className="w-full relative group rounded-2xl border border-slate-800 bg-slate-900/40 p-3.5 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 shadow-md backdrop-blur-md"
      >
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-2.5 border-b border-slate-850 pb-2">
          <div className="flex items-center gap-1.5">
             <span className="text-[9px] uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded text-slate-350">M-{m.id}</span>
             {m.isLive && <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />}
          </div>
          <span className="font-mono text-emerald-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {ist.time} IST
          </span>
        </div>

        <div className="flex flex-col space-y-1.5 mb-2">
          {renderBracketTeam(m.team1, score1, team1Winner)}
          {renderBracketTeam(m.team2, score2, team2Winner)}
        </div>

        <div className="mt-3.5 pt-2.5 border-t border-slate-850 flex items-center justify-between gap-1.5 text-[9px]">
          <span className="text-slate-500 font-medium truncate flex items-center gap-1">
            {ist.date}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <input
              type="number"
              min="0"
              placeholder="-"
              value={score1 ?? ''}
              onChange={(e) => {
                const s1 = e.target.value === '' ? null : parseInt(e.target.value, 10);
                onUpdateScore(m.id, s1, score2 ?? null);
              }}
              className="w-7 h-5 text-center text-[9px] font-bold rounded bg-slate-950 border border-slate-800 text-slate-350 focus:border-rose-500 outline-none"
            />
            <span className="text-slate-700">:</span>
            <input
              type="number"
              min="0"
              placeholder="-"
              value={score2 ?? ''}
              onChange={(e) => {
                const s2 = e.target.value === '' ? null : parseInt(e.target.value, 10);
                onUpdateScore(m.id, score1 ?? null, s2);
              }}
              className="w-7 h-5 text-center text-[9px] font-bold rounded bg-slate-950 border border-slate-800 text-slate-350 focus:border-rose-500 outline-none"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="bracket-root" className="space-y-6">
      {/* Mini Title header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-slate-100 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Interactive Knockout Tree
          </h2>
          <p className="text-xs text-slate-500">
            Explore the final stages. Fill scores directly to advance qualifiers. All times matches are set in IST.
          </p>
        </div>

        {/* Horizontal tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-900 p-1 border border-slate-800/80 rounded-xl">
          <button
            id="tab-r32"
            onClick={() => setActiveStageTab('r32')}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              activeStageTab === 'r32' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Round of 32
          </button>
          <button
            id="tab-r16"
            onClick={() => setActiveStageTab('r16')}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              activeStageTab === 'r16' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Round of 16
          </button>
          <button
            id="tab-qf"
            onClick={() => setActiveStageTab('qf')}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              activeStageTab === 'qf' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Quarter Finals
          </button>
          <button
            id="tab-sf_f"
            onClick={() => setActiveStageTab('sf_f')}
            className={`text-xs px-2.5 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
              activeStageTab === 'sf_f' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Semis & Final
          </button>
        </div>
      </div>

      {/* Grid rendering based on Stage tab */}
      <div>
        {activeStageTab === 'r32' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roundOf32.map(renderBracketCard)}
          </div>
        )}

        {activeStageTab === 'r16' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roundOf16.map(renderBracketCard)}
          </div>
        )}

        {activeStageTab === 'qf' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quarterFinals.map(renderBracketCard)}
          </div>
        )}

        {activeStageTab === 'sf_f' && (
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Semifinals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {finalStages.filter(m => m.round === 'Semi-finals').map(renderBracketCard)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">Third Place Playoff</h3>
                {finalStages.filter(m => m.round === 'Third place').map(renderBracketCard)}
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 animate-pulse" /> Final Championship
                </h3>
                {finalStages.filter(m => m.round === 'Final').map(renderBracketCard)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
