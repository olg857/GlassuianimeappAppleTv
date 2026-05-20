import { motion } from "motion/react";
import { Star, Play, Plus } from "lucide-react";
import { Link } from "react-router";
import { GlassPanel } from "./GlassPanel";

export function HeroBanner() {
  return (
    <div className="relative w-full aspect-[21/9] min-h-[400px] max-h-[700px] rounded-[40px] overflow-hidden mb-12 shadow-2xl">
      <img 
        src="https://images.unsplash.com/photo-1613487971624-24f87ffdbfc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhbmltZSUyMGNpdHl8ZW58MXx8fHwxNzc5MjM5NDMzfDA&ixlib=rb-4.1.0&q=80&w=1920" 
        alt="Featured Anime"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient Overlays for readability and cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

      <div className="absolute inset-0 p-12 sm:p-16 flex flex-col justify-end z-10 w-full md:w-2/3 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* AniList Badge */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider text-white border border-white/20 shadow-sm">
              TRENDING #1
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#02A9FF]/20 backdrop-blur-md rounded-full border border-[#02A9FF]/30 text-white shadow-sm">
              <Star className="w-3.5 h-3.5 text-[#02A9FF] fill-[#02A9FF]" />
              <span className="text-xs font-bold">8.9</span>
            </div>
            <span className="text-white/60 text-sm font-medium">TV • 24 Eps</span>
          </div>

          {/* Title & Synopsis */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Cyberpunk<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Edgerunners</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed drop-shadow-md">
              In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <Link to="/watch">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <Play className="w-5 h-5 fill-black" />
                <span>Play Episode 1</span>
              </button>
            </Link>
            <GlassPanel className="p-0 rounded-full bg-black/20 border-white/20 cursor-pointer hover:bg-white/10 transition-colors">
              <div className="px-6 py-4 flex items-center gap-3">
                <Plus className="w-5 h-5 text-white" />
                <span className="text-white font-medium">My List</span>
              </div>
            </GlassPanel>
          </div>
        </motion.div>
      </div>
    </div>
  );
}