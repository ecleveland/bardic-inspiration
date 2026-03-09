export interface Spell {
  _id: string;
  name: string;
  level: number;
  school: string;
  type: 'cantrip' | 'spell' | 'class_feature' | 'subclass_feature';
  subclass?: string;
  description: string;
  flavorText?: string;
  tags: string[];
}

export interface Genre {
  _id: string;
  name: string;
  slug: string;
  category: 'fantasy' | 'modern';
  description: string;
  styleGuide: string;
  meterPattern?: string;
  rhymeScheme?: string;
  exampleLines: string[];
}

export interface Template {
  _id: string;
  spellId: Spell | string;
  genreId: Genre | string;
  title: string;
  verses: string[];
  chorus?: string;
  bridge?: string;
  tags: string[];
  isFeatured: boolean;
}

export interface Generation {
  _id: string;
  spellId: Spell | string;
  genreId: Genre | string;
  customPrompt?: string;
  title: string;
  lyrics: string;
  model: string;
  rating?: number;
  createdAt: string;
}
