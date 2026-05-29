/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, Compass, ShieldAlert, Award, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  totalMatches: number;
  favoritesCount: number;
  simulatedCount: number;
  onClearPredictions: () => void;
}

export default function HeroSection({
  totalMatches,
  favoritesCount,
  simulatedCount,
  onClearPredictions,
}: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
  });

  useEffect(() => {
    // FIFA World Cup opening match kick-off: June 11, 2026 at 19:00 Mexico local -> 2026-06-12T00:30:00+05:30 (IST)
    const openingDate = new Date('2026-06-12T00:30:00+05:30');

    const updateTimer = () => {
      const now = new Date();
      const difference = openingDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isStarted: true }));
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isStarted: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero-banner" className="relative w-full overflow-hidden bg-black py-12 md:py-20 mb-12 border-b-4 border-fifa-blue">
      {/* Background Poster Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <img 
          src="https://files.catbox.moe/6d0spj.png" 
          alt="World Cup Players" 
          className="w-full h-full object-cover object-top mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Dynamic Color Blooms */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fifa-magenta/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fifa-blue/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6">
        {/* Banner Headers */}
        <div className="lg:col-span-12 flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-1 bg-fifa-blue" />
            <div className="text-left">
              <span className="block text-fifa-blue font-black text-xl tracking-[0.2em] leading-none">WE ARE</span>
              <span className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">26</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase max-w-4xl text-fifa-header">
            OFFICIAL <span className="text-fifa-blue">IST</span> MATCH CENTER
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex flex-col border-l-2 border-fifa-magenta pl-4 transition-transform hover:scale-105">
              <span className="text-3xl font-black text-white font-mono leading-none">104</span>
              <span className="text-xs text-fifa-magenta uppercase tracking-widest font-bold mt-1">Total Matches</span>
            </div>
            <div className="flex flex-col border-l-2 border-fifa-blue pl-4 transition-transform hover:scale-105">
              <span className="text-3xl font-black text-white font-mono leading-none">16</span>
              <span className="text-xs text-fifa-blue uppercase tracking-widest font-bold mt-1">Host Cities</span>
            </div>
            <div className="flex flex-col border-l-2 border-fifa-lime pl-4 transition-transform hover:scale-105">
              <span className="text-3xl font-black text-white font-mono leading-none">{favoritesCount}</span>
              <span className="text-xs text-fifa-lime uppercase tracking-widest font-bold mt-1">Saved Games</span>
            </div>
          </div>
        </div>

        {/* Global IST Sync Timer */}
        <div 
          className="lg:col-span-12 flex flex-col items-center justify-center mt-12 w-full cursor-pointer group"
          onClick={() => setTimeLeft(prev => ({ ...prev, isStarted: !prev.isStarted }))}
          title="Click to toggle Live/Countdown state"
        >
          {timeLeft.isStarted ? (
            <div className="w-full max-w-3xl px-4 flex flex-col items-center justify-center bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm p-8 lg:p-12 transition-all relative overflow-hidden group-hover:border-emerald-500/50">
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs">Tournament Live</span>
              </div>
              <div className="text-white font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-4 text-center leading-none">
                THE WORLD CUP <br/> IS <span className="text-emerald-500">UNDERWAY</span>
              </div>
              <p className="text-white/60 text-[10px] md:text-xs tracking-widest uppercase font-bold text-center">
                Track daily matches, update your IST schedules, and follow group standings.
              </p>
              <div className="mt-8">
                <img 
                  src="https://files.catbox.moe/dkbv3z.png" 
                  alt="FIFA World Cup 2026 Logo" 
                  className="h-32 md:h-48 w-auto object-contain opacity-90 transition-opacity group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl px-4 group-hover:opacity-90 transition-opacity">
              {[
                { label: 'Days', val: timeLeft.days, color: 'text-fifa-blue' },
                { label: 'Hours', val: timeLeft.hours, color: 'text-white' },
                { label: 'Mins', val: timeLeft.minutes, color: 'text-white' },
                { label: 'Secs', val: timeLeft.seconds, color: 'text-fifa-magenta' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 flex flex-col items-center justify-center transition-all hover:bg-white/10">
                  <span className={`text-4xl md:text-6xl font-black ${item.color} leading-none tracking-tighter`}>
                    {item.val.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mt-3">{item.label}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex items-center gap-3 text-fifa-blue font-bold tracking-widest text-xs uppercase animate-pulse">
            <span className={`h-2 w-2 rounded-full ${timeLeft.isStarted ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-fifa-blue shadow-[0_0_10px_#00a3ff]'}`} />
            {timeLeft.isStarted ? "Welcome to North America" : "Countdown to Kickoff in Estadio Azteca"}
          </div>
        </div>
      </div>
    </div>
  );
}
