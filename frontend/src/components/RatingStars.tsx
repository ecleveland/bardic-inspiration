'use client';

import { useState } from 'react';
import { rateGeneration } from '@/lib/api';

interface RatingStarsProps {
  generationId: string;
  currentRating?: number;
  onRated?: (rating: number) => void;
}

export default function RatingStars({ generationId, currentRating, onRated }: RatingStarsProps) {
  const [rating, setRating] = useState(currentRating || 0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  async function handleRate(value: number) {
    if (submitting) return;
    setSubmitting(true);
    try {
      await rateGeneration(generationId, value);
      setRating(value);
      onRated?.(value);
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-slate-400 mr-2">Rate:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={submitting}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-xl transition-colors ${
            star <= (hover || rating)
              ? 'text-amber-400'
              : 'text-slate-600 hover:text-slate-500'
          } ${submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          &#9733;
        </button>
      ))}
      {rating > 0 && (
        <span className="text-xs text-slate-500 ml-2">{rating}/5</span>
      )}
    </div>
  );
}
