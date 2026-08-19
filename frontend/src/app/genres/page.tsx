'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Genre } from '@/lib/types';
import { getGenres } from '@/lib/api';
import LoadingBard from '@/components/LoadingBard';
import { Card, CardGrid, EmptyState } from '@/components/ui';

function GenreCard({ genre }: { genre: Genre }) {
  const isFantasy = genre.category === 'fantasy';
  return (
    <Link href={`/genres/${genre.slug}`} className="block group">
      <Card
        variant="hoverable"
        className={`h-full group-hover:-translate-y-0.5 ${
          isFantasy
            ? 'border-violet-800/30 hover:border-violet-500/50 hover:shadow-violet-900/20'
            : 'border-sky-800/30 hover:border-sky-500/50 hover:shadow-sky-900/20'
        }`}
      >
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 transition-colors mb-2">
          {genre.name}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-3 mb-3">{genre.description}</p>
        {genre.exampleLines.length > 0 && (
          <p className="text-xs text-slate-500 italic line-clamp-2">
            &ldquo;{genre.exampleLines[0]}&rdquo;
          </p>
        )}
      </Card>
    </Link>
  );
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, []);

  const fantasy = genres.filter((g) => g.category === 'fantasy');
  const modern = genres.filter((g) => g.category === 'modern');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          &#127926; Musical Genres
        </h1>
        <p className="text-slate-400">
          Choose a musical style for your bardic performance.
        </p>
      </div>

      {loading ? (
        <LoadingBard />
      ) : (
        <div className="space-y-12">
          {fantasy.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-violet-400 mb-4 flex items-center gap-2">
                <span>&#9876;&#65039;</span> Fantasy Genres
              </h2>
              <CardGrid>
                {fantasy.map((g) => (
                  <GenreCard key={g._id} genre={g} />
                ))}
              </CardGrid>
            </section>
          )}
          {modern.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
                <span>&#127911;</span> Modern Genres
              </h2>
              <CardGrid>
                {modern.map((g) => (
                  <GenreCard key={g._id} genre={g} />
                ))}
              </CardGrid>
            </section>
          )}
          {genres.length === 0 && (
            <EmptyState title="No genres available." />
          )}
        </div>
      )}
    </div>
  );
}
