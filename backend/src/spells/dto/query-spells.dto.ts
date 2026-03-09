import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySpellsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  level?: number;

  @ApiPropertyOptional({
    enum: ['cantrip', 'spell', 'class_feature', 'subclass_feature'],
  })
  @IsOptional()
  @IsEnum(['cantrip', 'spell', 'class_feature', 'subclass_feature'])
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subclass?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
