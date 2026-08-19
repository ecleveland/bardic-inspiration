import { cn } from './cn';

type CardVariant = 'default' | 'hoverable' | 'interactive' | 'subtle';
type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  onClick?: () => void;
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-slate-800/80 border border-slate-700/50 rounded-xl',
  hoverable:
    'bg-slate-800/80 border border-slate-700/50 rounded-xl transition-all duration-200 hover:border-violet-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-900/20',
  interactive:
    'bg-slate-800/80 border border-slate-700/50 rounded-xl transition-all duration-200 hover:border-violet-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-violet-900/20 cursor-pointer',
  subtle: 'bg-slate-800/40 border border-slate-700/30 rounded-xl',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  onClick,
}: CardProps) {
  return (
    <div className={cn(variantClasses[variant], paddingClasses[padding], className)} onClick={onClick}>
      {children}
    </div>
  );
}
