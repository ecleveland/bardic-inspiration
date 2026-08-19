import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// Mongoose's isValid() accepts any 12-byte string, so 'aaaaaaaaaaaa' passes
// and reaches the query as a coerced ObjectId. Match the 24-hex form only.
const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string' || !OBJECT_ID.test(value)) {
      throw new BadRequestException(
        `Invalid ObjectId for parameter '${metadata.data ?? 'id'}'`,
      );
    }
    return value;
  }
}
