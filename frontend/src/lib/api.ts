import type { Spell, Genre, Template, Generation } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function buildQuery(params?: Record<string, string>): string {
  if (!params) return '';
  const filtered = Object.entries(params).filter(([, v]) => v !== '' && v !== undefined);
  if (filtered.length === 0) return '';
  return '?' + new URLSearchParams(filtered).toString();
}

export async function getSpells(params?: Record<string, string>): Promise<Spell[]> {
  return fetchApi<Spell[]>(`/spells${buildQuery(params)}`);
}

export async function getSpell(id: string): Promise<Spell> {
  return fetchApi<Spell>(`/spells/${id}`);
}

export async function getGenres(category?: string): Promise<Genre[]> {
  const query = category ? `?category=${category}` : '';
  return fetchApi<Genre[]>(`/genres${query}`);
}

export async function getGenre(slug: string): Promise<Genre> {
  return fetchApi<Genre>(`/genres/${slug}`);
}

export async function getTemplates(params?: Record<string, string>): Promise<Template[]> {
  return fetchApi<Template[]>(`/templates${buildQuery(params)}`);
}

export async function getRandomTemplate(): Promise<Template> {
  return fetchApi<Template>('/templates/random');
}

export async function getTemplate(id: string): Promise<Template> {
  return fetchApi<Template>(`/templates/${id}`);
}

export async function generateLyrics(data: {
  spellId: string;
  genreId: string;
  customPrompt?: string;
}): Promise<Generation> {
  return fetchApi<Generation>('/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getGeneration(id: string): Promise<Generation> {
  return fetchApi<Generation>(`/generations/${id}`);
}

export async function rateGeneration(id: string, rating: number): Promise<Generation> {
  return fetchApi<Generation>(`/generations/${id}/rate`, {
    method: 'POST',
    body: JSON.stringify({ rating }),
  });
}
