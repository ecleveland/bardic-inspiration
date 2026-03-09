import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GenerationDocument = HydratedDocument<Generation>;

@Schema({ timestamps: true })
export class Generation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Spell', required: true })
  spellId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true })
  genreId: mongoose.Types.ObjectId;

  @Prop()
  customPrompt?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  lyrics: string;

  @Prop({ required: true })
  model: string;

  @Prop({ min: 1, max: 5 })
  rating?: number;
}

export const GenerationSchema = SchemaFactory.createForClass(Generation);
