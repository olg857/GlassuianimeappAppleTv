import { Link } from "react-router";
import { Play, Users, Tv } from "lucide-react";
import { GlassPanel } from "../components/GlassPanel";

export function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-8 text-neutral-50" style={{
      backgroundImage: `radial-gradient(circle at 50% 0%, #1e1b4b 0%, #000 70%)`
    }}>
      <GlassPanel className="p-12 max-w-2xl w-full flex flex-col items-center text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
        
        <div className="p-4 bg-white/5 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <Tv className="w-12 h-12 text-indigo-400" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-light tracking-tight">AnimeTV</h1>
          <p className="text-lg text-neutral-400 font-light max-w-md mx-auto">
            The ultimate glassmorphic cinematic experience. Join your friends in Watch Together mode.
          </p>
        </div>

        <Link 
          to="/watch" 
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          <Play className="w-5 h-5 fill-black" />
          <span>Enter Watch Together</span>
        </Link>
      </GlassPanel>
    </div>
  );
}