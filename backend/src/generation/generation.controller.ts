import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { GenerationService } from './generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { RateGenerationDto } from './dto/rate-generation.dto';
import { ParseObjectIdPipe } from '../common/pipes';

@ApiTags('generation')
@Controller()
export class GenerationController {
  private readonly logger = new Logger(GenerationController.name);

  constructor(private readonly generationService: GenerationService) {}

  @Post('generate')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async generate(@Body() dto: CreateGenerationDto) {
    try {
      return await this.generationService.generate(dto);
    } catch (error) {
      // The service already maps the failures it can classify. Anything left
      // is a database or programming fault, so log it and hand the caller a
      // generic 500 rather than a stack trace.
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Lyric generation failed', error);
      throw new InternalServerErrorException('Lyric generation failed');
    }
  }

  @Get('generations/:id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.generationService.findOne(id);
  }

  @Post('generations/:id/rate')
  rate(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: RateGenerationDto,
  ) {
    return this.generationService.rate(id, dto.rating);
  }
}
