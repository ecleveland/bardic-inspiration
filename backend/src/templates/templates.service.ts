import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './template.schema';
import { QueryTemplatesDto } from './dto/query-templates.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private templateModel: Model<TemplateDocument>,
  ) {}

  async findAll(query: QueryTemplatesDto): Promise<Template[]> {
    const filter: Record<string, any> = {};

    if (query.spellId) {
      filter.spellId = query.spellId;
    }

    if (query.genreId) {
      filter.genreId = query.genreId;
    }

    if (query.featured !== undefined) {
      filter.isFeatured = query.featured;
    }

    return this.templateModel
      .find(filter)
      .populate('spellId')
      .populate('genreId')
      .exec();
  }

  async findRandom(): Promise<Template | null> {
    const results = await this.templateModel.aggregate([
      { $sample: { size: 1 } },
    ]);
    if (results.length === 0) return null;
    return this.templateModel
      .findById(results[0]._id)
      .populate('spellId')
      .populate('genreId')
      .exec();
  }

  async findOne(id: string): Promise<Template | null> {
    return this.templateModel
      .findById(id)
      .populate('spellId')
      .populate('genreId')
      .exec();
  }

  async findBySpellAndGenre(
    spellId: string,
    genreId: string,
  ): Promise<Template | null> {
    return this.templateModel
      .findOne({ spellId, genreId })
      .populate('spellId')
      .populate('genreId')
      .exec();
  }
}
