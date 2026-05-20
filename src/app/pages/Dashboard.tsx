import { Sidebar } from "../components/Sidebar";
import { HeroBanner } from "../components/HeroBanner";
import { AnimeRow, Anime } from "../components/AnimeRow";

const TRENDING_ANIME: Anime[] = [
  {
    id: "1",
    title: "Demon Slayer: Swordsmith Village",
    image: "https://images.unsplash.com/photo-1758496679785-257271f05454?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "8.8",
    episodes: "Ep 11 / 11",
    status: "Finished Airing"
  },
  {
    id: "2",
    title: "Jujutsu Kaisen Season 2",
    image: "https://images.unsplash.com/photo-1775493215738-ce3f99320bb1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "9.2",
    episodes: "Ep 23 / 23",
    status: "Finished Airing"
  },
  {
    id: "3",
    title: "Frieren: Beyond Journey's End",
    image: "https://images.unsplash.com/photo-1581132285926-a4c91a76ef14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "9.4",
    episodes: "Ep 28 / 28",
    status: "Finished Airing"
  },
  {
    id: "4",
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1658633385412-a9d6d921571f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "8.5",
    episodes: "Ep 12 / 12",
    status: "Finished Airing"
  },
  {
    id: "5",
    title: "Cyberpunk: Edgerunners",
    image: "https://images.unsplash.com/photo-1613487971624-24f87ffdbfc5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "8.9",
    episodes: "Ep 10 / 10",
    status: "Finished Airing"
  }
];

const CONTINUE_WATCHING: Anime[] = [
  {
    id: "6",
    title: "Frieren: Beyond Journey's End",
    image: "https://images.unsplash.com/photo-1581132285926-a4c91a76ef14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "9.4",
    episodes: "Watching Ep 14",
    status: "Left at 12:45"
  },
  {
    id: "7",
    title: "Jujutsu Kaisen Season 2",
    image: "https://images.unsplash.com/photo-1775493215738-ce3f99320bb1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800",
    score: "9.2",
    episodes: "Watching Ep 2",
    status: "Left at 04:20"
  }
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-neutral-50 overflow-hidden flex">
      <Sidebar />
      
      <main className="flex-1 ml-20 h-screen overflow-y-auto scrollbar-hide relative z-10">
        <div className="max-w-[2000px] mx-auto p-8 lg:p-12 pb-32">
          {/* Top Bar for Dashboard (optional search/profile can go here, but sidebar handles it) */}
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white/90">Discover</h2>
            <div className="flex gap-4">
              {/* Optional top-right controls */}
            </div>
          </header>

          <HeroBanner />
          
          <AnimeRow title="Continue Watching" animes={CONTINUE_WATCHING} />
          <AnimeRow title="Trending on AniList" animes={TRENDING_ANIME} />
          <AnimeRow title="Highest Rated All Time" animes={[...TRENDING_ANIME].reverse()} />
        </div>
      </main>

      {/* Global Background Ambient Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>
    </div>
  );
}