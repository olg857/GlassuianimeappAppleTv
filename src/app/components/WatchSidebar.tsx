import { motion } from "motion/react";
import { MessageCircle, Heart, Flame, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassPanel } from "./GlassPanel";

const CHAT_MESSAGES = [
  { id: 1, user: "Kirito22", avatar: "https://images.unsplash.com/photo-1777790769480-0cd6199be2f0?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80", text: "This animation sequence is absolutely insane! 🔥" },
  { id: 2, user: "Asuna_Fan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80", text: "Right?? The lighting effects!" },
  { id: 3, user: "ZeroTwo", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80", text: "I've been waiting all week for this episode." },
  { id: 4, user: "LeviAck", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80", text: "Studio went all out." },
];

export function WatchSidebar({ isOpen }: { isOpen: boolean }) {
  const [activeTab, setActiveTab] = useState<"chat" | "info">("chat");

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: isOpen ? 0 : "100%", opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-4 bottom-24 right-4 w-80 z-40 origin-right"
    >
      <GlassPanel className="w-full h-full flex flex-col p-4 bg-black/10 backdrop-blur-[80px]">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 p-1 bg-white/5 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-medium transition-colors ${activeTab === "chat" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            Live Chat
          </button>
          <button 
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-medium transition-colors ${activeTab === "info" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"}`}
          >
            AniList
          </button>
        </div>

        {/* Content */}
        {activeTab === "chat" ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-hide flex flex-col justify-end">
              {CHAT_MESSAGES.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full border border-white/20 shadow-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-0.5 font-medium">{msg.user}</p>
                    <p className="text-white/90 text-sm leading-snug">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="pt-3 border-t border-white/10 relative">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Say something..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-colors"
                />
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
              
              {/* Quick Reactions */}
              <div className="flex gap-2 mt-3 justify-center">
                {[Heart, Flame, Sparkles].map((Icon, idx) => (
                  <button key={idx} className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-y-auto text-white">
            <h3 className="text-lg font-medium mb-1">Demon Slayer: Kimetsu no Yaiba</h3>
            <p className="text-white/60 text-sm mb-4">Episode 19 - Hinokami</p>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Synopsis</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  Tanjiro is backed into a corner by Rui's Blood Demon Art. As he prepares to face death, he recalls his father's kagura dance and unleashes a new power.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Score</p>
                  <p className="text-xl font-semibold text-green-400">9.8</p>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Status</p>
                  <p className="text-sm font-medium">Airing</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );
}