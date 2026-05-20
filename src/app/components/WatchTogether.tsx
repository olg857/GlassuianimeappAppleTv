import { motion, AnimatePresence } from 'motion/react';
import {
  X, Users, Copy, Send, Video, Pause, Play, Volume2, VolumeX,
  Link2, Check, Maximize2, PictureInPicture2, Subtitles,
  ChevronDown, Crown, Wifi, RotateCcw, RotateCw, Settings, ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface WatchTogetherProps { isOpen: boolean; onClose: () => void; animeTitle?: string; }
interface Participant { id: number; name: string; avatar: string; isHost: boolean; }
interface ChatMsg { id: number; user: string; avatar: string; text: string; time: string; color: string; }

const TOTAL = 24 * 60;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/* ─────────────────────────────────────────
   See-through glass tokens
   Every surface is near-zero opacity so the
   blurred backdrop image bleeds right through.
───────────────────────────────────────── */
const glass = (alpha = 0.04, blur = 48) => ({
  background: `rgba(255,255,255,${alpha})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: [
    'inset 0 1.5px 0 rgba(255,255,255,0.30)',   // specular top edge
    'inset 0 -1px 0 rgba(255,255,255,0.06)',     // bottom edge reflection
    'inset 1px 0 0 rgba(255,255,255,0.08)',      // left edge
    '0 8px 32px rgba(0,0,0,0.28)',              // soft drop shadow
  ].join(','),
});

/* ─────────────────────────────────────────
   Glass Video Player
───────────────────────────────────────── */
function GlassPlayer({ animeTitle, bgImage, onClose }:
  { animeTitle: string; bgImage: string; onClose: () => void }) {

  const [playing, setPlaying]   = useState(false);
  const [elapsed, setElapsed]   = useState(TOTAL * 0.28);
  const [volume, setVolume]     = useState(0.8);
  const [muted, setMuted]       = useState(false);
  const [showVol, setShowVol]   = useState(false);
  const [quality, setQuality]   = useState('1080p');
  const [showQ, setShowQ]       = useState(false);
  const [showCtrl, setShowCtrl] = useState(true);
  const [flash, setFlash]       = useState<'play'|'pause'|null>(null);
  const [hoverPct, setHoverPct] = useState<number|null>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setElapsed(e => Math.min(TOTAL, e + 1)), 1000);
    return () => clearInterval(iv);
  }, [playing]);

  const nudge = () => {
    setShowCtrl(true);
    clearTimeout(hideRef.current);
    if (playing) hideRef.current = setTimeout(() => setShowCtrl(false), 3000);
  };
  useEffect(() => { if (!playing) setShowCtrl(true); }, [playing]);
  useEffect(() => () => clearTimeout(hideRef.current), []);

  const togglePlay = () => {
    const next = !playing;
    setPlaying(next);
    setFlash(next ? 'play' : 'pause');
    setTimeout(() => setFlash(null), 600);
    nudge();
  };
  const skip = (s: number) => { setElapsed(e => Math.max(0, Math.min(TOTAL, e + s))); nudge(); };
  const scrub = (e: React.MouseEvent) => {
    if (!barRef.current) return;
    const r = barRef.current.getBoundingClientRect();
    setElapsed(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * TOTAL);
  };

  const pct = elapsed / TOTAL;
  const vol = muted ? 0 : volume;

  return (
    <div className="absolute inset-0 overflow-hidden" onMouseMove={nudge}>

      {/* ── Full bleed anime art — the "content" you see through the glass ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Darken just enough to make content legible */}
      <div className="absolute inset-0" style={{ background: 'rgba(4,2,14,0.52)' }} />
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)' }} />
      {/* Playing pulse */}
      {playing && (
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.06, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 60%, rgba(139,92,246,1), transparent)' }}
        />
      )}

      {/* ── TOP HUD ── */}
      <AnimatePresence>
        {showCtrl && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between p-5 pointer-events-none"
          >
            {/* Episode pill */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl pointer-events-auto" style={glass(0.06, 32)}>
              <div className="w-[3px] h-6 rounded-full" style={{ background: 'linear-gradient(to bottom,#c4b5fd,#f0abfc)' }} />
              <div>
                <p className="text-white/95 text-sm font-semibold leading-none drop-shadow">{animeTitle}</p>
                <p className="text-white/45 text-xs mt-0.5">Ep 19 · Season 2</p>
              </div>
            </div>

            {/* Right badges */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-full" style={{
                ...glass(0.05, 24),
                border: '1px solid rgba(74,222,128,0.28)',
                boxShadow: 'inset 0 1px 0 rgba(74,222,128,0.18), 0 4px 16px rgba(0,0,0,0.2)',
              }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <Wifi className="w-3 h-3 text-emerald-300" />
                <span className="text-emerald-200 text-xs font-semibold">All Synced</span>
              </div>
              <div className="px-3 py-2 rounded-full" style={glass(0.05, 24)}>
                <span className="text-white/55 text-xs font-bold">{quality}</span>
              </div>
              <button onClick={onClose}
                className="p-2.5 rounded-full transition-all hover:bg-white/10"
                style={glass(0.05, 24)}>
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Center flash ring ── */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1, scale: 0.55 }} animate={{ opacity: 0, scale: 1.7 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="w-28 h-28 rounded-full flex items-center justify-center"
              style={glass(0.10, 40)}>
              {flash === 'pause'
                ? <Pause className="w-12 h-12 text-white drop-shadow-lg" />
                : <Play  className="w-12 h-12 text-white ml-1.5 drop-shadow-lg" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Paused play button — triple glass rings ── */}
      <AnimatePresence>
        {!playing && !flash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            {/* Ring 3 — outermost, barely visible */}
            <div className="absolute w-44 h-44 rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(2px)' }} />
            {/* Ring 2 */}
            <div className="absolute w-[120px] h-[120px] rounded-full"
              style={{ border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)' }} />
            {/* Ring 1 — core */}
            <div className="w-[86px] h-[86px] rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(48px) saturate(200%)',
                WebkitBackdropFilter: 'blur(48px) saturate(200%)',
                border: '1px solid rgba(255,255,255,0.28)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.38), 0 20px 60px rgba(0,0,0,0.50)',
              }}>
              <Play className="w-9 h-9 text-white ml-1.5 drop-shadow-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tap zone */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

      {/* ── CONTROLS BAR ── */}
      <AnimatePresence>
        {showCtrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Frosted glass control panel — see-through */}
            <div className="mx-4 mb-4 rounded-[24px] overflow-hidden" style={{
              background: 'rgba(255,255,255,0.055)',
              backdropFilter: 'blur(60px) saturate(200%)',
              WebkitBackdropFilter: 'blur(60px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.20)',
              boxShadow: [
                'inset 0 1.5px 0 rgba(255,255,255,0.35)',
                'inset 0 -1px 0 rgba(255,255,255,0.06)',
                '0 16px 48px rgba(0,0,0,0.50)',
              ].join(','),
            }}>

              {/* Progress bar row */}
              <div className="px-5 pt-4 pb-0">
                <div
                  ref={barRef}
                  className="group/bar relative cursor-pointer rounded-full"
                  style={{ height: 4 }}
                  onClick={scrub}
                  onMouseMove={e => {
                    if (!barRef.current) return;
                    const r = barRef.current.getBoundingClientRect();
                    setHoverPct(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
                  }}
                  onMouseLeave={() => setHoverPct(null)}
                >
                  {/* track */}
                  <div className="absolute inset-0 rounded-full bg-white/12" />
                  {/* buffered */}
                  <div className="absolute inset-y-0 left-0 rounded-full bg-white/20" style={{ width: '55%' }} />
                  {/* played */}
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{
                    width: `${pct * 100}%`,
                    background: 'linear-gradient(90deg,#c4b5fd,#f9a8d4)',
                    boxShadow: '0 0 10px rgba(196,181,253,0.65)',
                    transition: 'width 0.1s linear',
                  }} />
                  {/* thumb */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[15px] h-[15px] rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity"
                    style={{ left: `${pct * 100}%`, boxShadow: '0 0 0 3px rgba(196,181,253,0.45), 0 4px 12px rgba(0,0,0,0.55)' }} />
                  {/* time tooltip */}
                  {hoverPct !== null && (
                    <div className="absolute -top-9 -translate-x-1/2 px-2.5 py-1 rounded-xl pointer-events-none"
                      style={{ left: `${hoverPct * 100}%`, ...glass(0.08, 24) }}>
                      <span className="text-white text-xs font-mono drop-shadow">{fmt(hoverPct * TOTAL)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons row */}
              <div className="flex items-center gap-1 px-4 py-3">

                {/* Play/Pause */}
                <motion.button whileTap={{ scale: 0.86 }} onClick={togglePlay}
                  className="p-2.5 rounded-full hover:bg-white/12 transition-all">
                  {playing
                    ? <Pause className="w-5 h-5 text-white drop-shadow" />
                    : <Play  className="w-5 h-5 text-white ml-0.5 drop-shadow" />}
                </motion.button>

                {/* Skip −10 */}
                <button onClick={() => skip(-10)} className="p-2.5 rounded-full hover:bg-white/10 transition-all relative">
                  <RotateCcw className="w-4 h-4 text-white/60" />
                  <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white/50 mt-0.5">10</span>
                </button>

                {/* Skip +10 */}
                <button onClick={() => skip(10)} className="p-2.5 rounded-full hover:bg-white/10 transition-all relative">
                  <RotateCw className="w-4 h-4 text-white/60" />
                  <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white/50 mt-0.5">10</span>
                </button>

                {/* Volume */}
                <div className="relative">
                  <button className="p-2.5 rounded-full hover:bg-white/10 transition-all"
                    onClick={() => setMuted(m => !m)}
                    onMouseEnter={() => setShowVol(true)}
                    onMouseLeave={() => setShowVol(false)}>
                    {vol === 0
                      ? <VolumeX className="w-[15px] h-[15px] text-white/50" />
                      : <Volume2 className="w-[15px] h-[15px] text-white/75" />}
                  </button>
                  <AnimatePresence>
                    {showVol && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                        onMouseEnter={() => setShowVol(true)} onMouseLeave={() => setShowVol(false)}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-2xl flex flex-col items-center gap-2 px-3 py-3"
                        style={{ ...glass(0.07, 40), width: 44 }}>
                        <input type="range" min={0} max={1} step={0.02} value={vol}
                          onChange={e => { setVolume(+e.target.value); setMuted(false); }}
                          style={{ height: 80, writingMode: 'vertical-lr', direction: 'rtl',
                            appearance: 'slider-vertical', WebkitAppearance: 'slider-vertical', accentColor: '#c4b5fd' }}
                        />
                        <span className="text-white/40 text-[10px] font-mono">{Math.round(vol * 100)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time */}
                <div className="px-3 flex items-center gap-1.5">
                  <span className="text-white/90 text-sm font-mono tabular-nums drop-shadow">{fmt(elapsed)}</span>
                  <span className="text-white/25 text-sm">/</span>
                  <span className="text-white/40 text-sm font-mono">{fmt(TOTAL)}</span>
                </div>

                <div className="flex-1" />

                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all">
                  <Subtitles className="w-4 h-4 text-white/45" />
                </button>

                {/* Quality */}
                <div className="relative">
                  <button onClick={() => { setShowQ(q => !q); setShowVol(false); }}
                    className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-white/10 transition-all text-xs font-bold text-white/48">
                    {quality} <ChevronDown className="w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {showQ && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-2 rounded-2xl overflow-hidden min-w-[152px]"
                        style={glass(0.07, 48)}>
                        <p className="text-white/30 text-[10px] font-black tracking-widest px-4 pt-3 pb-1">QUALITY</p>
                        {['4K Ultra HD','1080p','720p','480p'].map(q => {
                          const k = q.startsWith('4K') ? '4K' : q;
                          return (
                            <button key={q} onClick={() => { setQuality(k); setShowQ(false); }}
                              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/8 transition-colors">
                              <span className={`text-sm ${quality===k ? 'text-white' : 'text-white/42'}`}>{q}</span>
                              {quality === k && <div className="w-1.5 h-1.5 rounded-full bg-violet-300" />}
                            </button>
                          );
                        })}
                        <div className="h-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all">
                  <Settings className="w-4 h-4 text-white/45" />
                </button>
                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all">
                  <PictureInPicture2 className="w-4 h-4 text-white/45" />
                </button>
                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all">
                  <Maximize2 className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   Watch Together Modal
───────────────────────────────────────── */
export function WatchTogether({ isOpen, onClose, animeTitle = 'Demon Slayer' }: WatchTogetherProps) {
  const [msg, setMsg]           = useState('');
  const [copied, setCopied]     = useState(false);
  const [sideOpen, setSideOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: 1, user: 'Naruto Fan',  avatar: '🦊', text: 'This episode is amazing!',       time: '2:15 PM', color: 'text-orange-300' },
    { id: 2, user: 'Otaku King',  avatar: '👑', text: 'Animation is so smooth 🔥',       time: '2:16 PM', color: 'text-amber-300'  },
    { id: 3, user: 'Anime Lover', avatar: '💜', text: "Can't wait for the next scene!", time: '2:17 PM', color: 'text-violet-300' },
  ]);

  const roomCode = useRef('ANIME-' + Math.random().toString(36).slice(2,8).toUpperCase()).current;
  const msgId    = useRef(10);
  const chatEnd  = useRef<HTMLDivElement>(null);

  const BG = 'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMGFuaW1lJTIwcG9zdGVyfGVufDF8fHx8MTc3OTE0Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080';

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const copy = () => { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const send = () => {
    if (!msg.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(p => [...p, { id: msgId.current++, user: 'You', avatar: '🎭', text: msg.trim(), time: now, color: 'text-violet-300' }]);
    setMsg('');
  };

  const participants: Participant[] = [
    { id: 1, name: 'You',         avatar: '🎭', isHost: true  },
    { id: 2, name: 'Naruto Fan',  avatar: '🦊', isHost: false },
    { id: 3, name: 'Otaku King',  avatar: '👑', isHost: false },
    { id: 4, name: 'Anime Lover', avatar: '💜', isHost: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop — blurred anime art ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG})` }} />
            <div className="absolute inset-0" style={{ background: 'rgba(3,1,12,0.70)', backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)' }} />
          </motion.div>

          {/* ── Click-away layer ── */}
          <div className="fixed inset-0 z-50" onClick={onClose} />

          {/* ── Modal ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.91, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, mass: 1.0 }}
            className="fixed z-[60]"
            style={{ inset: 10 }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Outer glass shell ── */}
            <div className="w-full h-full flex overflow-hidden" style={{
              borderRadius: 34,
              /* near-invisible glass — you see right through to the blurred art behind */
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(80px) saturate(220%)',
              WebkitBackdropFilter: 'blur(80px) saturate(220%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: [
                'inset 0 2px 0 rgba(255,255,255,0.28)',   // top specular
                'inset 0 -1px 0 rgba(255,255,255,0.06)',  // bottom
                'inset 1px 0 0 rgba(255,255,255,0.10)',   // left
                'inset -1px 0 0 rgba(255,255,255,0.06)',  // right
                '0 48px 120px rgba(0,0,0,0.80)',
              ].join(','),
            }}>

              {/* ═══ Video player ═══ */}
              <div className="flex-1 relative min-w-0" style={{ borderRadius: '33px 0 0 33px', overflow: 'hidden' }}>
                <GlassPlayer animeTitle={animeTitle} bgImage={BG} onClose={onClose} />

                {/* Sidebar toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSideOpen(s => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-5 h-12 rounded-l-xl"
                  style={{
                    ...glass(0.06, 20),
                    borderRight: 'none',
                    borderRadius: '10px 0 0 10px',
                  }}>
                  <ChevronRight className={`w-3 h-3 text-white/40 transition-transform duration-300 ${sideOpen ? 'rotate-0' : 'rotate-180'}`} />
                </motion.button>
              </div>

              {/* ═══ Sidebar ═══ */}
              <AnimatePresence>
                {sideOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 288, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                    className="shrink-0 overflow-hidden flex flex-col"
                    style={{ borderLeft: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <div className="w-[288px] h-full flex flex-col p-4 gap-3">

                      {/* Room header */}
                      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shrink-0"
                        style={glass(0.06, 32)}>
                        <div className="p-2 rounded-xl" style={{
                          background: 'rgba(196,181,253,0.15)',
                          border: '1px solid rgba(196,181,253,0.25)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.20)',
                        }}>
                          <Video className="w-4 h-4 text-violet-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/88 text-sm font-bold truncate drop-shadow">{animeTitle}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/38 text-xs">{participants.length} watching</span>
                          </div>
                        </div>
                        <button onClick={copy}
                          className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-white/10 transition-all">
                          {copied
                            ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                            : <Copy  className="w-3.5 h-3.5 text-white/32" />}
                        </button>
                      </div>

                      {/* Room code */}
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl shrink-0"
                        style={glass(0.04, 24)}>
                        <Link2 className="w-3.5 h-3.5 text-sky-400/80 shrink-0" />
                        <span className="text-white/45 text-xs font-mono tracking-widest flex-1 truncate">{roomCode}</span>
                      </div>

                      {/* Participants */}
                      <div className="rounded-2xl p-3 shrink-0" style={glass(0.05, 32)}>
                        <div className="flex items-center gap-2 mb-2.5">
                          <Users className="w-3.5 h-3.5 text-white/32" />
                          <span className="text-white/38 text-xs font-bold tracking-widest">WATCHING</span>
                        </div>
                        <div className="space-y-0.5">
                          {participants.map((p, i) => (
                            <motion.div key={p.id}
                              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/6 transition-colors"
                            >
                              <div className="relative shrink-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                                  style={glass(0.08, 20)}>
                                  {p.avatar}
                                </div>
                                {p.isHost && (
                                  <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <Crown className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white/80 text-xs font-semibold truncate">{p.name}</p>
                                <p className="text-white/28 text-xs">{p.isHost ? 'Host' : 'Viewer'}</p>
                              </div>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 shrink-0" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Chat */}
                      <div className="flex-1 rounded-2xl flex flex-col min-h-0" style={glass(0.05, 32)}>
                        <div className="flex items-center gap-2 px-4 pt-3.5 pb-2.5 shrink-0"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <span className="text-white/38 text-xs font-bold tracking-widest">LIVE CHAT</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                        </div>

                        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-0" style={{ scrollbarWidth: 'none' }}>
                          <AnimatePresence initial={false}>
                            {messages.map(m => (
                              <motion.div key={m.id}
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                                  style={glass(0.08, 16)}>
                                  {m.avatar}
                                </div>
                                <div className="flex-1 min-w-0 rounded-xl rounded-tl-sm px-2.5 py-2"
                                  style={glass(0.05, 20)}>
                                  <div className="flex items-baseline gap-1.5 mb-0.5">
                                    <span className={`text-xs font-bold ${m.color}`}>{m.user}</span>
                                    <span className="text-white/20 text-xs">{m.time}</span>
                                  </div>
                                  <p className="text-white/70 text-xs leading-relaxed">{m.text}</p>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <div ref={chatEnd} />
                        </div>

                        {/* Input */}
                        <div className="p-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                          <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={glass(0.06, 24)}>
                            <input
                              type="text" value={msg}
                              onChange={e => setMsg(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && send()}
                              placeholder="Say something…"
                              className="flex-1 bg-transparent text-white/80 text-xs placeholder-white/25 focus:outline-none"
                            />
                            <motion.button whileTap={{ scale: 0.86 }} onClick={send} disabled={!msg.trim()}
                              className="p-1.5 rounded-full disabled:opacity-25 transition-all"
                              style={{
                                background: 'rgba(196,181,253,0.18)',
                                border: '1px solid rgba(196,181,253,0.30)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.20)',
                              }}>
                              <Send className="w-3 h-3 text-violet-200" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
