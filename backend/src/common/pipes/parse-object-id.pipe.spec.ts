import { BadRequestException } from '@nestjs/common';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

describe('ParseObjectIdPipe', () => {
  const pipe = new ParseObjectIdPipe();
  const metadata = { type: 'param' as const, data: 'id' };

  it('should return the value unchanged for a valid ObjectId', () => {
    const id = '507f1f77bcf86cd799439011';
    expect(pipe.transform(id, metadata)).toBe(id);
  });

  it('should reject a string that is not 24 hex characters', () => {
    expect(() => pipe.transform('not-an-id', metadata)).toThrow(
      BadRequestException,
    );
  });

  it('should reject a 12-character string that Mongoose would coerce', () => {
    // Mongoose accepts any 12-byte string as an ObjectId, which lets
    // 'aaaaaaaaaaaa' through isValid() and into the query.
    expect(() => pipe.transform('aaaaaaaaaaaa', metadata)).toThrow(
      BadRequestException,
    );
  });

  it('should reject an empty string', () => {
    expect(() => pipe.transform('', metadata)).toThrow(BadRequestException);
  });

  it('should name the offending param in the error message', () => {
    expect(() => pipe.transform('nope', metadata)).toThrow(
      "Invalid ObjectId for parameter 'id'",
    );
  });
});

describe('deliberate CI gate check (to be reverted)', () => {
  it('fails on purpose', () => {
    expect(1).toBe(2);
  });
});
