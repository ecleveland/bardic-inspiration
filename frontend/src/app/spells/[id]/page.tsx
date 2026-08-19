'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import type { Spell, Template } from '@/lib/types';
import { getSpell, getTemplates } from '@/lib/api';
import SpellLevelBadge from '@/components/SpellLevelBadge';
import TemplateCard from '@/components/TemplateCard';
import LoadingBard from '@/components/LoadingBard';
import { Badge, Card, CardGrid, EmptyState } from '@/components/ui';

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
      <EmptyState
        title={error || 'Spell not found.'}
        action={{ label: '\u2190 Back to Spells', href: '/spells' }}
        className="min-h-[40vh]"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/spells" className="text-sm text-violet-400 hover:text-violet-300 mb-6 inline-block">
        &larr; Back to Spells
      </Link>

      <Card variant="default" padding="lg" className="bg-slate-800/60 mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-100">{spell.name}</h1>
          <SpellLevelBadge level={spell.level} className="text-sm px-3 py-1" />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Badge size="md" className="rounded-lg bg-slate-700/50 text-slate-300 px-3 py-1 text-sm capitalize">
            {spell.school}
          </Badge>
          <Badge size="md" className="rounded-lg bg-slate-700/50 text-slate-300 px-3 py-1 text-sm capitalize">
            {spell.type.replace('_', ' ')}
          </Badge>
          {spell.subclass && (
            <Badge size="md" className="rounded-lg bg-violet-600/20 text-violet-300 px-3 py-1 text-sm">
              {spell.subclass}
            </Badge>
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
              <Badge key={tag} className="bg-slate-700/50 text-slate-400">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Card>

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
        <CardGrid columns={2}>
          {templates.map((t) => (
            <TemplateCard key={t._id} template={t} />
          ))}
        </CardGrid>
      ) : (
        <EmptyState
          title="No curated songs yet for this spell."
          description="Be the first to generate one!"
          className="py-8"
        />
      )}
    </div>
  );
}
