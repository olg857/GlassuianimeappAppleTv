import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryRow } from './components/CategoryRow';

export default function App() {
  const trendingAnimes = [
    {
      id: 1,
      title: 'Demon Slayer',
      image: 'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMGFuaW1lJTIwcG9zdGVyfGVufDF8fHx8MTc3OTE0Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.2',
      episodes: 26,
    },
    {
      id: 2,
      title: 'Attack on Titan',
      image: 'https://images.unsplash.com/photo-1658233427270-ba4d9d03b53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRhY2slMjBvbiUyMHRpdGFuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.1',
      episodes: 87,
    },
    {
      id: 3,
      title: 'Jujutsu Kaisen',
      image: 'https://images.unsplash.com/photo-1722573783570-9811ce67025e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWp1dHN1JTIwa2Fpc2VuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.9',
      episodes: 47,
    },
    {
      id: 4,
      title: 'My Hero Academia',
      image: 'https://images.unsplash.com/photo-1668119064420-fb738fb05e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteSUyMGhlcm8lMjBhY2FkZW1pYSUyMGFuaW1lfGVufDF8fHx8MTc3OTE0Mjk0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.7',
      episodes: 113,
    },
    {
      id: 5,
      title: 'One Piece',
      image: 'https://images.unsplash.com/photo-1621478374422-35206faeddfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmUlMjBwaWVjZSUyMGFuaW1lJTIwbHVmZnl8ZW58MXx8fHwxNzc5MTQyOTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 1074,
    },
  ];

  const newReleases = [
    {
      id: 6,
      title: 'Chainsaw Man',
      image: 'https://images.unsplash.com/photo-1762681829607-c188e04a4bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFpbnNhdyUyMG1hbiUyMGFuaW1lfGVufDF8fHx8MTc3OTE0Mjk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.6',
      episodes: 12,
    },
    {
      id: 7,
      title: 'Spy x Family',
      image: 'https://images.unsplash.com/photo-1720636440389-2429e032e39d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHklMjBmYW1pbHklMjBhbmltZXxlbnwxfHx8fDE3NzkxNDI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 25,
    },
    {
      id: 8,
      title: 'Naruto Shippuden',
      image: 'https://images.unsplash.com/photo-1594007759138-855170ec8dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXJ1dG8lMjBhbmltZSUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NzkxNDI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.0',
      episodes: 500,
    },
    {
      id: 9,
      title: 'Tokyo Ghoul',
      image: 'https://images.unsplash.com/photo-1582146279773-db6f4990b8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMHN0dWRpbyUyMGJhY2tncm91bmQlMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.4',
      episodes: 48,
    },
    {
      id: 10,
      title: 'Death Note',
      image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwbmVvbiUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzkxNDI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.3',
      episodes: 37,
    },
  ];

  const myList = [
    {
      id: 11,
      title: 'Fullmetal Alchemist',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZhbnRhc3klMjBtYWdpY3xlbnwxfHx8fDE3NzkxNDI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.4',
      episodes: 64,
    },
    {
      id: 12,
      title: 'Steins Gate',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwbmVvbnxlbnwxfHx8fDE3NzkxNDI5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.1',
      episodes: 24,
    },
    {
      id: 13,
      title: 'Hunter x Hunter',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGFjdGlvbiUyMGZpZ2h0fGVufDF8fHx8MTc3OTE0Mjk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.2',
      episodes: 148,
    },
    {
      id: 14,
      title: 'Cowboy Bebop',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaWVuY2UlMjBmaWN0aW9ufGVufDF8fHx8MTc3OTE0Mjk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.9',
      episodes: 26,
    },
    {
      id: 15,
      title: 'Code Geass',
      image: 'https://images.unsplash.com/photo-1574473542234-20b8e1a8b14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYSUyMHJvYm90JTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navbar />
      
      <HeroSection
        title="Demon Slayer"
        description="A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister."
        image="https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMGFuaW1lJTIwcG9zdGVyfGVufDF8fHx8MTc3OTE0Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
        rating="9.2"
        year="2019"
      />

      <div className="relative -mt-32">
        <CategoryRow title="My List" animes={myList} />
        <CategoryRow title="Trending Now" animes={trendingAnimes} />
        <CategoryRow title="New Releases" animes={newReleases} />
      </div>
    </div>
  );
}
