/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Match, Team } from '../types';
import { TEAMS } from '../data/worldCupData';
import MatchCard from './MatchCard';
import { Search, Info, X, Star, Calendar, Bookmark, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TeamFlag from './TeamFlag';

interface MatchesSectionProps {
  matches: Match[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onUpdateScore: (id: number, score1: number | null, score2: number | null) => void;
}

type FilterType = 'all' | 'favorites' | 'byGroup' | 'knockout';

export default function MatchesSection({
  matches,
  favorites,
  onToggleFavorite,
  onUpdateScore,
}: MatchesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
  const [selectedCountryHost, setSelectedCountryHost] = useState<'all' | 'USA' | 'Canada' | 'Mexico'>('all');

  const groupsList = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  // Clear all filters easily
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setSelectedGroupFilter('all');
    setSelectedCountryHost('all');
  };

  // Filter logic runs reactively
  const filteredMatches = matches.filter(m => {
    // 1. Search filter Query (matches country name, initials, city, or stadium)
    const t1 = TEAMS[m.team1]?.name.toLowerCase() || m.team1.toLowerCase();
    const t2 = TEAMS[m.team2]?.name.toLowerCase() || m.team2.toLowerCase();
    const city = m.city.toLowerCase();
    const venue = m.venue.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = 
      t1.includes(query) || 
      t2.includes(query) || 
      m.team1.toLowerCase().includes(query) || 
      m.team2.toLowerCase().includes(query) ||
      city.includes(query) || 
      venue.includes(query);

    if (!matchesSearch) return false;

    // 2. Tab Filter
    if (activeTab === 'favorites') {
      if (!favorites.includes(m.id)) return false;
    } else if (activeTab === 'knockout') {
      if (m.round === 'Group') return false;
    } else if (activeTab === 'byGroup') {
      if (m.round !== 'Group') return false;
      if (selectedGroupFilter !== 'all' && m.group !== selectedGroupFilter) return false;
    }

    // 3. Country Host Filter
    if (selectedCountryHost !== 'all' && m.country !== selectedCountryHost) return false;

    return true;
  });

  return (
    <div id="matches-section-root" className="space-y-6">
      {/* Search and Filters Hub */}
      <div className="bg-fifa-dark border border-white/10 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fifa-blue/5 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Main search text input */}
          <div className="md:col-span-12 lg:col-span-4 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/40 group-focus-within:text-fifa-blue transition-colors" />
            <input
              id="match-search-input"
              type="text"
              placeholder="SEARCH TEAMS, CITIES, STADIUMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-black border border-white/10 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-fifa-blue transition-all placeholder-white/20 uppercase"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Core filters (Official Style Tabs) */}
          <div className="md:col-span-12 lg:col-span-8 flex flex-wrap gap-2 justify-start lg:justify-end">
            {[
              { id: 'all', label: 'All Matches' },
              { id: 'favorites', label: 'My Hub', icon: Star },
              { id: 'byGroup', label: 'Group Phase' },
              { id: 'knockout', label: 'Final Series' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as FilterType); if(tab.id !== 'byGroup') setSelectedGroupFilter('all'); }}
                className={`text-[10px] px-5 py-3 font-black uppercase tracking-[0.2em] transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-fifa-blue border-fifa-blue text-black'
                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2">
                   {tab.id === 'favorites' && <Star className="h-3 w-3 fill-current" />}
                   {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Inner filters for Groups or Hosts */}
        {(activeTab === 'byGroup' || selectedCountryHost !== 'all') && (
          <div className="mt-6 pt-6 border-t border-white/5 animate-fadeIn">
            <div className="flex flex-col gap-6">
              
              {/* Group selection filters inside Group Tab */}
              {activeTab === 'byGroup' && (
                <div className="flex flex-col gap-3">
                  <span className="text-white/40 font-black uppercase tracking-[0.3em] text-[9px]">Select Group Pool:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {groupsList.map(gChar => (
                      <button
                        id={`group-filter-btn-${gChar}`}
                        key={gChar}
                        onClick={() => setSelectedGroupFilter(gChar)}
                        className={`w-10 h-10 flex items-center justify-center font-black transition-all cursor-pointer border ${
                          selectedGroupFilter === gChar
                            ? 'bg-fifa-blue border-fifa-blue text-black'
                            : 'bg-black text-white/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {gChar === 'all' ? '●' : gChar}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Host boundaries filter */}
              <div className="flex flex-col gap-3">
                <span className="text-white/40 font-black uppercase tracking-[0.3em] text-[9px]">Official Host Regions:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Territories' },
                    { id: 'USA', label: 'USA', iso2: 'us' },
                    { id: 'Mexico', label: 'Mexico', iso2: 'mx' },
                    { id: 'Canada', label: 'Canada', iso2: 'ca' }
                  ].map(cntry => (
                    <button
                      id={`country-host-filter-btn-${cntry.id}`}
                      key={cntry.id}
                      onClick={() => setSelectedCountryHost(cntry.id as any)}
                      className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer flex items-center gap-2 ${
                        selectedCountryHost === cntry.id
                          ? 'bg-fifa-magenta border-fifa-magenta text-black shadow-[0_0_15px_rgba(255,0,122,0.3)]'
                          : 'bg-black text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {cntry.iso2 && <TeamFlag iso2={cntry.iso2} name={cntry.label} size="xs" className="rounded-none h-2 w-3.5" />}
                      {cntry.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Grid displays Matches */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredMatches.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredMatches.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  isFavorite={favorites.includes(m.id)}
                  onToggleFavorite={onToggleFavorite}
                  onUpdateScore={onUpdateScore}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl text-center bg-slate-950/20"
            >
              <Info className="h-8 w-8 text-slate-500 mb-3" />
              <p className="text-slate-350 font-bold mb-1">No Matches Found</p>
              <p className="text-xs text-slate-550 max-w-sm">
                No games matched your current queries. Try adjusting group selections or clear spelling words.
              </p>
              <button
                id="reset-all-filters-btn"
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:border-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
