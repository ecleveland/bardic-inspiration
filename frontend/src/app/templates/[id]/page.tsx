'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import type { Template, Spell, Genre } from '@/lib/types';
import { getTemplate } from '@/lib/api';
import LyricsDisplay from '@/components/LyricsDisplay';
import SpellLevelBadge from '@/components/SpellLevelBadge';
import GenreBadge from '@/components/GenreBadge';
import LoadingBard from '@/components/LoadingBard';

export default function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTemplate(id)
      .then(setTemplate)
      .catch(() => setError('Failed to load template.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingBard className="min-h-[60vh]" />;
  if (error || !template) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400">{error || 'Template not found.'}</p>
        <Link href="/templates" className="text-violet-400 hover:text-violet-300 mt-4 inline-block">
          &larr; Back to Templates
        </Link>
      </div>
    );
  }

  const spell = typeof template.spellId === 'object' ? (template.spellId as Spell) : null;
  const genre = typeof template.genreId === 'object' ? (template.genreId as Genre) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/templates" className="text-sm text-violet-400 hover:text-violet-300 mb-6 inline-block">
        &larr; Back to Templates
      </Link>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {spell && (
          <Link
            href={`/spells/${spell._id}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-violet-500/40 transition-colors"
          >
            <span className="text-sm text-slate-300">{spell.name}</span>
            <SpellLevelBadge level={spell.level} />
          </Link>
        )}
        {genre && <GenreBadge name={genre.name} category={genre.category} />}
        {template.isFeatured && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            &#9733; Featured
          </span>
        )}
      </div>

      <LyricsDisplay
        title={template.title}
        verses={template.verses}
        chorus={template.chorus}
        bridge={template.bridge}
      />

      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-6">
          {template.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href={`/generate${spell ? `?spellId=${spell._id}` : ''}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all"
        >
          Generate a New Version &#9835;
        </Link>
      </div>
    </div>
  );
}
