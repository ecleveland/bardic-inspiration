import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpellsService } from './spells.service';
import { QuerySpellsDto } from './dto/query-spells.dto';
import { ParseObjectIdPipe } from '../common/pipes';

@ApiTags('spells')
@Controller('spells')
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get()
  findAll(@Query() query: QuerySpellsDto) {
    return this.spellsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.spellsService.findOne(id);
  }
}
