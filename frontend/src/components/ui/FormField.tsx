import { forwardRef } from 'react';
import { cn } from './cn';

// --- FormField wrapper (label + error) ---

interface FormFieldProps {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, optional, error, children, className }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
        {optional && <span className="text-slate-500"> (optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

// --- Shared input base classes ---

const inputBaseClasses =
  'w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-colors';

// --- Input ---

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(inputBaseClasses, className)} {...props} />;
  },
);
Input.displayName = 'Input';

// --- Textarea ---

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea ref={ref} className={cn(inputBaseClasses, 'resize-none', className)} {...props} />
  );
});
Textarea.displayName = 'Textarea';

// --- Select ---

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return <select ref={ref} className={cn(inputBaseClasses, className)} {...props} />;
});
Select.displayName = 'Select';
