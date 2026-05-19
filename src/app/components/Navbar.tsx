import { motion } from 'motion/react';
import { Search, User } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = ['Home', 'Trending', 'New Releases', 'My List', 'Premium', 'Extensions'];

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
                      className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
