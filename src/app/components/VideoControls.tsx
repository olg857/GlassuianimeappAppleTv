import { Play, Pause, Volume2, Maximize, SkipForward, Settings, Subtitles } from "lucide-react";
import { useState } from "react";
import { GlassPanel } from "./GlassPanel";

export function VideoControls() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[80%] max-w-4xl">
      <GlassPanel className="p-3 px-6 flex flex-col gap-2 bg-black/20 backdrop-blur-[64px]">
        {/* Progress Bar */}
        <div className="w-full group cursor-pointer py-2 flex items-center gap-4">
          <span className="text-xs text-white/70 font-medium font-mono">14:23</span>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-[60%] bg-white rounded-full group-hover:bg-indigo-400 transition-colors" />
          </div>
          <span className="text-xs text-white/70 font-medium font-mono">23:40</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-white text-black rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <div className="flex items-center gap-2 group">
              <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
              <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 h-1.5 bg-white/20 rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-[80%] bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Subtitles className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}