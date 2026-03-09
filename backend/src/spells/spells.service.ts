import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spell, SpellDocument } from './spell.schema';
import { QuerySpellsDto } from './dto/query-spells.dto';

@Injectable()
export class SpellsService {
  constructor(
    @InjectModel(Spell.name) private spellModel: Model<SpellDocument>,
  ) {}

  async findAll(query: QuerySpellsDto): Promise<Spell[]> {
    const filter: Record<string, any> = {};

    if (query.level !== undefined) {
      filter.level = query.level;
    }

    if (query.type) {
      filter.type = query.type;
    }

    if (query.subclass) {
      filter.subclass = query.subclass;
    }

    if (query.search) {
      try {
        return await this.spellModel
          .find({ ...filter, $text: { $search: query.search } })
          .exec();
      } catch {
        filter.name = { $regex: query.search, $options: 'i' };
      }
    }

    return this.spellModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Spell | null> {
    return this.spellModel.findById(id).exec();
  }
}
