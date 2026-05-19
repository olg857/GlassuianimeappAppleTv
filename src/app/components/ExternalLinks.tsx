import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ExternalLinksProps {
  malId?: string;
  anilistId?: string;
  malRating?: string;
  anilistRating?: string;
}

export function ExternalLinks({ malId, anilistId, malRating, anilistRating }: ExternalLinksProps) {
  return (
    <div className="flex gap-2 mt-3">
      {malId && (
        <motion.a
          href={`https://myanimelist.net/anime/${malId}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 backdrop-blur-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-full text-white text-sm transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 5.219h-1.1l-2.04-5.219v5.216h-2.1v-8.423h2.91l1.86 4.911 1.86-4.911zm2.103 0h2.1v6.388h3.636v2.035h-5.736zm17.624 4.219c0 2.213-1.553 4.204-4.297 4.204-2.905 0-4.296-2.092-4.296-4.204 0-2.11 1.391-4.204 4.296-4.204 2.744 0 4.297 1.991 4.297 4.204zm-6.483 0c0 1.146.673 2.169 2.186 2.169 1.434 0 2.186-.938 2.186-2.169 0-1.23-.752-2.169-2.186-2.169-1.513 0-2.186 1.024-2.186 2.169z"/>
          </svg>
          <span>MAL</span>
          {malRating && (
            <span className="px-2 py-0.5 bg-yellow-500/30 rounded-full text-xs font-semibold">
              {malRating}
            </span>
          )}
          <ExternalLink className="w-3 h-3 opacity-70" />
        </motion.a>
      )}

      {anilistId && (
        <motion.a
          href={`https://anilist.co/anime/${anilistId}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 backdrop-blur-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-full text-white text-sm transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5c-.706 0-1.1-.391-1.1-1.1v-5.041c0-.71.394-1.101 1.1-1.101h5c.709 0 1.1.391 1.1 1.1v2.62zm-8.5-11.51h-1.5v-2.42h-5v2.42h-1.5l4 4zm-13.5 4.5c0 .709-.391 1.101-1.1 1.101h-1.4v5.041c0 .709.391 1.1 1.1 1.1h5c.709 0 1.1-.391 1.1-1.1v-5.041h-1.4c-.709 0-1.1-.392-1.1-1.101v-8.42c0-.71.391-1.1 1.1-1.1h1.4v-.42c0-.709-.391-1.1-1.1-1.1h-5c-.709 0-1.1.391-1.1 1.1v10.94z"/>
          </svg>
          <span>AniList</span>
          {anilistRating && (
            <span className="px-2 py-0.5 bg-yellow-500/30 rounded-full text-xs font-semibold">
              {anilistRating}
            </span>
          )}
          <ExternalLink className="w-3 h-3 opacity-70" />
        </motion.a>
      )}
    </div>
  );
}
