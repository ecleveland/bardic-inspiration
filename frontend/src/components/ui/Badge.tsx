import { cn } from './cn';

type BadgeVariant = 'default' | 'solid' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: 'default' | 'full';
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
};

const roundedClasses = {
  default: 'rounded',
  full: 'rounded-full',
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700/50 text-slate-300',
  solid: 'bg-slate-600 text-slate-200 font-semibold',
  outline: 'border border-slate-500/40 bg-slate-600/30 text-slate-300',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  rounded = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        sizeClasses[size],
        roundedClasses[rounded],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
