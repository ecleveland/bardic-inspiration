'use client';

import { useState, useEffect } from 'react';
import type { Template } from '@/lib/types';
import { getTemplates } from '@/lib/api';
import TemplateCard from './TemplateCard';

export default function FeaturedTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTemplates({ featured: 'true' })
      .then(setTemplates)
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  if (templates.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-6">
        <span className="text-amber-400">&#9733;</span> Featured Songs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>
    </div>
  );
}
