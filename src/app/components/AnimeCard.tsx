import { motion } from 'motion/react';
import { Play, Info, Plus, Users } from 'lucide-react';
import { Button } from './ui/button';
import { ExternalLinks } from './ExternalLinks';
import { DebridBadge } from './DebridBadge';

interface AnimeCardProps {
  title: string;
  image: string;
  rating?: string;
  episodes?: number;
  isLarge?: boolean;
  delay?: number;
  malId?: string;
  anilistId?: string;
  malRating?: string;
  anilistRating?: string;
  debridAvailable?: boolean;
  onWatchTogether?: () => void;
}

export function AnimeCard({ title, image, rating, episodes, isLarge, delay = 0, malId, anilistId, malRating, anilistRating, debridAvailable, onWatchTogether }: AnimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${
        isLarge ? 'h-[400px]' : 'h-[280px]'
      }`}
    >
      {/* Debrid Badge */}
      <DebridBadge available={debridAvailable} />

      {/* Image */}
      <div className="w-full h-full">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Glass Card Info */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 shadow-2xl">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          
          <div className="flex items-center gap-3 mb-3 text-sm text-white/80">
            {rating && <span className="px-3 py-1.5 bg-yellow-500/20 rounded-full">{rating}</span>}
            {episodes && <span>{episodes} Episodes</span>}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <ExternalLinks
              malId={malId}
              anilistId={anilistId}
              malRating={malRating}
              anilistRating={anilistRating}
            />
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 mt-3">
            <Button
              size="sm"
              className="flex-1 bg-white hover:bg-white/90 text-black rounded-full"
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-purple-500/20 hover:bg-purple-500/30 border-purple-400/30 text-white rounded-full aspect-square p-0"
              onClick={(e) => {
                e.stopPropagation();
                onWatchTogether?.();
              }}
            >
              <Users className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white rounded-full aspect-square p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white rounded-full aspect-square p-0"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
