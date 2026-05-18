import { motion } from 'motion/react';
import { Play, Info, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AnimeCardProps {
  title: string;
  image: string;
  rating?: string;
  episodes?: number;
  isLarge?: boolean;
  delay?: number;
}

export function AnimeCard({ title, image, rating, episodes, isLarge, delay = 0 }: AnimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        isLarge ? 'h-[400px]' : 'h-[280px]'
      }`}
    >
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
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-2xl">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          
          <div className="flex items-center gap-3 mb-4 text-sm text-white/80">
            {rating && <span className="px-2 py-1 bg-yellow-500/20 rounded-md">{rating}</span>}
            {episodes && <span>{episodes} Episodes</span>}
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <Button 
              size="sm" 
              className="flex-1 bg-white hover:bg-white/90 text-black"
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
