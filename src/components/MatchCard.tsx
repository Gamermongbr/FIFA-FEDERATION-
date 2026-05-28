/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ChangeEvent } from 'react';
import { Match, Team } from '../types';
import { TEAMS } from '../data/worldCupData';
import { Star, MapPin, Calendar, Clock, Trophy, Zap, CalendarPlus, Check, Loader2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { formatIST } from '../utils/dateUtils';
import TeamFlag from './TeamFlag';
import { addMatchToCalendar, getGoogleCalendarIntentUrl } from '../lib/calendar';
import { getAccessToken } from '../lib/firebase';

interface MatchCardProps {
  key?: number;
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onUpdateScore: (id: number, score1: number | null, score2: number | null) => void;
}

export default function MatchCard({
  match,
  isFavorite,
  onToggleFavorite,
  onUpdateScore,
}: MatchCardProps) {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [syncUrl, setSyncUrl] = React.useState<string | null>(null);
  const [isScheduled, setIsScheduled] = React.useState(false);

  React.useEffect(() => {
    const scheduled = localStorage.getItem(`match_scheduled_${match.id}`);
    if (scheduled) {
      setSyncUrl(scheduled);
      setIsScheduled(true);
    }
  }, [match.id]);

  const team1Info: Team | undefined = TEAMS[match.team1];
  const team2Info: Team | undefined = TEAMS[match.team2];
  
  const ist = formatIST(match.date);

  const handleSyncToCalendar = async () => {
    const token = await getAccessToken();
    if (!token) {
      // Fallback to manual intent URL if not signed in or OAuth is blocked
      const intentUrl = getGoogleCalendarIntentUrl(match);
      window.open(intentUrl, '_blank');
      setSyncUrl(intentUrl);
      setIsScheduled(true);
      localStorage.setItem(`match_scheduled_${match.id}`, intentUrl);
      return;
    }

    setIsSyncing(true);
    try {
      const url = await addMatchToCalendar(match);
      setSyncUrl(url);
      setIsScheduled(true);
      localStorage.setItem(`match_scheduled_${match.id}`, url);
    } catch (err: any) {
      console.error(err);
      // Fallback on error if API fails (e.g., origin blocked on Vercel)
      const intentUrl = getGoogleCalendarIntentUrl(match);
      window.open(intentUrl, '_blank');
      setSyncUrl(intentUrl);
      setIsScheduled(true);
      localStorage.setItem(`match_scheduled_${match.id}`, intentUrl);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleScore1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
    if (val === null || (!isNaN(val) && val >= 0)) {
      onUpdateScore(match.id, val, match.team2Score ?? null);
    }
  };

  const handleScore2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
    if (val === null || (!isNaN(val) && val >= 0)) {
      onUpdateScore(match.id, match.team1Score ?? null, val);
    }
  };

  return (
    <motion.div
      id={`match-card-${match.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fifa-card min-w-[320px] ${
        isFavorite ? 'border-fifa-blue/50 ring-1 ring-fifa-blue/20' : ''
      }`}
    >
      {/* Visual Accent Bar */}
      <div className={`h-1 w-full ${match.group ? 'bg-fifa-blue' : 'bg-fifa-magenta'}`} />

      {/* Top Meta */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black font-mono text-white/40 uppercase tracking-[0.2em]">
            Match {match.id} • {match.round}
          </span>
          {match.group && (
            <span className="text-[10px] font-black text-fifa-blue border border-fifa-blue/20 px-2 py-0.5 uppercase tracking-widest">
              Group {match.group}
            </span>
          )}
        </div>
        <button
          onClick={() => onToggleFavorite(match.id)}
          className={`transition-all ${
            isFavorite ? 'text-fifa-blue' : 'text-white/20 hover:text-white/60'
          }`}
        >
          <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Teams Grid - Heavy Broadcast Style */}
      <div className="px-5 py-6 flex items-center gap-4 bg-white/5 mx-2 my-1">
        <div className="flex-1 flex flex-col items-center gap-3">
          <TeamFlag iso2={team1Info?.iso2} name={team1Info?.name || match.team1} size="lg" />
          <span className="font-black text-white text-xs uppercase tracking-tighter text-center">
            {team1Info?.name || match.team1}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={match.team1Score ?? ''}
              onChange={handleScore1Change}
              placeholder="-"
              className="w-12 h-12 text-center font-black text-2xl bg-black border border-white/10 text-white outline-none focus:border-fifa-blue transition-colors rounded-none"
            />
            <span className="text-white/20 font-black px-1">:</span>
            <input
              type="number"
              value={match.team2Score ?? ''}
              onChange={handleScore2Change}
              placeholder="-"
              className="w-12 h-12 text-center font-black text-2xl bg-black border border-white/10 text-white outline-none focus:border-fifa-blue transition-colors rounded-none"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-3">
          <TeamFlag iso2={team2Info?.iso2} name={team2Info?.name || match.team2} size="lg" />
          <span className="font-black text-white text-xs uppercase tracking-tighter text-center">
            {team2Info?.name || match.team2}
          </span>
        </div>
      </div>

      {/* Footer Info (IST Focused) */}
      <div className="px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Kickoff IST</span>
            <span className="text-lg font-black text-fifa-blue leading-tight tracking-tighter">{ist.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {isScheduled ? (
              <a 
                href={syncUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
              >
                <Check className="h-3 w-3" />
                Scheduled
              </a>
            ) : (
              <button
                onClick={handleSyncToCalendar}
                disabled={isSyncing}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 hover:text-fifa-blue hover:border-fifa-blue/30 text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {isSyncing ? <Loader2 className="h-3 w-3 animate-spin" /> : <CalendarPlus className="h-3 w-3" />}
                Add to Cal
              </button>
            )}
            <div className="text-right flex flex-col ml-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Official Date</span>
              <span className="text-sm font-bold text-white/80 leading-tight tracking-tight uppercase">{ist.date}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest pt-2 border-t border-white/5">
          <MapPin className="h-3 w-3 text-fifa-magenta" />
          {match.venue} • {match.city}
        </div>
      </div>

      {match.isLive && (
        <div className="bg-fifa-magenta text-black text-[10px] font-black px-4 py-1 text-center uppercase tracking-[0.2em] animate-pulse">
           Live Match Center Data Active
        </div>
      )}
    </motion.div>
  );
}
