import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Spell, SpellSchema } from './spell.schema';
import { SpellsService } from './spells.service';
import { SpellsController } from './spells.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }]),
  ],
  controllers: [SpellsController],
  providers: [SpellsService],
  exports: [SpellsService],
})
export class SpellsModule {}
