import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ timestamps: true })
export class Genre {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, enum: ['fantasy', 'modern'] })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  styleGuide: string;

  @Prop()
  meterPattern?: string;

  @Prop()
  rhymeScheme?: string;

  @Prop([String])
  exampleLines: string[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
