const levelColors: Record<number, string> = {
  0: 'bg-slate-600 text-slate-200',
  1: 'bg-emerald-700 text-emerald-100',
  2: 'bg-teal-700 text-teal-100',
  3: 'bg-sky-700 text-sky-100',
  4: 'bg-blue-700 text-blue-100',
  5: 'bg-violet-700 text-violet-100',
  6: 'bg-purple-700 text-purple-100',
  7: 'bg-fuchsia-700 text-fuchsia-100',
  8: 'bg-rose-700 text-rose-100',
  9: 'bg-amber-700 text-amber-100',
};

const levelLabels: Record<number, string> = {
  0: 'Cantrip',
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th',
  6: '6th',
  7: '7th',
  8: '8th',
  9: '9th',
};

interface SpellLevelBadgeProps {
  level: number;
  className?: string;
}

export default function SpellLevelBadge({ level, className = '' }: SpellLevelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
        levelColors[level] || 'bg-slate-600 text-slate-200'
      } ${className}`}
    >
      {levelLabels[level] || `${level}th`}
    </span>
  );
}
