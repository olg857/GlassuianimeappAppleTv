import { motion } from 'motion/react';
import { Play, Info, Volume2, VolumeX, Users } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  rating?: string;
  year?: string;
  onWatchTogether?: () => void;
}

export function HeroSection({ title, description, image, rating, year, onWatchTogether }: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24 px-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Glass Container */}
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl font-bold text-white mb-4"
            >
              {title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              {rating && (
                <span className="px-4 py-1.5 bg-yellow-500/30 backdrop-blur-sm border border-yellow-500/50 rounded-full text-yellow-300 font-semibold">
                  ★ {rating}
                </span>
              )}
              {year && <span className="text-white/80 text-lg">{year}</span>}
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90">
                HD
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white/90 text-lg mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-4"
            >
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg rounded-full"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onWatchTogether}
                className="bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border-purple-400/30 text-white px-8 py-6 text-lg rounded-full"
              >
                <Users className="w-5 h-5 mr-2" />
                Watch Together
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white px-8 py-6 text-lg rounded-full"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mute Button */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-32 right-16 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full transition-all"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
