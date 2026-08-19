import Badge from './ui/Badge';

interface GenreBadgeProps {
  name: string;
  category: 'fantasy' | 'modern';
  className?: string;
}

export default function GenreBadge({ name, category, className = '' }: GenreBadgeProps) {
  const colors =
    category === 'fantasy'
      ? 'bg-violet-600/30 text-violet-300 border-violet-500/40'
      : 'bg-sky-600/30 text-sky-300 border-sky-500/40';

  return (
    <Badge variant="outline" rounded="full" className={`${colors} ${className}`}>
      {name}
    </Badge>
  );
}
