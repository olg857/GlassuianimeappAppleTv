import { motion } from "motion/react";
import { Maximize2, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { GlassPanel } from "./GlassPanel";

export function ContinuityCamera() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      initial={{ x: 32, y: 100, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.5 }}
      className="absolute top-16 left-8 z-50 cursor-grab touch-none group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <GlassPanel className="w-56 aspect-[3/4] p-1.5 overflow-hidden transition-all duration-300 shadow-2xl shadow-black/50">
        <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex items-center justify-center">
          {/* Simulated Portrait Mode & Center Stage */}
          {!isVideoOff ? (
            <motion.div 
              className="absolute inset-0 origin-center"
              initial={{ scale: 1.2 }}
              animate={{ 
                scale: [1.2, 1.25, 1.2],
                x: [0, 5, -5, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {/* Using the webcam person image */}
              <img 
                src="https://images.unsplash.com/photo-1713946598377-891884fa90de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3ZWJjYW0lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzkyMzkxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="You" 
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Simulated Portrait Blur Depth Map */}
              <div className="absolute inset-0 backdrop-blur-[2px] mask-image-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_100%)] pointer-events-none" />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-white/50 space-y-2">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-medium border border-white/20">
                You
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className={cn(
            "absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="flex gap-1.5 p-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isMuted ? "bg-red-500/80 text-white" : "hover:bg-white/20 text-white"
                )}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isVideoOff ? "bg-red-500/80 text-white" : "hover:bg-white/20 text-white"
                )}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>
              <button className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}