import { motion } from 'motion/react';
import { Link2, CheckCircle, Download, Zap, Image, Palette } from 'lucide-react';
import { Button } from './ui/button';

export function ExtensionSettings() {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl animate-pulse delay-2000" />

        {/* Additional Accent Orbs */}
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-2xl animate-pulse" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-purple-950/85 to-slate-950/90 backdrop-blur-sm" />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* Light Rays */}
        <div className="absolute top-0 left-1/2 w-px h-1/3 bg-gradient-to-b from-white/5 to-transparent rotate-12" />
        <div className="absolute top-0 right-1/3 w-px h-1/4 bg-gradient-to-b from-white/3 to-transparent -rotate-12" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* Floating Icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-1/4 text-blue-400/10"
        >
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 5.219h-1.1l-2.04-5.219v5.216h-2.1v-8.423h2.91l1.86 4.911 1.86-4.911zm2.103 0h2.1v6.388h3.636v2.035h-5.736zm17.624 4.219c0 2.213-1.553 4.204-4.297 4.204-2.905 0-4.296-2.092-4.296-4.204 0-2.11 1.391-4.204 4.296-4.204 2.744 0 4.297 1.991 4.297 4.204zm-6.483 0c0 1.146.673 2.169 2.186 2.169 1.434 0 2.186-.938 2.186-2.169 0-1.23-.752-2.169-2.186-2.169-1.513 0-2.186 1.024-2.186 2.169z"/>
          </svg>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 left-1/4 text-purple-400/10"
        >
          <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5c-.706 0-1.1-.391-1.1-1.1v-5.041c0-.71.394-1.101 1.1-1.101h5c.709 0 1.1.391 1.1 1.1v2.62zm-8.5-11.51h-1.5v-2.42h-5v2.42h-1.5l4 4zm-13.5 4.5c0 .709-.391 1.101-1.1 1.101h-1.4v5.041c0 .709.391 1.1 1.1 1.1h5c.709 0 1.1-.391 1.1-1.1v-5.041h-1.4c-.709 0-1.1-.392-1.1-1.101v-8.42c0-.71.391-1.1 1.1-1.1h1.4v-.42c0-.709-.391-1.1-1.1-1.1h-5c-.709 0-1.1.391-1.1 1.1v10.94z"/>
          </svg>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 text-green-400/10"
        >
          <Download className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative px-8 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-2">Extensions</h2>
          <p className="text-white/60 mb-8">Connect your anime tracking accounts</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* MyAnimeList Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] p-8 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-3xl border border-blue-400/30">
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
            <Button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white rounded-full">
              <Link2 className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
              Settings
            </Button>
          </div>
        </motion.div>

        {/* AniList Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] p-8 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-3xl border border-purple-400/30">
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
            <Button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-white rounded-full">
              <Link2 className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
              Settings
            </Button>
          </div>
          </motion.div>

          {/* Wallpaper Extension Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] p-8 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-3xl border border-pink-400/30">
                  <Image className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">Wallpapers</h3>
                  <p className="text-white/60 text-sm">Customize backgrounds</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Current Theme</span>
                <span className="text-white font-semibold">Aurora Dreams</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Available Packs</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Custom Uploads</span>
                <span className="text-white font-semibold">5</span>
              </div>
            </div>

            {/* Wallpaper Preview Grid */}
            <div className="mb-6 grid grid-cols-3 gap-2">
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl border-2 border-white/40 shadow-lg" />
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl border border-white/20 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
              <div className="aspect-video bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl border border-white/20 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-white rounded-full">
                <Palette className="w-4 h-4 mr-2" />
                Browse Themes
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
                Upload
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Real-Debrid Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-[32px] p-8 shadow-2xl"
        >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-3xl border border-green-400/30">
              <Download className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">Real-Debrid</h3>
              <p className="text-white/60 text-sm">Premium streaming & downloads</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Connected</span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-sm">Status</span>
            </div>
            <span className="text-white font-semibold">Premium</span>
          </div>
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-4 h-4 text-blue-400" />
              <span className="text-white/70 text-sm">Downloads</span>
            </div>
            <span className="text-white font-semibold">Unlimited</span>
          </div>
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
              <span className="text-white/70 text-sm">Expires</span>
            </div>
            <span className="text-white font-semibold">45 Days</span>
          </div>
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-white/70 text-sm">Traffic</span>
            </div>
            <span className="text-white font-semibold">342 GB</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-white rounded-full">
            <Link2 className="w-4 h-4 mr-2" />
            Sync Account
          </Button>
          <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
            <Download className="w-4 h-4 mr-2" />
            View Downloads
          </Button>
          <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
            Settings
          </Button>
          <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            Manage Torrents
          </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] p-6"
        >
          <h3 className="text-white text-lg font-semibold mb-3">Extension Features</h3>
          <div className="grid md:grid-cols-5 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Auto Sync</p>
              <p className="text-white/60 text-xs">Automatically sync watch progress</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Quick Links</p>
              <p className="text-white/60 text-xs">Access MAL & AniList from cards</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Rating Display</p>
              <p className="text-white/60 text-xs">Show ratings from both platforms</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Premium Streaming</p>
              <p className="text-white/60 text-xs">Unrestricted debrid downloads</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-2xl">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Custom Wallpapers</p>
              <p className="text-white/60 text-xs">Personalize your experience</p>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
