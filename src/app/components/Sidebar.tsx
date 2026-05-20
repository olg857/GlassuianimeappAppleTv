import { Home, Compass, Library, Search, Settings, Link as LinkIcon, Star, Play, Plus, ChevronRight, Crown } from "lucide-react";
import { Link, useLocation } from "react-router";
import { GlassPanel } from "./GlassPanel";
import { cn } from "../../lib/utils";

export function Sidebar() {
  const location = useLocation();

  const NAV_ITEMS = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Discover", path: "/discover" },
    { icon: Library, label: "My List", path: "/library" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Crown, label: "Membership", path: "/membership" },
  ];

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 hover:w-64 z-50 transition-all duration-300 group flex flex-col p-4">
      <GlassPanel className="flex-1 flex flex-col py-6 px-3 bg-black/20 border-white/10 overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2 mb-10 overflow-hidden whitespace-nowrap">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
          <span className="text-xl font-medium tracking-tight text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            AnimeTV
          </span>
        </div>

        {/* Main Nav */}
        <div className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.label} to={item.path}>
                <div className={cn(
                  "flex items-center gap-4 px-2 py-3 rounded-2xl transition-all duration-300 overflow-hidden whitespace-nowrap",
                  isActive ? "bg-white/20 text-white shadow-sm" : "text-white/50 hover:bg-white/10 hover:text-white"
                )}>
                  <item.icon className="w-6 h-6 shrink-0" />
                  <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* AniList Sync Status */}
        <div className="mt-auto mb-6 px-2 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-4 p-2 rounded-2xl bg-[#02A9FF]/10 border border-[#02A9FF]/20 text-[#02A9FF]">
            <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1658633385412-a9d6d921571f?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=100&h=100&q=80" 
                alt="User" 
                className="w-8 h-8 rounded-full border border-[#02A9FF]/40 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#02A9FF] border-2 border-black flex items-center justify-center">
                <LinkIcon className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#02A9FF]/80">AniList Synced</span>
              <span className="text-sm font-medium text-white">ShounenFan99</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center gap-4 px-2 py-3 rounded-2xl text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 overflow-hidden whitespace-nowrap cursor-pointer">
          <Settings className="w-6 h-6 shrink-0" />
          <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Settings
          </span>
        </div>
      </GlassPanel>
    </nav>
  );
}