import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { RateGenerationDto } from './dto/rate-generation.dto';

@ApiTags('generation')
@Controller()
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post('generate')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  generate(@Body() dto: CreateGenerationDto) {
    return this.generationService.generate(dto);
  }

  @Get('generations/:id')
  findOne(@Param('id') id: string) {
    return this.generationService.findOne(id);
  }

  @Post('generations/:id/rate')
  rate(@Param('id') id: string, @Body() dto: RateGenerationDto) {
    return this.generationService.rate(id, dto.rating);
  }
}
