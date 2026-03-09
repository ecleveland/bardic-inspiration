import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spell, SpellDocument } from '../spells/spell.schema';
import { Genre, GenreDocument } from '../genres/genre.schema';
import { Template, TemplateDocument } from '../templates/template.schema';
import { SPELLS_SEED } from './spells.seed';
import { GENRES_SEED } from './genres.seed';
import { TEMPLATES_SEED } from './templates.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Spell.name) private spellModel: Model<SpellDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async seed(): Promise<void> {
    console.log('Seeding spells...');
    for (const spell of SPELLS_SEED) {
      await this.spellModel.updateOne(
        { name: spell.name },
        { $set: spell },
        { upsert: true },
      );
    }
    console.log(`Seeded ${SPELLS_SEED.length} spells.`);

    console.log('Seeding genres...');
    for (const genre of GENRES_SEED) {
      await this.genreModel.updateOne(
        { name: genre.name },
        { $set: genre },
        { upsert: true },
      );
    }
    console.log(`Seeded ${GENRES_SEED.length} genres.`);

    console.log('Seeding templates...');
    for (const template of TEMPLATES_SEED) {
      const spell = await this.spellModel
        .findOne({ name: template.spellName })
        .exec();
      const genre = await this.genreModel
        .findOne({ name: template.genreName })
        .exec();

      if (!spell) {
        console.warn(
          `Spell not found for template: ${template.spellName}. Skipping.`,
        );
        continue;
      }
      if (!genre) {
        console.warn(
          `Genre not found for template: ${template.genreName}. Skipping.`,
        );
        continue;
      }

      const { spellName, genreName, ...templateData } = template;

      await this.templateModel.updateOne(
        { spellId: spell._id, genreId: genre._id },
        {
          $set: {
            ...templateData,
            spellId: spell._id,
            genreId: genre._id,
          },
        },
        { upsert: true },
      );
    }
    console.log(`Seeded ${TEMPLATES_SEED.length} templates.`);
  }
}
