import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Copy, Send, Video, Pause, Play, Volume2, Settings, Link2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface WatchTogetherProps {
  isOpen: boolean;
  onClose: () => void;
  animeTitle?: string;
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
  isHost: boolean;
}

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

export function WatchTogether({ isOpen, onClose, animeTitle = 'Demon Slayer' }: WatchTogetherProps) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const roomCode = 'ANIME-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const participants: Participant[] = [
    { id: 1, name: 'You', avatar: '🎭', isHost: true },
    { id: 2, name: 'Naruto Fan', avatar: '🦊', isHost: false },
    { id: 3, name: 'Otaku King', avatar: '👑', isHost: false },
    { id: 4, name: 'Anime Lover', avatar: '💜', isHost: false },
  ];

  const messages: Message[] = [
    { id: 1, user: 'Naruto Fan', message: 'This episode is amazing!', timestamp: '2:15 PM' },
    { id: 2, user: 'Otaku King', message: 'The animation is so smooth', timestamp: '2:16 PM' },
    { id: 3, user: 'Anime Lover', message: 'Can\'t wait for the next scene!', timestamp: '2:17 PM' },
  ];

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full max-w-6xl h-full max-h-[85vh] pointer-events-auto">
              <div className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 border border-white/20 rounded-[40px] shadow-2xl h-full flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-400/30">
                      <Video className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Watch Together</h2>
                      <p className="text-white/60 text-sm">{animeTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex gap-6 p-6 overflow-hidden">

                  {/* Left Side - Video Player */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Video Player Placeholder */}
                    <div className="flex-1 backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative group">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full transition-all"
                        >
                          {isPlaying ? (
                            <Pause className="w-12 h-12 text-white" />
                          ) : (
                            <Play className="w-12 h-12 text-white ml-1" />
                          )}
                        </motion.button>
                      </div>

                      {/* Sync Status */}
                      <div className="absolute top-4 left-4 backdrop-blur-xl bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-sm font-semibold">Synced</span>
                      </div>

                      {/* Playback Controls */}
                      <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                          <Button
                            size="sm"
                            className="bg-white/20 hover:bg-white/30 border-white/30 text-white rounded-full"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <div className="flex-1 h-1 bg-white/20 rounded-full">
                            <div className="h-full w-1/3 bg-purple-500 rounded-full" />
                          </div>
                          <span className="text-white text-sm">12:34 / 24:00</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-xl">
                            <Link2 className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white/60 text-xs">Room Code</p>
                            <p className="text-white font-mono font-semibold">{roomCode}</p>
                          </div>
                        </div>
                        <Button
                          onClick={handleCopyRoomCode}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white rounded-full"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Invite
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Participants & Chat */}
                  <div className="w-80 flex flex-col gap-4">

                    {/* Participants */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-white/60" />
                        <h3 className="text-white font-semibold">Watching ({participants.length})</h3>
                      </div>
                      <div className="space-y-2">
                        {participants.map((participant) => (
                          <motion.div
                            key={participant.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-white/20 flex items-center justify-center text-xl">
                              {participant.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{participant.name}</p>
                              {participant.isHost && (
                                <p className="text-yellow-400 text-xs">Host</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Chat */}
                    <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col min-h-0">
                      <h3 className="text-white font-semibold mb-4">Chat</h3>

                      {/* Messages */}
                      <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="backdrop-blur-sm bg-white/5 rounded-2xl p-3"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-purple-300 text-sm font-semibold">{msg.user}</p>
                              <p className="text-white/40 text-xs">{msg.timestamp}</p>
                            </div>
                            <p className="text-white/90 text-sm">{msg.message}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 transition-colors"
                        />
                        <Button
                          onClick={handleSendMessage}
                          className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-white rounded-full aspect-square p-0"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
