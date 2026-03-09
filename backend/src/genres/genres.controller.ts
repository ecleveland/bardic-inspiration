import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { QueryGenresDto } from './dto/query-genres.dto';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(@Query() query: QueryGenresDto) {
    return this.genresService.findAll(query);
  }

  @Get(':slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.genresService.findOneBySlug(slug);
  }
}
