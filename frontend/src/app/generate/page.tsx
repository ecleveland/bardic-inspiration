'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Generation } from '@/lib/types';
import GenerateForm from '@/components/GenerateForm';
import LyricsDisplay from '@/components/LyricsDisplay';
import RatingStars from '@/components/RatingStars';
import LoadingBard from '@/components/LoadingBard';
import { Card, EmptyState } from '@/components/ui';

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const initialSpellId = searchParams.get('spellId') || undefined;

  const [loading, setLoading] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);

  const handleGenerated = useCallback((generation: Generation) => {
    setCurrentGeneration(generation);
    setHistory((prev) => [generation, ...prev]);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          &#9835; Generate Lyrics
        </h1>
        <p className="text-slate-400">
          Pick a spell and a genre to create your bardic masterpiece.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <Card variant="subtle" padding="lg">
            <GenerateForm
              initialSpellId={initialSpellId}
              onGenerated={handleGenerated}
              onLoading={setLoading}
            />
          </Card>
        </div>

        {/* Results */}
        <div>
          {loading && <LoadingBard />}

          {!loading && currentGeneration && (
            <div className="space-y-4">
              <LyricsDisplay
                title={currentGeneration.title}
                lyrics={currentGeneration.lyrics}
              />
              <div className="flex items-center justify-between">
                <RatingStars
                  generationId={currentGeneration._id}
                  currentRating={currentGeneration.rating}
                />
                <span className="text-xs text-slate-500">
                  Model: {currentGeneration.model}
                </span>
              </div>
            </div>
          )}

          {!loading && !currentGeneration && (
            <EmptyState
              icon="&#127930;"
              title="Your lyrics will appear here"
              description="Select a spell and genre, then hit Generate!"
              className="py-20"
            />
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 1 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Previous Generations</h2>
          <div className="space-y-4">
            {history.slice(1).map((gen) => (
              <Card
                key={gen._id}
                variant="interactive"
                padding="sm"
                className="bg-slate-800/40 border-slate-700/30 hover:border-violet-500/40"
                onClick={() => setCurrentGeneration(gen)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-200">{gen.title}</h3>
                  {gen.rating && (
                    <span className="text-amber-400 text-sm">
                      {'★'.repeat(gen.rating)}{'☆'.repeat(5 - gen.rating)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{gen.lyrics}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<LoadingBard className="min-h-[60vh]" />}>
      <GeneratePageContent />
    </Suspense>
  );
}
