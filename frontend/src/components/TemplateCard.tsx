import Link from 'next/link';
import type { Template, Spell, Genre } from '@/lib/types';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const spellName = typeof template.spellId === 'object' ? (template.spellId as Spell).name : 'Unknown Spell';
  const genreName = typeof template.genreId === 'object' ? (template.genreId as Genre).name : 'Unknown Genre';
  const genreCategory = typeof template.genreId === 'object' ? (template.genreId as Genre).category : 'fantasy';

  const firstVerse = template.verses[0] || '';
  const previewLines = firstVerse.split('\n').slice(0, 3).join('\n');

  return (
    <Link href={`/templates/${template._id}`} className="block group">
      <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 h-full transition-all duration-200 hover:border-violet-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-900/20 group-hover:-translate-y-0.5 relative overflow-hidden">
        {template.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              &#9733; Featured
            </span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 transition-colors mb-2 pr-20">
          {template.title}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-violet-400">{spellName}</span>
          <span className="text-slate-600">&#183;</span>
          <span
            className={`text-xs ${genreCategory === 'fantasy' ? 'text-purple-400' : 'text-sky-400'}`}
          >
            {genreName}
          </span>
        </div>
        {previewLines && (
          <pre className="text-sm text-slate-400 font-sans whitespace-pre-wrap line-clamp-3 italic">
            {previewLines}
          </pre>
        )}
      </div>
    </Link>
  );
}
