import Link from 'next/link';
import { cn } from './cn';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <p className="text-slate-500 text-lg mb-2">{title}</p>
      {description && <p className="text-slate-600 text-sm">{description}</p>}
      {action && (
        <div className="mt-4">
          {action.href ? (
            <Link
              href={action.href}
              className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
