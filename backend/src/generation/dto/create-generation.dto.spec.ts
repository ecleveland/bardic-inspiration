import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateGenerationDto } from './create-generation.dto';

const VALID_ID = '507f1f77bcf86cd799439011';

function validate(payload: Record<string, unknown>) {
  return validateSync(plainToInstance(CreateGenerationDto, payload), {
    whitelist: true,
  });
}

function failedProperties(payload: Record<string, unknown>) {
  return validate(payload).map((e) => e.property);
}

describe('CreateGenerationDto', () => {
  it('should accept valid ObjectIds with no custom prompt', () => {
    expect(validate({ spellId: VALID_ID, genreId: VALID_ID })).toHaveLength(0);
  });

  describe('ObjectId validation (VEG-63)', () => {
    it('should reject a spellId that is not an ObjectId', () => {
      expect(
        failedProperties({ spellId: 'not-an-id', genreId: VALID_ID }),
      ).toContain('spellId');
    });

    it('should reject a genreId that is not an ObjectId', () => {
      expect(
        failedProperties({ spellId: VALID_ID, genreId: 'not-an-id' }),
      ).toContain('genreId');
    });

    it('should reject a regex object smuggled in as an id', () => {
      expect(
        failedProperties({ spellId: { $ne: null }, genreId: VALID_ID }),
      ).toContain('spellId');
    });
  });

  describe('customPrompt length (VEG-64)', () => {
    it('should accept a custom prompt at the 500 character limit', () => {
      expect(
        validate({
          spellId: VALID_ID,
          genreId: VALID_ID,
          customPrompt: 'a'.repeat(500),
        }),
      ).toHaveLength(0);
    });

    it('should reject a custom prompt over 500 characters', () => {
      expect(
        failedProperties({
          spellId: VALID_ID,
          genreId: VALID_ID,
          customPrompt: 'a'.repeat(501),
        }),
      ).toContain('customPrompt');
    });

    it('should reject a very long custom prompt', () => {
      expect(
        failedProperties({
          spellId: VALID_ID,
          genreId: VALID_ID,
          customPrompt: 'a'.repeat(100_000),
        }),
      ).toContain('customPrompt');
    });
  });
});
