import { IsMongoId, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Each prompt is billed per token upstream, so the cap is a cost control
// as much as an input constraint.
export const CUSTOM_PROMPT_MAX_LENGTH = 500;

export class CreateGenerationDto {
  @ApiProperty()
  @IsMongoId()
  spellId: string;

  @ApiProperty()
  @IsMongoId()
  genreId: string;

  @ApiPropertyOptional({ maxLength: CUSTOM_PROMPT_MAX_LENGTH })
  @IsOptional()
  @IsString()
  @MaxLength(CUSTOM_PROMPT_MAX_LENGTH)
  customPrompt?: string;
}
