'use client';

import { useState } from 'react';
import SpellSelector from './SpellSelector';
import GenreSelector from './GenreSelector';
import { generateLyrics } from '@/lib/api';
import type { Generation } from '@/lib/types';

interface GenerateFormProps {
  initialSpellId?: string;
  onGenerated: (generation: Generation) => void;
  onLoading: (loading: boolean) => void;
}

export default function GenerateForm({ initialSpellId, onGenerated, onLoading }: GenerateFormProps) {
  const [spellId, setSpellId] = useState(initialSpellId || '');
  const [genreId, setGenreId] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!spellId || !genreId) {
      setError('Please select both a spell and a genre.');
      return;
    }
    setError('');
    setSubmitting(true);
    onLoading(true);
    try {
      const result = await generateLyrics({
        spellId,
        genreId,
        customPrompt: customPrompt || undefined,
      });
      onGenerated(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate lyrics. Please try again.');
    } finally {
      setSubmitting(false);
      onLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SpellSelector value={spellId} onChange={setSpellId} />
      <GenreSelector value={genreId} onChange={setGenreId} />

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Custom Prompt <span className="text-slate-500">(optional)</span>
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Add specific instructions, themes, or style notes..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 transition-colors resize-none"
        />
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-900/20 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !spellId || !genreId}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50"
      >
        {submitting ? 'Generating...' : 'Generate Lyrics \u266A'}
      </button>
    </form>
  );
}
