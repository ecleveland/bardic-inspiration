import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Spell', required: true })
  spellId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true })
  genreId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop([String])
  verses: string[];

  @Prop()
  chorus?: string;

  @Prop()
  bridge?: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: false })
  isFeatured: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
