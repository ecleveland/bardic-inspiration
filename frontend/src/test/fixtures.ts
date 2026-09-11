import type { Generation, Genre, Spell } from '@/lib/types';

export function makeSpell(overrides: Partial<Spell> = {}): Spell {
  return {
    _id: 'spell-vicious-mockery',
    name: 'Vicious Mockery',
    level: 0,
    school: 'enchantment',
    type: 'cantrip',
    description: 'You unleash a string of insults laced with subtle enchantments.',
    tags: ['damage', 'debuff'],
    ...overrides,
  };
}

export function makeGenre(overrides: Partial<Genre> = {}): Genre {
  return {
    _id: 'genre-sea-shanty',
    name: 'Sea Shanty',
    slug: 'sea-shanty',
    category: 'fantasy',
    description: 'Call and response work song.',
    styleGuide: 'Four-line stanzas, heavy downbeat.',
    exampleLines: ['Soon may the wellerman come'],
    ...overrides,
  };
}

export function makeGeneration(overrides: Partial<Generation> = {}): Generation {
  return {
    _id: 'generation-1',
    spellId: 'spell-vicious-mockery',
    genreId: 'genre-sea-shanty',
    title: 'The Mocking Tide',
    lyrics: 'Your sword is dull, your aim is worse',
    model: 'claude-sonnet-4-20250514',
    createdAt: '2026-08-23T00:00:00.000Z',
    ...overrides,
  };
}
