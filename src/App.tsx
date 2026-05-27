/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';
import { Match } from './types';
import HeroSection from './components/HeroSection';
import MatchesSection from './components/MatchesSection';
import GroupStandingsView from './components/GroupStandingsView';
import KnockoutBracket from './components/KnockoutBracket';
import StadiumsView from './components/StadiumsView';
import { Calendar, Globe, Trophy, Ticket, LayoutDashboard, RefreshCw, Menu, X, Bell, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initAuth, googleSignIn, logout as firebaseLogout } from './lib/firebase';
import { User } from 'firebase/auth';

type AppTabType = 'matches' | 'standings' | 'bracket' | 'stadiums';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTabType>('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'authenticated' | 'unauthenticated'>('loading');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent standard Chrome UI from showing up
      console.log('[PWA] beforeinstallprompt event fired');
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('[PWA] deferredPrompt is null, cannot prompt install');
      alert('Install not supported on this device/browser, or app is already installed.');
      return;
    }

    console.log('[PWA] Showing install prompt');
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User choice outcome: ${outcome}`);
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/matches');
      const data = await response.json();
      
      const savedScores = localStorage.getItem('worldcup_2026_scores');
      if (savedScores) {
        try {
          const parsedScores = JSON.parse(savedScores) as Record<number, { s1: number | null; s2: number | null }>;
          data.forEach((m: Match) => {
            if (parsedScores[m.id]) {
              m.team1Score = parsedScores[m.id].s1;
              m.team2Score = parsedScores[m.id].s2;
            }
          });
        } catch (err) {
          console.error('Error parsing saved scores', err);
        }
      }
      setMatches(data);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    } catch (error) {
      console.error('Failed to fetch matches', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const savedFavorites = localStorage.getItem('worldcup_2026_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error parsing saved favorites', err);
      }
    }

    // Initialize Auth
    initAuth(
      (user) => {
        setUser(user);
        setAuthStatus('authenticated');
      },
      () => {
        setAuthStatus('unauthenticated');
      }
    );
  }, []);

  const handleLogin = async () => {
    setAuthStatus('loading');
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAuthStatus('authenticated');
      }
    } catch (err) {
      console.error('Login failed', err);
      setAuthStatus('unauthenticated');
    }
  };

  const handleLogout = async () => {
    await firebaseLogout();
    setUser(null);
    setAuthStatus('unauthenticated');
    setIsMenuOpen(false);
  };

  // Toggle favorite matches with local storage binding
  const handleToggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('worldcup_2026_favorites', JSON.stringify(updated));
  };

  // Update real-time score predictions/simulations
  const handleUpdateScore = (id: number, score1: number | null, score2: number | null) => {
    const updatedMatches = matches.map(m => {
      if (m.id === id) {
        return { ...m, team1Score: score1, team2Score: score2 };
      }
      return m;
    });
    setMatches(updatedMatches);

    // Save current scores map to local storage
    const scoresMap: Record<number, { s1: number | null; s2: number | null }> = {};
    updatedMatches.forEach(m => {
      if (m.team1Score !== undefined && m.team1Score !== null || m.team2Score !== undefined && m.team2Score !== null) {
        scoresMap[m.id] = { s1: m.team1Score ?? null, s2: m.team2Score ?? null };
      }
    });
    localStorage.setItem('worldcup_2026_scores', JSON.stringify(scoresMap));
  };

  // Clear simulated goals completely
  const handleClearPredictions = () => {
    if (window.confirm('Do you want to reset all simulated scores and projections?')) {
      const reset = matches.map(m => ({ ...m, team1Score: null, team2Score: null }));
      setMatches(reset);
      localStorage.removeItem('worldcup_2026_scores');
    }
  };

  // Quick stats computed
  const simulatedCount = matches.filter(m => m.team1Score !== null && m.team1Score !== undefined).length;

  return (
    <div id="wc-root" className="min-h-screen bg-black text-white flex flex-col font-sans relative antialiased">
      {/* Premium Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-fifa-blue/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-[30vh] bg-gradient-to-t from-fifa-magenta/5 via-transparent to-transparent" />
      </div>

      {/* Structural Pitch Lines Background overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 py-1">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex items-center justify-between gap-2 sm:gap-4">
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 w-6" /> : <Menu className="h-5 w-5 sm:h-6 w-6" />}
            </button>

            {/* Logo and branding */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="https://files.catbox.moe/dkbv3z.png" 
                alt="FIFA World Cup 2026" 
                className="h-8 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col leading-none">
                <span className="text-fifa-blue font-black text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase">OFFICIAL</span>
                <span className="text-white font-black text-lg sm:text-2xl tracking-tighter uppercase whitespace-nowrap">FIFA 26 <span className="text-fifa-blue">IST</span></span>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Official Style Tabs */}
          <nav className="flex items-center bg-white/5 p-1 rounded-sm gap-0.5 sm:gap-1">
            {[
              { id: 'matches', icon: Calendar, label: 'Schedule' },
              { id: 'standings', icon: LayoutDashboard, label: 'Groups' },
              { id: 'bracket', icon: Trophy, label: 'Brackets' },
              { id: 'stadiums', icon: Ticket, label: 'Venues' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AppTabType)}
                className={`flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2 sm:px-4 py-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-fifa-blue text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-3 w-3 sm:h-3.5 w-3.5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-slate-900 border-r border-white/10 z-[70] p-8 flex flex-col gap-8Shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-fifa-blue font-black text-lg tracking-widest uppercase">IST CENTER MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/40 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Google Services</span>
                  {authStatus === 'authenticated' && user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10">
                        <img src={user.photoURL || ''} className="h-8 w-8 rounded-full" alt="Profile" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white leading-none">{user.displayName}</span>
                          <span className="text-[10px] text-white/40">{user.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 p-3 border border-emerald-500/20">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Calendar Sync Active</span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed">
                          Your account is connected. You can now add matches to your Google Calendar directly from match cards.
                        </p>
                      </div>

                      <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[10px] font-black uppercase tracking-widest"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Connect your Google account to automatically sync match reminders and alarms to your Google Calendar.
                      </p>
                      <button 
                        onClick={handleLogin}
                        disabled={authStatus === 'loading'}
                        className="flex items-center justify-center gap-2 w-full p-4 bg-fifa-blue text-black hover:bg-white transition-colors text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                      >
                        <LogIn className="h-4 w-4" />
                        {authStatus === 'loading' ? 'Connecting...' : 'Connect Google Calendar'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Match Features</span>
                  <button className="flex items-center gap-3 p-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-widest">
                    <Bell className="h-4 w-4" />
                    Global Notifications
                  </button>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Install App</span>
                  {isInstallable ? (
                    <button 
                      onClick={handleInstallClick}
                      className="flex items-center justify-center gap-2 w-full p-4 bg-emerald-500 text-black hover:bg-emerald-400 transition-colors text-[10px] font-black uppercase tracking-widest mt-2"
                    >
                      <Ticket className="h-4 w-4" />
                      Download App / Install
                    </button>
                  ) : (
                    <p className="text-[10px] text-white/40 leading-relaxed mt-2">
                      Install not supported on this device/browser, or the app is already installed. Use your browser's "Add to Home Screen" option if available.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-[8px] text-white/20 leading-relaxed uppercase tracking-[0.1em]">
                  The 2026 FIFA World Cup™ is scheduled for June & July 2026. This app provides schedules in IST (UTC+5:30).
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container Wrapper */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-24 text-center">
            <RefreshCw className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-200">Synchronizing Live Data...</h2>
            <p className="text-sm text-slate-500">Fetching official fixtures and official IST timings.</p>
          </div>
        ) : (
          <>
            <HeroSection
              totalMatches={matches.length}
              favoritesCount={favorites.length}
              simulatedCount={simulatedCount}
              onClearPredictions={handleClearPredictions}
            />

            <div className="relative mt-8">
              <AnimatePresence mode="wait">
                {activeTab === 'matches' && (
                  <motion.div
                    key="matches-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MatchesSection
                      matches={matches}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onUpdateScore={handleUpdateScore}
                    />
                  </motion.div>
                )}

                {activeTab === 'standings' && (
                  <motion.div
                    key="standings-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GroupStandingsView matches={matches} />
                  </motion.div>
                )}

                {activeTab === 'bracket' && (
                  <motion.div
                    key="bracket-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <KnockoutBracket matches={matches} onUpdateScore={handleUpdateScore} />
                  </motion.div>
                )}

                {activeTab === 'stadiums' && (
                  <motion.div
                    key="stadiums-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <StadiumsView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      {/* Page Footer */}
      <footer id="app-footer" className="mt-24 border-t border-white/10 bg-black pt-16 pb-24 relative z-10 overflow-hidden">
        {/* Background Visual elements */}
        <div className="absolute top-0 left-0 w-1/4 h-1 bg-fifa-blue" />
        <div className="absolute top-0 right-0 w-1/4 h-1 bg-fifa-magenta" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src="https://files.catbox.moe/dkbv3z.png" 
                  alt="FIFA World Cup 2026" 
                  className="h-12 w-auto object-contain brightness-0 invert opacity-80"
                  referrerPolicy="no-referrer"
                />
                <span className="text-fifa-blue font-black text-2xl tracking-tighter uppercase">FIFA 26 <span className="text-white">IST HUB</span></span>
              </div>
              <p className="text-white/40 text-xs max-w-lg leading-relaxed font-medium uppercase tracking-widest">
                The official tournament match center for the 2026 FIFA World Cup, synchronized for the Indian Standard Time zone. All trademarks and copyright belong to their respective owners.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col md:items-end gap-6">
              <div className="flex flex-col md:items-end gap-1">
                <span className="text-white/20 font-black text-[9px] uppercase tracking-[0.3em]">Official Host Cities</span>
                <div className="flex gap-4 text-white/60 font-black text-[10px] uppercase tracking-widest">
                  <span>USA</span>
                  <span>CANADA</span>
                  <span>MEXICO</span>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="h-10 w-10 border border-white/10 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="h-10 w-10 border border-white/10 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            <span>© 2026 WORLD CUP IST CENTER</span>
            <div className="flex gap-8">
              <span className="hover:text-fifa-blue cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-fifa-blue cursor-pointer transition-colors">Cookies</span>
              <span className="hover:text-fifa-blue cursor-pointer transition-colors">Terms of Phase</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
