export function getSpellContext(spell: {
  name: string;
  description: string;
  level: number;
  school: string;
}): string {
  const levelLabel =
    spell.level === 0
      ? 'cantrip'
      : `level ${spell.level} spell`;

  return `The spell is "${spell.name}", a ${levelLabel} from the school of ${spell.school}. ${spell.description}

Capture the essence of this spell in your lyrics. The magical effect should be woven naturally into the song — a listener should understand what the spell does just from hearing the lyrics.`;
}
