import Link from 'next/link';
import type { Spell } from '@/lib/types';
import SpellLevelBadge from './SpellLevelBadge';

const schoolIcons: Record<string, string> = {
  abjuration: '\u{1F6E1}',
  conjuration: '\u{2728}',
  divination: '\u{1F441}',
  enchantment: '\u{1F49C}',
  evocation: '\u{1F525}',
  illusion: '\u{1F300}',
  necromancy: '\u{1F480}',
  transmutation: '\u{1F504}',
};

interface SpellCardProps {
  spell: Spell;
}

export default function SpellCard({ spell }: SpellCardProps) {
  const icon = schoolIcons[spell.school?.toLowerCase()] || '\u2728';

  return (
    <Link href={`/spells/${spell._id}`} className="block group">
      <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 h-full transition-all duration-200 hover:border-violet-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-900/20 group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
            {icon} {spell.name}
          </h3>
          <SpellLevelBadge level={spell.level} />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-slate-400 capitalize">{spell.school}</span>
          <span className="text-slate-600">&#183;</span>
          <span className="text-xs text-slate-400 capitalize">{spell.type.replace('_', ' ')}</span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-3">{spell.description}</p>
        {spell.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {spell.tags.slice(0, 3).map((tag) => (
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
    </Link>
  );
}
