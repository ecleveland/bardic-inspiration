'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import type { Spell, Template } from '@/lib/types';
import { getSpell, getTemplates } from '@/lib/api';
import SpellLevelBadge from '@/components/SpellLevelBadge';
import TemplateCard from '@/components/TemplateCard';
import LoadingBard from '@/components/LoadingBard';

export default function SpellDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [spell, setSpell] = useState<Spell | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [s, t] = await Promise.all([
          getSpell(id),
          getTemplates({ spellId: id }).catch(() => [] as Template[]),
        ]);
        setSpell(s);
        setTemplates(t);
      } catch {
        setError('Failed to load spell.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <LoadingBard className="min-h-[60vh]" />;
  if (error || !spell) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-400">{error || 'Spell not found.'}</p>
        <Link href="/spells" className="text-violet-400 hover:text-violet-300 mt-4 inline-block">
          &larr; Back to Spells
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/spells" className="text-sm text-violet-400 hover:text-violet-300 mb-6 inline-block">
        &larr; Back to Spells
      </Link>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-100">{spell.name}</h1>
          <SpellLevelBadge level={spell.level} className="text-sm px-3 py-1" />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 rounded-lg bg-slate-700/50 text-sm text-slate-300 capitalize">
            {spell.school}
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-700/50 text-sm text-slate-300 capitalize">
            {spell.type.replace('_', ' ')}
          </span>
          {spell.subclass && (
            <span className="px-3 py-1 rounded-lg bg-violet-600/20 text-sm text-violet-300">
              {spell.subclass}
            </span>
          )}
        </div>

        <p className="text-slate-300 leading-relaxed mb-4">{spell.description}</p>

        {spell.flavorText && (
          <blockquote className="border-l-2 border-amber-500/50 pl-4 text-sm text-amber-300/80 italic">
            {spell.flavorText}
          </blockquote>
        )}

        {spell.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6">
            {spell.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded bg-slate-700/50 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Songs for this Spell</h2>
        <Link
          href={`/generate?spellId=${spell._id}`}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all"
        >
          Generate Lyrics &#9835;
        </Link>
      </div>

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((t) => (
            <TemplateCard key={t._id} template={t} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-8">
          No curated songs yet for this spell. Be the first to generate one!
        </p>
      )}
    </div>
  );
}
