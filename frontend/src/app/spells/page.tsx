'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Spell } from '@/lib/types';
import { getSpells } from '@/lib/api';
import SpellCard from '@/components/SpellCard';
import LoadingBard from '@/components/LoadingBard';

export default function SpellsPage() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    getSpells()
      .then(setSpells)
      .catch(() => setSpells([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return spells.filter((s) => {
      if (levelFilter !== '' && s.level !== Number(levelFilter)) return false;
      if (typeFilter && s.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [spells, search, levelFilter, typeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          &#128220; Bard Spell Compendium
        </h1>
        <p className="text-slate-400">Browse the full bard spell list and find your next song.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search spells..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors"
        >
          <option value="">All Levels</option>
          <option value="0">Cantrips</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
            <option key={l} value={l}>
              {l === 1 ? '1st' : l === 2 ? '2nd' : l === 3 ? '3rd' : `${l}th`} Level
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-colors"
        >
          <option value="">All Types</option>
          <option value="cantrip">Cantrip</option>
          <option value="spell">Spell</option>
          <option value="class_feature">Class Feature</option>
          <option value="subclass_feature">Subclass Feature</option>
        </select>
      </div>

      {loading ? (
        <LoadingBard />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No spells found matching your criteria.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-4">{filtered.length} spell{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((spell) => (
              <SpellCard key={spell._id} spell={spell} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
