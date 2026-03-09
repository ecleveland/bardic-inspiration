import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Generation, GenerationSchema } from './generation.schema';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { SpellsModule } from '../spells/spells.module';
import { GenresModule } from '../genres/genres.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Generation.name, schema: GenerationSchema },
    ]),
    SpellsModule,
    GenresModule,
    TemplatesModule,
  ],
  controllers: [GenerationController],
  providers: [GenerationService],
})
export class GenerationModule {}
