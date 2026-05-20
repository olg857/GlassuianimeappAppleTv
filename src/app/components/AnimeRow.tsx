import { Link } from "react-router";
import { Star, Play } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

export interface Anime {
  id: string;
  title: string;
  image: string;
  score: string;
  episodes: string;
  status: string;
}

export function AnimeRow({ title, animes }: { title: string; animes: Anime[] }) {
  return (
    <div className="mb-12">
      <div className="flex items-end justify-between mb-6 px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">{title}</h2>
        <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">
          See All
        </button>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 -mb-8 px-2 scrollbar-hide snap-x snap-mandatory">
        {animes.map((anime) => (
          <Link key={anime.id} to="/watch" className="snap-start shrink-0 group">
            <div className="w-[200px] sm:w-[240px] flex flex-col gap-4">
              <GlassPanel className="relative aspect-[2/3] p-0 w-full rounded-[24px] overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer">
                <img 
                  src={anime.image} 
                  alt={anime.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white">
                    <Star className="w-3 h-3 text-[#02A9FF] fill-[#02A9FF]" />
                    <span className="text-[11px] font-bold">{anime.score}</span>
                  </div>
                </div>

                {/* Lower info (inside poster) */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white mb-2 border border-white/10">
                    {anime.episodes}
                  </span>
                </div>
              </GlassPanel>
              
              <div className="px-2">
                <h3 className="text-white font-medium text-base truncate group-hover:text-indigo-300 transition-colors">
                  {anime.title}
                </h3>
                <p className="text-white/50 text-sm mt-1">{anime.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}