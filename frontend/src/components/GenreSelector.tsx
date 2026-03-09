'use client';

import { useState, useEffect } from 'react';
import type { Genre } from '@/lib/types';
import { getGenres } from '@/lib/api';

interface GenreSelectorProps {
  value: string;
  onChange: (genreId: string) => void;
}

export default function GenreSelector({ value, onChange }: GenreSelectorProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, []);

  const fantasyGenres = genres.filter((g) => g.category === 'fantasy');
  const modernGenres = genres.filter((g) => g.category === 'modern');

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">Choose a Genre</label>
      {loading ? (
        <p className="text-sm text-slate-500">Loading genres...</p>
      ) : genres.length === 0 ? (
        <p className="text-sm text-slate-500">No genres available</p>
      ) : (
        <div className="space-y-4">
          {fantasyGenres.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
                Fantasy
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {fantasyGenres.map((genre) => (
                  <button
                    key={genre._id}
                    type="button"
                    onClick={() => onChange(genre._id)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all border ${
                      value === genre._id
                        ? 'bg-violet-600/30 border-violet-500/60 text-violet-200 shadow-md shadow-violet-900/30'
                        : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-violet-500/40 hover:bg-slate-800/80'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {modernGenres.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">
                Modern
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {modernGenres.map((genre) => (
                  <button
                    key={genre._id}
                    type="button"
                    onClick={() => onChange(genre._id)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all border ${
                      value === genre._id
                        ? 'bg-sky-600/30 border-sky-500/60 text-sky-200 shadow-md shadow-sky-900/30'
                        : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-sky-500/40 hover:bg-slate-800/80'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
