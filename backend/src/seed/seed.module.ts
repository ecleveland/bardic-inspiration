import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SpellsModule } from '../spells/spells.module';
import { GenresModule } from '../genres/genres.module';
import { TemplatesModule } from '../templates/templates.module';
import { Spell, SpellSchema } from '../spells/spell.schema';
import { Genre, GenreSchema } from '../genres/genre.schema';
import { Template, TemplateSchema } from '../templates/template.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/bardic-inspiration',
        ),
      }),
    }),
    MongooseModule.forFeature([
      { name: Spell.name, schema: SpellSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Template.name, schema: TemplateSchema },
    ]),
    SpellsModule,
    GenresModule,
    TemplatesModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
