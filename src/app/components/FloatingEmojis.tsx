import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const EMOJIS = ["❤️", "🔥", "✨", "😂", "😮"];

export function FloatingEmojis() {
  const [activeEmojis, setActiveEmojis] = useState<{ id: number; emoji: string; left: number }[]>([]);

  useEffect(() => {
    // Simulate random incoming reactions
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newEmoji = {
          id: Date.now(),
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          left: 80 + Math.random() * 15 // Float up along the right side (80-95%)
        };
        setActiveEmojis(prev => [...prev.slice(-15), newEmoji]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {activeEmojis.map(item => (
          <motion.div
            key={item.id}
            initial={{ y: "100vh", opacity: 0, scale: 0.5, x: 0 }}
            animate={{ 
              y: "-20vh", 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.8],
              x: Math.sin(item.id) * 50 // Wavy floating motion
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute bottom-0 text-3xl filter drop-shadow-lg"
            style={{ left: `${item.left}%` }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}