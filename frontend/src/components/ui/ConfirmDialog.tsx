'use client';

import { useEffect, useRef } from 'react';
import { cn } from './cn';

type DialogVariant = 'danger' | 'warning' | 'default';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

const confirmButtonClasses: Record<DialogVariant, string> = {
  danger:
    'bg-red-600 hover:bg-red-500 text-white',
  warning:
    'bg-amber-600 hover:bg-amber-500 text-white',
  default:
    'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white',
};

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
        {description && <p className="text-sm text-slate-400 mb-6">{description}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 border border-slate-700/50 hover:bg-slate-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg',
              confirmButtonClasses[variant],
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
