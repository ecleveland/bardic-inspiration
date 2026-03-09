'use client';

import { useState } from 'react';

interface LyricsDisplayProps {
  title: string;
  lyrics?: string;
  verses?: string[];
  chorus?: string;
  bridge?: string;
}

export default function LyricsDisplay({ title, lyrics, verses, chorus, bridge }: LyricsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const fullText = lyrics
    ? lyrics
    : [
        ...(verses || []).map((v, i) => `[Verse ${i + 1}]\n${v}`),
        ...(chorus ? [`[Chorus]\n${chorus}`] : []),
        ...(bridge ? [`[Bridge]\n${bridge}`] : []),
      ].join('\n\n');

  function handleCopy() {
    navigator.clipboard.writeText(`${title}\n\n${fullText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function renderSections() {
    if (lyrics) {
      return <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">{lyrics}</pre>;
    }

    return (
      <div className="space-y-6">
        {verses?.map((verse, i) => (
          <div key={i}>
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
              Verse {i + 1}
            </h4>
            <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">{verse}</pre>
          </div>
        ))}
        {chorus && (
          <div className="border-l-2 border-amber-500/50 pl-4">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Chorus
            </h4>
            <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed italic">
              {chorus}
            </pre>
          </div>
        )}
        {bridge && (
          <div className="border-l-2 border-violet-500/50 pl-4">
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
              Bridge
            </h4>
            <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed">{bridge}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/40">
        <h3 className="text-xl font-bold text-amber-400">&#9835; {title}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div className="px-6 py-5">{renderSections()}</div>
    </div>
  );
}
