import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { QueryTemplatesDto } from './dto/query-templates.dto';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(@Query() query: QueryTemplatesDto) {
    return this.templatesService.findAll(query);
  }

  @Get('random')
  findRandom() {
    return this.templatesService.findRandom();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }
}
