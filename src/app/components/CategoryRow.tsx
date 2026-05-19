import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { AnimeCard } from './AnimeCard';

interface Anime {
  id: number;
  title: string;
  image: string;
  rating?: string;
  episodes?: number;
  malId?: string;
  anilistId?: string;
  malRating?: string;
  anilistRating?: string;
}

interface CategoryRowProps {
  title: string;
  animes: Anime[];
}

export function CategoryRow({ title, animes }: CategoryRowProps) {
  return (
    <div className="mb-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6 px-16"
      >
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <button className="flex items-center gap-1 text-white/60 hover:text-white transition-colors group">
          <span className="text-sm">View All</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animes.map((anime, index) => (
            <AnimeCard
              key={anime.id}
              title={anime.title}
              image={anime.image}
              rating={anime.rating}
              episodes={anime.episodes}
              malId={anime.malId}
              anilistId={anime.anilistId}
              malRating={anime.malRating}
              anilistRating={anime.anilistRating}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
