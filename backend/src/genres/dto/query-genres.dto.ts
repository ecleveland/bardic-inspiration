import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryGenresDto {
  @ApiPropertyOptional({ enum: ['fantasy', 'modern'] })
  @IsOptional()
  @IsEnum(['fantasy', 'modern'])
  category?: string;
}
