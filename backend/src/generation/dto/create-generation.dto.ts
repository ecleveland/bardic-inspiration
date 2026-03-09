import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGenerationDto {
  @ApiProperty()
  @IsString()
  spellId: string;

  @ApiProperty()
  @IsString()
  genreId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customPrompt?: string;
}
