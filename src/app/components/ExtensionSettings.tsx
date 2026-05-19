import { motion } from 'motion/react';
import { Link2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

export function ExtensionSettings() {
  return (
    <div className="px-8 py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-2">Extensions</h2>
      <p className="text-white/60 mb-8">Connect your anime tracking accounts</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* MyAnimeList Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 5.219h-1.1l-2.04-5.219v5.216h-2.1v-8.423h2.91l1.86 4.911 1.86-4.911zm2.103 0h2.1v6.388h3.636v2.035h-5.736zm17.624 4.219c0 2.213-1.553 4.204-4.297 4.204-2.905 0-4.296-2.092-4.296-4.204 0-2.11 1.391-4.204 4.296-4.204 2.744 0 4.297 1.991 4.297 4.204zm-6.483 0c0 1.146.673 2.169 2.186 2.169 1.434 0 2.186-.938 2.186-2.169 0-1.23-.752-2.169-2.186-2.169-1.513 0-2.186 1.024-2.186 2.169z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">MyAnimeList</h3>
                <p className="text-white/60 text-sm">Sync your anime list</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Anime Watched</span>
              <span className="text-white font-semibold">247</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Episodes Watched</span>
              <span className="text-white font-semibold">5,432</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Days Watched</span>
              <span className="text-white font-semibold">68.2</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white">
              <Link2 className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
              Settings
            </Button>
          </div>
        </motion.div>

        {/* AniList Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5c-.706 0-1.1-.391-1.1-1.1v-5.041c0-.71.394-1.101 1.1-1.101h5c.709 0 1.1.391 1.1 1.1v2.62zm-8.5-11.51h-1.5v-2.42h-5v2.42h-1.5l4 4zm-13.5 4.5c0 .709-.391 1.101-1.1 1.101h-1.4v5.041c0 .709.391 1.1 1.1 1.1h5c.709 0 1.1-.391 1.1-1.1v-5.041h-1.4c-.709 0-1.1-.392-1.1-1.101v-8.42c0-.71.391-1.1 1.1-1.1h1.4v-.42c0-.709-.391-1.1-1.1-1.1h-5c-.709 0-1.1.391-1.1 1.1v10.94z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold">AniList</h3>
                <p className="text-white/60 text-sm">Sync your anime list</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Anime Watched</span>
              <span className="text-white font-semibold">251</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Episodes Watched</span>
              <span className="text-white font-semibold">5,489</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">Mean Score</span>
              <span className="text-white font-semibold">8.2</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-white">
              <Link2 className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
              Settings
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-white text-lg font-semibold mb-3">Extension Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Auto Sync</p>
              <p className="text-white/60 text-xs">Automatically sync watch progress</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Quick Links</p>
              <p className="text-white/60 text-xs">Access MAL & AniList from cards</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Rating Display</p>
              <p className="text-white/60 text-xs">Show ratings from both platforms</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
