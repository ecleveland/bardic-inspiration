'use client';

import { useState, useEffect } from 'react';

const messages = [
  'Tuning the lute...',
  'Clearing throat...',
  'Composing verses...',
  'Rolling for inspiration...',
  'Consulting the muses...',
  'Strumming a chord...',
  'Finding the right key...',
  'Weaving words with magic...',
];

export default function LoadingBard({ className = '' }: { className?: string }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-12 ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-violet-500 animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl">
          &#9835;
        </span>
      </div>
      <p className="text-sm text-slate-400 animate-pulse">{messages[messageIndex]}</p>
    </div>
  );
}
