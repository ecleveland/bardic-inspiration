'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Spell } from '@/lib/types';
import { getSpells } from '@/lib/api';

const typeIcons: Record<string, string> = {
  cantrip: '\u2728',
  spell: '\u{1F4DC}',
  class_feature: '\u2694\uFE0F',
  subclass_feature: '\u{1F3AD}',
};

const levelLabels: Record<number, string> = {
  0: 'Cantrips',
  1: '1st Level',
  2: '2nd Level',
  3: '3rd Level',
  4: '4th Level',
  5: '5th Level',
  6: '6th Level',
  7: '7th Level',
  8: '8th Level',
  9: '9th Level',
};

interface SpellSelectorProps {
  value: string;
  onChange: (spellId: string) => void;
}

export default function SpellSelector({ value, onChange }: SpellSelectorProps) {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpells()
      .then(setSpells)
      .catch(() => setSpells([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search) return spells;
    const q = search.toLowerCase();
    return spells.filter(
      (s) => s.name.toLowerCase().includes(q) || s.school.toLowerCase().includes(q)
    );
  }, [spells, search]);

  const grouped = useMemo(() => {
    const groups: Record<number, Spell[]> = {};
    filtered.forEach((s) => {
      if (!groups[s.level]) groups[s.level] = [];
      groups[s.level].push(s);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([level, items]) => ({
        level: Number(level),
        label: levelLabels[Number(level)] || `Level ${level}`,
        spells: items.sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }, [filtered]);

  const selectedSpell = spells.find((s) => s._id === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-300 mb-1.5">Choose a Spell</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 border border-slate-700/50 text-left text-slate-200 hover:border-violet-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      >
        <span className={selectedSpell ? 'text-slate-100' : 'text-slate-500'}>
          {selectedSpell
            ? `${typeIcons[selectedSpell.type] || ''} ${selectedSpell.name}`
            : 'Select a spell...'}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl shadow-black/40 max-h-80 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-slate-700/50">
            <input
              type="text"
              placeholder="Search spells..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-600/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {loading && (
              <p className="p-4 text-sm text-slate-500 text-center">Loading spells...</p>
            )}
            {!loading && grouped.length === 0 && (
              <p className="p-4 text-sm text-slate-500 text-center">No spells found</p>
            )}
            {grouped.map((group) => (
              <div key={group.level}>
                <div className="px-3 py-1.5 text-xs font-semibold text-violet-400 uppercase tracking-wider bg-slate-900/50 sticky top-0">
                  {group.label}
                </div>
                {group.spells.map((spell) => (
                  <button
                    key={spell._id}
                    type="button"
                    onClick={() => {
                      onChange(spell._id);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-violet-600/20 transition-colors ${
                      spell._id === value
                        ? 'bg-violet-600/30 text-violet-200'
                        : 'text-slate-300'
                    }`}
                  >
                    {typeIcons[spell.type] || ''} {spell.name}
                    <span className="text-slate-500 ml-2 text-xs capitalize">
                      {spell.school}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
