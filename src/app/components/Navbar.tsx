import { motion } from 'motion/react';
import { Search, User, Sparkles, Camera } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = ['Home', 'Trending', 'New Releases', 'My List', 'Discover', 'Premium', 'Extensions'];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-16 py-6"
    >
      <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[32px] shadow-2xl">
        <div className="flex items-center justify-between px-8 py-5">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-black text-white tracking-tight">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] rounded-text">
                AnimeTV
              </span>
            </h1>

            {/* Navigation Tabs */}
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`relative px-5 py-2.5 rounded-full transition-all ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 backdrop-blur-sm rounded-full ${
                        tab === 'Discover'
                          ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-400/30'
                          : 'bg-white/10'
                      }`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab === 'Discover' && <Sparkles className="w-3.5 h-3.5 text-purple-300" />}
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            {/* iPhone camera quick-access — clicking the floating button below handles the flow */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 rounded-full transition-colors cursor-default">
              <Camera className="w-4 h-4 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium">iPhone</span>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
