'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Template } from '@/lib/types';
import { getTemplates } from '@/lib/api';
import TemplateCard from '@/components/TemplateCard';
import LoadingBard from '@/components/LoadingBard';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'featured') return templates.filter((t) => t.isFeatured);
    return templates;
  }, [templates, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          &#127917; Curated Templates
        </h1>
        <p className="text-slate-400">Browse curated songs written for bard spells.</p>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
              : 'bg-slate-800 text-slate-400 border border-slate-700/50 hover:text-slate-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            filter === 'featured'
              ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
              : 'bg-slate-800 text-slate-400 border border-slate-700/50 hover:text-slate-300'
          }`}
        >
          &#9733; Featured
        </button>
      </div>

      {loading ? (
        <LoadingBard />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No templates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <TemplateCard key={template._id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
