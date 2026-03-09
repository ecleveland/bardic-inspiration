import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryTemplatesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  spellId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  genreId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  featured?: boolean;
}
