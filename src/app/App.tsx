import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryRow } from './components/CategoryRow';
import { ExtensionSettings } from './components/ExtensionSettings';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const trendingAnimes = [
    {
      id: 1,
      title: 'Demon Slayer',
      image: 'https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbiUyMHNsYXllciUyMGFuaW1lJTIwcG9zdGVyfGVufDF8fHx8MTc3OTE0Mjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.2',
      episodes: 26,
      malId: '38000',
      anilistId: '101922',
      malRating: '8.52',
      anilistRating: '84',
    },
    {
      id: 2,
      title: 'Attack on Titan',
      image: 'https://images.unsplash.com/photo-1658233427270-ba4d9d03b53c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRhY2slMjBvbiUyMHRpdGFuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.1',
      episodes: 87,
      malId: '16498',
      anilistId: '16498',
      malRating: '8.55',
      anilistRating: '85',
    },
    {
      id: 3,
      title: 'Jujutsu Kaisen',
      image: 'https://images.unsplash.com/photo-1722573783570-9811ce67025e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWp1dHN1JTIwa2Fpc2VuJTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.9',
      episodes: 47,
      malId: '40748',
      anilistId: '113415',
      malRating: '8.61',
      anilistRating: '86',
    },
    {
      id: 4,
      title: 'My Hero Academia',
      image: 'https://images.unsplash.com/photo-1668119064420-fb738fb05e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteSUyMGhlcm8lMjBhY2FkZW1pYSUyMGFuaW1lfGVufDF8fHx8MTc3OTE0Mjk0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.7',
      episodes: 113,
      malId: '31964',
      anilistId: '21459',
      malRating: '7.86',
      anilistRating: '77',
    },
    {
      id: 5,
      title: 'One Piece',
      image: 'https://images.unsplash.com/photo-1621478374422-35206faeddfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmUlMjBwaWVjZSUyMGFuaW1lJTIwbHVmZnl8ZW58MXx8fHwxNzc5MTQyOTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 1074,
      malId: '21',
      anilistId: '21',
      malRating: '8.72',
      anilistRating: '87',
    },
  ];

  const newReleases = [
    {
      id: 6,
      title: 'Chainsaw Man',
      image: 'https://images.unsplash.com/photo-1762681829607-c188e04a4bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFpbnNhdyUyMG1hbiUyMGFuaW1lfGVufDF8fHx8MTc3OTE0Mjk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.6',
      episodes: 12,
      malId: '44511',
      anilistId: '127230',
      malRating: '8.66',
      anilistRating: '87',
    },
    {
      id: 7,
      title: 'Spy x Family',
      image: 'https://images.unsplash.com/photo-1720636440389-2429e032e39d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHklMjBmYW1pbHklMjBhbmltZXxlbnwxfHx8fDE3NzkxNDI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 25,
      malId: '50265',
      anilistId: '140960',
      malRating: '8.52',
      anilistRating: '86',
    },
    {
      id: 8,
      title: 'Naruto Shippuden',
      image: 'https://images.unsplash.com/photo-1594007759138-855170ec8dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXJ1dG8lMjBhbmltZSUyMGNoYXJhY3RlcnxlbnwxfHx8fDE3NzkxNDI5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.0',
      episodes: 500,
      malId: '1735',
      anilistId: '1735',
      malRating: '8.27',
      anilistRating: '82',
    },
    {
      id: 9,
      title: 'Tokyo Ghoul',
      image: 'https://images.unsplash.com/photo-1582146279773-db6f4990b8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMHN0dWRpbyUyMGJhY2tncm91bmQlMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzc5MTQyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.4',
      episodes: 48,
      malId: '22319',
      anilistId: '20605',
      malRating: '7.79',
      anilistRating: '78',
    },
    {
      id: 10,
      title: 'Death Note',
      image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG5pZ2h0JTIwbmVvbiUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzkxNDI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.3',
      episodes: 37,
      malId: '1535',
      anilistId: '1535',
      malRating: '8.62',
      anilistRating: '84',
    },
  ];

  const myList = [
    {
      id: 11,
      title: 'Fullmetal Alchemist',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZhbnRhc3klMjBtYWdpY3xlbnwxfHx8fDE3NzkxNDI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.4',
      episodes: 64,
      malId: '5114',
      anilistId: '5114',
      malRating: '9.10',
      anilistRating: '90',
    },
    {
      id: 12,
      title: 'Steins Gate',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwbmVvbnxlbnwxfHx8fDE3NzkxNDI5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.1',
      episodes: 24,
      malId: '9253',
      anilistId: '9253',
      malRating: '9.07',
      anilistRating: '88',
    },
    {
      id: 13,
      title: 'Hunter x Hunter',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGFjdGlvbiUyMGZpZ2h0fGVufDF8fHx8MTc3OTE0Mjk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '9.2',
      episodes: 148,
      malId: '11061',
      anilistId: '11061',
      malRating: '9.04',
      anilistRating: '89',
    },
    {
      id: 14,
      title: 'Cowboy Bebop',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaWVuY2UlMjBmaWN0aW9ufGVufDF8fHx8MTc3OTE0Mjk0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.9',
      episodes: 26,
      malId: '1',
      anilistId: '1',
      malRating: '8.75',
      anilistRating: '86',
    },
    {
      id: 15,
      title: 'Code Geass',
      image: 'https://images.unsplash.com/photo-1574473542234-20b8e1a8b14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYSUyMHJvYm90JTIwYW5pbWV8ZW58MXx8fHwxNzc5MTQyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: '8.8',
      episodes: 50,
      malId: '1575',
      anilistId: '1575',
      malRating: '8.70',
      anilistRating: '85',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'Extensions' ? (
        <div className="pt-32">
          <ExtensionSettings />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
