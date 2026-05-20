import { motion } from "motion/react";
import { ChevronLeft, Users, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { ContinuityCamera } from "../components/ContinuityCamera";
import { WatchSidebar } from "../components/WatchSidebar";
import { VideoControls } from "../components/VideoControls";
import { FloatingEmojis } from "../components/FloatingEmojis";
import { GlassPanel } from "../components/GlassPanel";
import { cn } from "../../lib/utils";

export function WatchTogether() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center font-sans">
      <motion.div 
        className="relative w-full h-full max-w-[2000px] max-h-[1200px] overflow-hidden bg-neutral-900 rounded-none sm:rounded-3xl sm:m-4 sm:h-[calc(100vh-2rem)] shadow-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 30, 
          mass: 0.8,
          duration: 0.8 
        }}
      >
        {/* Cinematic Video Background (Simulated) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554310603-d39d43033735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzkwODA3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1920" 
            alt="Anime Landscape"
            className="w-full h-full object-cover filter saturate-150"
          />
          {/* Subtle gradient overlays for UI contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 z-40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <GlassPanel className="p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer border-white/10 shadow-none">
                <ChevronLeft className="w-6 h-6 text-white" />
              </GlassPanel>
            </Link>
            
            <GlassPanel className="px-6 py-3 rounded-full border-white/10 flex items-center gap-3 bg-black/20">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-medium tracking-wide">Watch Party</span>
              <div className="w-px h-4 bg-white/20 mx-2" />
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1777790769480-0cd6199be2f0?w=100&h=100&fit=crop" className="w-6 h-6 rounded-full border border-white/20" alt="user" />
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" className="w-6 h-6 rounded-full border border-white/20" alt="user" />
                <div className="w-6 h-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-white">
                  +3
                </div>
              </div>
            </GlassPanel>
          </div>

          <div className="flex items-center gap-4">
            <GlassPanel className="flex p-1.5 rounded-full bg-black/20 border-white/10">
              <button className="p-2.5 rounded-full hover:bg-white/10 text-white transition-colors group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-white/10 text-white transition-colors group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn(
                  "p-2.5 rounded-full text-white transition-colors group",
                  isSidebarOpen ? "bg-white/20" : "hover:bg-white/10"
                )}
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </GlassPanel>
          </div>
        </div>

        {/* Feature Components */}
        <ContinuityCamera />
        <WatchSidebar isOpen={isSidebarOpen} />
        <FloatingEmojis />
        <VideoControls />
      </motion.div>
    </div>
  );
}