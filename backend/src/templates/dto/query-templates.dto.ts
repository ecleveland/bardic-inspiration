import { IsOptional, IsMongoId, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryTemplatesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  spellId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  genreId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;
}
