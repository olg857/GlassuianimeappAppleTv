import { motion } from 'motion/react';
import { Search, User } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const tabs = ['Home', 'Trending', 'New Releases', 'My List', 'Browse'];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-16 py-6"
    >
      <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                AnimeTV
              </span>
            </h1>

            {/* Navigation Tabs */}
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
