/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { STADIUMS } from '../data/worldCupData';
import { MapPin, Users, Award, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import TeamFlag from './TeamFlag';

export default function StadiumsView() {
  const [selectedCountryTab, setSelectedCountryTab] = useState<'all' | 'USA' | 'Canada' | 'Mexico'>('all');

  // Filter stadiums based on selected country
  const filteredStadiums = STADIUMS.filter(
    s => selectedCountryTab === 'all' || s.country === selectedCountryTab
  );

  return (
    <div id="stadiums-explore-root" className="space-y-8">
      {/* Dynamic Selector Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex flex-col gap-2">
          <div className="h-1 w-12 bg-fifa-blue" />
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
            OFFICIAL <span className="text-fifa-blue">VENUES</span>
          </h2>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
            16 Architectural Icons • 3 Host Nations • 104 Matches
          </p>
        </div>

        {/* Filter buttons - Official Style */}
        <div className="flex bg-white/5 p-1 border border-white/10">
          {[
            { id: 'all', label: 'All Arenas' },
            { id: 'USA', label: 'USA', iso2: 'us' },
            { id: 'Mexico', label: 'Mexico', iso2: 'mx' },
            { id: 'Canada', label: 'Canada', iso2: 'ca' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCountryTab(tab.id as any)}
              className={`text-[10px] px-6 py-2.5 font-black uppercase tracking-widest cursor-pointer transition-all ${
                selectedCountryTab === tab.id ? 'bg-fifa-blue text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                 {tab.iso2 && <TeamFlag iso2={tab.iso2} name={tab.label} size="xs" className="rounded-none h-2.5 w-4" />}
                 {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stadium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredStadiums.map((stadium, sIdx) => {
          return (
            <motion.div
              layout
              id={`stadium-card-${sIdx}`}
              key={stadium.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sIdx * 0.05 }}
              className="fifa-card group flex flex-col"
            >
              {/* Textured Gradient Visual */}
              <div className={`w-full h-32 flex flex-col justify-end p-4 relative overflow-hidden bg-gradient-to-tr ${stadium.imageGridClass}`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 opacity-10 border border-white m-3 rounded-none pointer-events-none" />
                
                {/* Official Info Overlays */}
                <div className="flex items-center gap-2 self-start px-2 py-1 bg-black text-[9px] font-black text-white border border-white/10 relative z-10 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-fifa-blue" />
                  {stadium.capacity} Total Slots
                </div>
              </div>

              {/* Info stacks */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-fifa-blue uppercase tracking-[0.2em]">{stadium.country}</span>
                  <h3 className="text-lg font-black text-white group-hover:text-fifa-blue transition-colors leading-tight uppercase tracking-tighter">
                    {stadium.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                    <MapPin className="h-3 w-3 text-fifa-magenta" />
                    {stadium.city}
                  </div>
                </div>

                <p className="text-[11px] text-white/50 leading-relaxed font-medium uppercase tracking-wider">
                  {stadium.description}
                </p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 uppercase font-black">Official Tier</span>
                      <span className="text-[10px] text-white font-black uppercase">Category 1 Arena</span>
                   </div>
                   <Award className="h-4 w-4 text-white/20" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
