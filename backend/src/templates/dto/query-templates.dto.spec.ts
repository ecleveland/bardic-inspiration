import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { QueryTemplatesDto } from './query-templates.dto';

const VALID_ID = '507f1f77bcf86cd799439011';

function failedProperties(payload: Record<string, unknown>) {
  return validateSync(plainToInstance(QueryTemplatesDto, payload), {
    whitelist: true,
  }).map((e) => e.property);
}

describe('QueryTemplatesDto', () => {
  it('should accept an empty query', () => {
    expect(failedProperties({})).toHaveLength(0);
  });

  it('should accept valid ObjectId filters', () => {
    expect(
      failedProperties({ spellId: VALID_ID, genreId: VALID_ID }),
    ).toHaveLength(0);
  });

  // These reach the Mongoose filter directly in TemplatesService.findAll,
  // where a non-ObjectId throws an unhandled CastError.
  it('should reject a spellId that is not an ObjectId', () => {
    expect(failedProperties({ spellId: 'not-an-id' })).toContain('spellId');
  });

  it('should reject a genreId that is not an ObjectId', () => {
    expect(failedProperties({ genreId: 'not-an-id' })).toContain('genreId');
  });

  it('should still parse the featured flag from a query string', () => {
    const dto = plainToInstance(QueryTemplatesDto, { featured: 'true' });
    expect(dto.featured).toBe(true);
    expect(failedProperties({ featured: 'true' })).toHaveLength(0);
  });
});
