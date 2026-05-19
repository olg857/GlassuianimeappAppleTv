import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface DebridBadgeProps {
  available?: boolean;
}

export function DebridBadge({ available = false }: DebridBadgeProps) {
  if (!available) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute top-3 right-3 z-10"
    >
      <div className="backdrop-blur-xl bg-green-500/20 border border-green-400/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
        <Zap className="w-3.5 h-3.5 text-green-400 fill-green-400" />
        <span className="text-green-300 text-xs font-semibold">RD</span>
      </div>
    </motion.div>
  );
}
