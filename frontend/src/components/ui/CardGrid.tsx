import { cn } from './cn';

interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
}

const columnClasses = {
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
};

export default function CardGrid({ children, columns = 3, className }: CardGridProps) {
  return <div className={cn(columnClasses[columns], className)}>{children}</div>;
}
