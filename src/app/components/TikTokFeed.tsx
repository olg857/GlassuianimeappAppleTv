import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, MessageCircle, Share2, Users, Volume2, VolumeX,
  Crown, Play, Pause, ChevronUp, ChevronDown, X, Send,
  Copy, Check, Link2, Sparkles, Radio, Wifi, Plus
} from 'lucide-react';

/* ─────────────────────────── types ─────────────────────────── */

interface ClipItem {
  id: number;
  title: string;
  episode: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  viewers: number;
  tags: string[];
  duration: string;
  progress: number;
  hostName: string;
  hostAvatar: string;
}

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  color: string;
}

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

type StreamState = 'idle' | 'choosing' | 'joining' | 'active';

/* ─────────────────────────── data ──────────────────────────── */

const clips: ClipItem[] = [
  {
    id: 1,
    title: 'Demon Slayer',
    episode: 'S2 E19 · Hinokami',
    description: 'Tanjiro unleashes the breathtaking Hinokami Kagura dance against Akaza in the most jaw-dropping battle of the season.',
    image: 'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMGFuaW1lJTIwcG9zdGVyfGVufDF8fHx8MTc3OTE0Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 284700, comments: 18400, shares: 9200, viewers: 3421,
    tags: ['#DemonSlayer', '#Hinokami', '#Tanjiro'],
    duration: '3:42', progress: 0.38,
    hostName: 'SwordMaster99', hostAvatar: '⚔️',
  },
  {
    id: 2,
    title: 'Attack on Titan',
    episode: 'S4 E28 · The Dawn of Humanity',
    description: 'Eren\'s rumbling begins. Thousands of Colossal Titans march toward the world in the most epic finale ever animated.',
    image: 'https://images.unsplash.com/photo-1658233427270-ba4d9d03b53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRhY2slMjBvbiUyMHRpdGFuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 512900, comments: 34200, shares: 21700, viewers: 8893,
    tags: ['#AttackOnTitan', '#Eren', '#TheRumbling'],
    duration: '4:15', progress: 0.72,
    hostName: 'TitanWatcher', hostAvatar: '🗺️',
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen',
    episode: 'S2 E17 · Inhuman Makeover',
    description: 'Sukuna unleashes his full domain expansion. No barriers, no mercy. The Shinjuku showdown reaches its terrifying peak.',
    image: 'https://images.unsplash.com/photo-1722573783570-9811ce67025e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWp1dHN1JTIwa2Fpc2VuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 439200, comments: 27800, shares: 15600, viewers: 5672,
    tags: ['#JujutsuKaisen', '#Sukuna', '#DomainExpansion'],
    duration: '2:58', progress: 0.55,
    hostName: 'CursedEnergy', hostAvatar: '🔮',
  },
  {
    id: 4,
    title: 'One Piece',
    episode: 'EP 1015 · Straw Hat Luffy',
    description: 'Luffy awakens his true Devil Fruit power — Nika, the Sun God. The world will never be the same.',
    image: 'https://images.unsplash.com/photo-1621478374422-35206faeddfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmUlMjBwaWVjZSUyMGFuaW1lJTIwbHVmZnl8ZW58MXx8fHwxNzc5MTQyOTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 672400, comments: 48900, shares: 33100, viewers: 12847,
    tags: ['#OnePiece', '#LuffyGearFive', '#Nika'],
    duration: '5:02', progress: 0.2,
    hostName: 'StrawHatCrew', hostAvatar: '🏴‍☠️',
  },
  {
    id: 5,
    title: 'Chainsaw Man',
    episode: 'S1 E9 · From Kyoto',
    description: 'Power cries for the first time. This raw emotional scene reminds us why Chainsaw Man is unlike any other anime.',
    image: 'https://images.unsplash.com/photo-1762681829607-c188e04a4bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFpbnNhdyUyMG1hbiUyMGFuaW1lfGVufDF8fHx8MTc3OTE0Mjk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 318500, comments: 22100, shares: 11800, viewers: 4231,
    tags: ['#ChainsawMan', '#Power', '#Denji'],
    duration: '3:22', progress: 0.61,
    hostName: 'DevilHunter', hostAvatar: '🪚',
  },
];

const LIVE_MESSAGES: Array<{ user: string; avatar: string; text: string; color: string }> = [
  { user: 'Naruto Fan', avatar: '🦊', text: 'This scene is INSANE 🔥🔥', color: 'text-orange-300' },
  { user: 'Otaku King', avatar: '👑', text: 'No way this animation 😭', color: 'text-yellow-300' },
  { user: 'AnimeGod', avatar: '⚡', text: 'I literally cried here', color: 'text-cyan-300' },
  { user: 'SakuraFan', avatar: '🌸', text: 'rewatching for the 10th time lol', color: 'text-pink-300' },
  { user: 'WeeaBro', avatar: '🎌', text: 'PEAK FICTION LETS GOOO', color: 'text-green-300' },
  { user: 'MangaReader', avatar: '📚', text: 'manga readers knew this was coming', color: 'text-blue-300' },
  { user: 'Anime Lover', avatar: '💜', text: 'this soundtrack omgggg', color: 'text-purple-300' },
  { user: 'HypeAnime', avatar: '🎆', text: 'best anime of the decade fr', color: 'text-rose-300' },
  { user: 'NightOwl', avatar: '🦉', text: '3am and I can\'t stop watching', color: 'text-indigo-300' },
  { user: 'CasualViewer', avatar: '🍿', text: 'just started this series, no spoilers pls!', color: 'text-amber-300' },
];

const REACTION_EMOJIS = ['❤️', '🔥', '😱', '💜', '🎉', '😭', '⚡', '👏', '🤯', '✨'];

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

/* ─────────────────────── LiveStreamPanel ───────────────────── */

interface LiveStreamPanelProps {
  clip: ClipItem;
  onClose: () => void;
  liveViewers: number;
}

function LiveStreamPanel({ clip, onClose, liveViewers }: LiveStreamPanelProps) {
  const [chatMsg, setChatMsg] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: clip.hostName, avatar: clip.hostAvatar, text: `Welcome to my ${clip.title} stream! 🎉`, time: '', color: 'text-yellow-300' },
    { id: 2, user: 'Naruto Fan', avatar: '🦊', text: 'Hyped to watch this together!!', time: '', color: 'text-orange-300' },
    { id: 3, user: 'Otaku King', avatar: '👑', text: 'Let\'s gooo 🔥', time: '', color: 'text-yellow-300' },
  ]);
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(100);
  const reactionIdRef = useRef(0);

  const roomCode = 'LIVE-' + clip.title.replace(/\s/g, '').toUpperCase().slice(0, 4) + Math.floor(Math.random() * 900 + 100);

  const participants = [
    { id: 1, name: 'You', avatar: '🎭', isHost: false },
    { id: 2, name: clip.hostName, avatar: clip.hostAvatar, isHost: true },
    { id: 3, name: 'Naruto Fan', avatar: '🦊', isHost: false },
    { id: 4, name: 'Otaku King', avatar: '👑', isHost: false },
    { id: 5, name: 'AnimeGod', avatar: '⚡', isHost: false },
  ];

  // Auto-stream live chat messages
  useEffect(() => {
    const pool = [...LIVE_MESSAGES];
    let idx = 0;
    const interval = setInterval(() => {
      const entry = pool[idx % pool.length];
      idx++;
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev.slice(-40), {
        id: msgIdRef.current++,
        user: entry.user,
        avatar: entry.avatar,
        text: entry.text,
        time: now,
        color: entry.color,
      }]);
    }, 2800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, []);

  // Auto-floating reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)];
      const id = reactionIdRef.current++;
      setReactions(prev => [...prev, { id, emoji, x: 20 + Math.random() * 60 }]);
      setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2500);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!chatMsg.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: msgIdRef.current++,
      user: 'You',
      avatar: '🎭',
      text: chatMsg.trim(),
      time: now,
      color: 'text-purple-300',
    }]);
    setChatMsg('');
  };

  const handleReaction = (emoji: string) => {
    const id = reactionIdRef.current++;
    setReactions(prev => [...prev, { id, emoji, x: 30 + Math.random() * 40 }]);
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="absolute inset-y-0 right-0 w-[320px] z-30 flex flex-col pointer-events-auto"
    >
      {/* Floating reactions over video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {reactions.map(r => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -220, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
              className="absolute bottom-40 text-2xl select-none"
              style={{ left: `${r.x}%` }}
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="h-full backdrop-blur-2xl bg-gradient-to-b from-slate-950/97 via-purple-950/95 to-slate-950/97 border-l border-purple-500/20 flex flex-col">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 border-b border-white/10">
          {/* Live badge row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-400/40 rounded-full px-2.5 py-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-300 text-xs font-bold tracking-wider">LIVE</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
                <Users className="w-3 h-3 text-white/60" />
                <span className="text-white/80 text-xs font-semibold">{formatCount(liveViewers)}</span>
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 border border-green-400/20 rounded-full px-2.5 py-1">
                <Wifi className="w-3 h-3 text-green-400" />
                <span className="text-green-300 text-xs font-semibold">Synced</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Host info */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-yellow-400/60 flex items-center justify-center text-xl">
                {clip.hostAvatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">{clip.hostName}</p>
              <p className="text-white/40 text-xs truncate">{clip.episode}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs">Progress</p>
              <div className="w-16 h-1 bg-white/10 rounded-full mt-1">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: `${clip.progress * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Participants strip ── */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {participants.map(p => (
              <div key={p.id} className="relative group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border transition-all
                  ${p.isHost
                    ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400/50'
                    : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-white/20'
                  }`}>
                  {p.avatar}
                </div>
                {/* Online pulse */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-slate-950">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-60" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-black/80 text-white text-xs rounded-full px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {p.name}
                </div>
              </div>
            ))}
            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Room code ── */}
        <div className="px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-3 py-2">
            <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs">Room Code</p>
              <p className="text-white font-mono text-xs truncate">{roomCode}</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl transition-colors shrink-0"
            >
              {copied
                ? <Check className="w-3 h-3 text-green-400" />
                : <Copy className="w-3 h-3 text-blue-400" />
              }
            </button>
          </div>
        </div>

        {/* ── Live Chat ── */}
        <div className="flex-1 flex flex-col min-h-0 px-3 pt-2 pb-3 overflow-hidden">
          <p className="text-white/40 text-xs mb-2 flex items-center gap-1.5 px-1">
            <Radio className="w-3 h-3 text-red-400" />
            Live Chat
          </p>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1" style={{ scrollbarWidth: 'none' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm shrink-0 mt-0.5">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold ${msg.color} mr-1`}>{msg.user}</span>
                    <span className="text-white/75 text-xs break-words">{msg.text}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Reaction bar */}
          <div className="flex gap-1.5 my-2">
            {['❤️', '🔥', '😱', '🎉', '😭'].map(emoji => (
              <motion.button
                key={emoji}
                whileTap={{ scale: 0.75 }}
                onClick={() => handleReaction(emoji)}
                className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-base transition-colors"
              >
                {emoji}
              </motion.button>
            ))}
          </div>

          {/* Message input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={chatMsg}
              onChange={e => setChatMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Chat live..."
              className="flex-1 bg-white/10 border border-white/15 rounded-full px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-purple-400/60 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!chatMsg.trim()}
              className="p-2 bg-gradient-to-br from-purple-500/30 to-pink-500/30 hover:from-purple-500/50 hover:to-pink-500/50 border border-purple-400/30 rounded-full transition-all disabled:opacity-30"
            >
              <Send className="w-3.5 h-3.5 text-purple-200" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Stream Entry Modal ────────────────────── */

interface StreamEntryProps {
  clip: ClipItem;
  onStart: () => void;
  onClose: () => void;
}

function StreamEntryModal({ clip, onStart, onClose }: StreamEntryProps) {
  const [mode, setMode] = useState<'choose' | 'join'>('choose');
  const [joinCode, setJoinCode] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 20 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="w-80 backdrop-blur-2xl bg-gradient-to-br from-slate-900/98 via-purple-950/98 to-slate-900/98 border border-purple-500/30 rounded-[28px] shadow-2xl shadow-purple-900/50 overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-5 pb-4 border-b border-white/10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${clip.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-300 text-xs font-bold tracking-wider">LIVE STREAM</span>
              </div>
              <h3 className="text-white font-black">{clip.title}</h3>
              <p className="text-white/50 text-xs">{clip.episode}</p>
            </div>
            <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {mode === 'choose' ? (
            <>
              {/* Host info preview */}
              <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-yellow-400/40 flex items-center justify-center text-xl">
                  {clip.hostAvatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{clip.hostName} is hosting</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3 h-3 text-white/40" />
                    <span className="text-white/50 text-xs">{formatCount(clip.viewers)} watching live</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-white font-bold transition-all shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4" />
                Join Live Stream
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setMode('join')}
                className="w-full py-3 bg-white/8 hover:bg-white/12 border border-white/15 rounded-2xl text-white/80 transition-all flex items-center justify-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                Join with Room Code
              </motion.button>
            </>
          ) : (
            <>
              <button
                onClick={() => setMode('choose')}
                className="text-white/50 text-sm hover:text-white/80 transition-colors"
              >
                ← Back
              </button>
              <p className="text-white/60 text-sm">Enter room code to join a friend's stream:</p>
              <input
                type="text"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                placeholder="LIVE-XXXX000"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white font-mono placeholder-white/30 focus:outline-none focus:border-purple-400/60 transition-colors"
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                disabled={joinCode.length < 3}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 rounded-2xl text-white font-bold transition-all"
              >
                Join Stream
              </motion.button>
            </>
          )}

          <p className="text-white/30 text-xs text-center">
            Premium · Synchronized playback with live chat
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── TikTokFeed ────────────────────────── */

interface TikTokFeedProps {
  onWatchTogether: (anime: { title: string }) => void;
}

export function TikTokFeed({ onWatchTogether: _onWatchTogether }: TikTokFeedProps) {
  const [likedClips, setLikedClips] = useState<Set<number>>(new Set());
  const [muted, setMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [streamState, setStreamState] = useState<Record<number, StreamState>>({});
  const [liveViewers, setLiveViewers] = useState<Record<number, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Init live viewer counts from clip data
  useEffect(() => {
    const initial: Record<number, number> = {};
    clips.forEach(c => { initial[c.id] = c.viewers; });
    setLiveViewers(initial);
  }, []);

  // Drift viewer counts for active streams
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => {
        const next = { ...prev };
        clips.forEach(c => {
          const drift = Math.floor(Math.random() * 40) - 15;
          next[c.id] = Math.max(100, next[c.id] + drift);
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleLike = useCallback((id: number) => {
    setLikedClips(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    setCurrentIndex(Math.round(scrollTop / clientHeight));
  }, []);

  const scrollTo = (dir: 'up' | 'down') => {
    if (!containerRef.current) return;
    const next = dir === 'down'
      ? Math.min(currentIndex + 1, clips.length - 1)
      : Math.max(currentIndex - 1, 0);
    containerRef.current.scrollTo({ top: next * containerRef.current.clientHeight, behavior: 'smooth' });
  };

  const getState = (id: number): StreamState => streamState[id] ?? 'idle';
  const setState = (id: number, s: StreamState) => setStreamState(prev => ({ ...prev, [id]: s }));

  return (
    <div className="fixed inset-0 bg-black z-10">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {clips.map((clip, index) => {
          const isLiked = likedClips.has(clip.id);
          const state = getState(clip.id);
          const isActive = state === 'active';
          const isChoosing = state === 'choosing';
          const viewers = liveViewers[clip.id] ?? clip.viewers;

          return (
            <div key={clip.id} className="relative h-screen w-full snap-start overflow-hidden">

              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${clip.image})`,
                  filter: isActive ? 'brightness(0.55)' : 'brightness(0.8)',
                }}
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-950/80" />
              )}

              {/* Tap to play/pause */}
              {!isChoosing && (
                <button
                  className="absolute inset-0 z-10"
                  onClick={() => !isActive && setPlaying(p => !p)}
                  aria-label="Toggle play"
                />
              )}

              {/* Pause overlay */}
              <AnimatePresence>
                {!playing && !isActive && index === currentIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.3 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <div className="p-5 bg-black/50 backdrop-blur-xl rounded-full border border-white/20">
                      <Pause className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Top Bar ── */}
              <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-6 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-3 py-1 flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isActive ? 'bg-red-500' : 'bg-red-500/60'}`} />
                    <span className="text-white text-xs font-bold">{isActive ? 'LIVE · STREAMING' : 'LIVE'}</span>
                  </div>
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-3 py-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-white/60" />
                    <motion.span
                      key={viewers}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white/80 text-xs"
                    >
                      {formatCount(viewers)}
                    </motion.span>
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 border border-purple-400/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-yellow-300" />
                  <span className="text-white text-xs font-bold">PREMIUM</span>
                </div>
              </div>

              {/* ── Synced progress bar (active stream) ── */}
              {isActive && (
                <div className="absolute top-20 left-4 right-[328px] z-20 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3 text-green-400" />
                    <span className="text-green-300 text-xs font-semibold">All synced · {clip.duration}</span>
                  </div>
                  <div className="mt-1 h-0.5 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                      style={{ width: `${clip.progress * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* ── Bottom content row ── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end">
                {/* Info */}
                <div className={`flex-1 p-5 pb-8 transition-all duration-500 ${isActive ? 'pr-2' : ''}`}>
                  <AnimatePresence mode="wait">
                    {index === currentIndex && (
                      <motion.div
                        key={`info-${clip.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.05 }}
                      >
                        {isActive && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-yellow-400/50 flex items-center justify-center text-base">
                              {clip.hostAvatar}
                            </div>
                            <span className="text-yellow-300 text-xs font-bold">{clip.hostName}</span>
                            <span className="text-white/40 text-xs">is hosting</span>
                          </div>
                        )}

                        <div className="inline-flex items-center gap-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                          <Play className="w-3 h-3 text-purple-300 fill-purple-300" />
                          <span className="text-white/80 text-xs">{clip.episode}</span>
                        </div>

                        <h2 className="text-white text-2xl font-black mb-1 drop-shadow-2xl">{clip.title}</h2>
                        <p className="text-white/70 text-sm leading-relaxed mb-3 max-w-xs drop-shadow-lg line-clamp-2">
                          {clip.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {clip.tags.map(tag => (
                            <span key={tag} className="text-purple-300 text-xs">{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <div className="mt-4 h-0.5 bg-white/20 rounded-full max-w-xs">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        style={{ width: `${clip.progress * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className={`flex flex-col items-center gap-5 p-4 pb-8 z-20 transition-all duration-500 ${isActive ? 'mr-[320px]' : ''}`}>
                  {/* Like */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={e => { e.stopPropagation(); handleLike(clip.id); }}
                      className="relative p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <AnimatePresence>
                        {isLiked && (
                          <motion.div
                            key="liked"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1.4, 1] }}
                            className="absolute inset-0 rounded-full bg-red-500/30 border border-red-400/50"
                          />
                        )}
                      </AnimatePresence>
                      <Heart className={`w-6 h-6 relative z-10 transition-colors ${isLiked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
                    </motion.button>
                    <span className="text-white text-xs font-semibold drop-shadow-lg">
                      {formatCount(clip.likes + (isLiked ? 1 : 0))}
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={e => e.stopPropagation()}
                      className="p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </motion.button>
                    <span className="text-white text-xs font-semibold drop-shadow-lg">{formatCount(clip.comments)}</span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={e => e.stopPropagation()}
                      className="p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-6 h-6 text-white" />
                    </motion.button>
                    <span className="text-white text-xs font-semibold drop-shadow-lg">{formatCount(clip.shares)}</span>
                  </div>

                  {/* Watch Together / Leave */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={e => {
                        e.stopPropagation();
                        if (isActive) {
                          setState(clip.id, 'idle');
                        } else {
                          setState(clip.id, 'choosing');
                        }
                      }}
                      className={`relative p-3 rounded-full backdrop-blur-xl border transition-all ${
                        isActive
                          ? 'bg-red-500/30 border-red-400/50 shadow-lg shadow-red-500/20'
                          : 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-purple-400/40 hover:from-purple-600/50 hover:to-pink-600/50'
                      }`}
                    >
                      {isActive
                        ? <X className="w-6 h-6 text-red-300" />
                        : <Users className="w-6 h-6 text-purple-200" />
                      }
                      {!isActive && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </motion.button>
                    <span className={`text-xs font-bold drop-shadow-lg ${isActive ? 'text-red-300' : 'text-purple-300'}`}>
                      {isActive ? 'Leave' : 'Watch'}
                    </span>
                  </div>

                  {/* Mute */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
                    className="p-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {muted
                      ? <VolumeX className="w-5 h-5 text-white/60" />
                      : <Volume2 className="w-5 h-5 text-white" />
                    }
                  </motion.button>
                </div>
              </div>

              {/* ── Stream entry modal ── */}
              <AnimatePresence>
                {isChoosing && (
                  <StreamEntryModal
                    clip={clip}
                    onStart={() => setState(clip.id, 'active')}
                    onClose={() => setState(clip.id, 'idle')}
                  />
                )}
              </AnimatePresence>

              {/* ── Live stream panel ── */}
              <AnimatePresence>
                {isActive && (
                  <LiveStreamPanel
                    clip={clip}
                    onClose={() => setState(clip.id, 'idle')}
                    liveViewers={viewers}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => scrollTo('up')}
          disabled={currentIndex === 0}
          className="p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full transition-all disabled:opacity-20 hover:bg-white/20"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => scrollTo('down')}
          disabled={currentIndex === clips.length - 1}
          className="p-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full transition-all disabled:opacity-20 hover:bg-white/20"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {clips.map((_, i) => (
          <button
            key={i}
            onClick={() => containerRef.current?.scrollTo({ top: i * containerRef.current.clientHeight, behavior: 'smooth' })}
            className={`rounded-full transition-all ${i === currentIndex ? 'w-1.5 h-6 bg-purple-400' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronUp className="w-6 h-6 text-white/60" />
        </motion.div>
        <span className="text-white/40 text-xs backdrop-blur-xl bg-black/30 rounded-full px-3 py-1">
          Swipe up for next clip
        </span>
      </motion.div>

      {/* Premium badge */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="backdrop-blur-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/20 rounded-full px-4 py-1.5 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-white/70 text-xs">Discover · Live Watch Together</span>
        </div>
      </div>
    </div>
  );
}
