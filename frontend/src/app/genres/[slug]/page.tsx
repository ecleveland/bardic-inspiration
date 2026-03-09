'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import type { Genre } from '@/lib/types';
import { getGenre } from '@/lib/api';
import GenreBadge from '@/components/GenreBadge';
import LoadingBard from '@/components/LoadingBard';

export default function GenreDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getGenre(slug)
      .then(setGenre)
      .catch(() => setError('Failed to load genre.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingBard className="min-h-[60vh]" />;
  if (error || !genre) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400">{error || 'Genre not found.'}</p>
        <Link href="/genres" className="text-violet-400 hover:text-violet-300 mt-4 inline-block">
          &larr; Back to Genres
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/genres" className="text-sm text-violet-400 hover:text-violet-300 mb-6 inline-block">
        &larr; Back to Genres
      </Link>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-100">{genre.name}</h1>
          <GenreBadge name={genre.category} category={genre.category} />
        </div>

        <p className="text-slate-300 leading-relaxed mb-6">{genre.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">
              Style Guide
            </h3>
            <p className="text-sm text-slate-400">{genre.styleGuide}</p>
          </div>

          {genre.meterPattern && (
            <div>
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">
                Meter Pattern
              </h3>
              <code className="text-sm text-amber-300 bg-slate-900/50 px-3 py-1.5 rounded-lg inline-block">
                {genre.meterPattern}
              </code>
            </div>
          )}

          {genre.rhymeScheme && (
            <div>
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">
                Rhyme Scheme
              </h3>
              <code className="text-sm text-amber-300 bg-slate-900/50 px-3 py-1.5 rounded-lg inline-block">
                {genre.rhymeScheme}
              </code>
            </div>
          )}

          {genre.exampleLines.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2">
                Example Lines
              </h3>
              <div className="bg-slate-900/40 rounded-xl p-4 space-y-2">
                {genre.exampleLines.map((line, i) => (
                  <p key={i} className="text-sm text-slate-300 italic">
                    &ldquo;{line}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all"
          >
            Generate with this Genre &#9835;
          </Link>
        </div>
      </div>
    </div>
  );
}
