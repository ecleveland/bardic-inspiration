import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpellDocument = HydratedDocument<Spell>;

@Schema({ timestamps: true })
export class Spell {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  level: number; // 0 for cantrips

  @Prop({ required: true })
  school: string;

  @Prop({
    required: true,
    enum: ['cantrip', 'spell', 'class_feature', 'subclass_feature'],
  })
  type: string;

  @Prop()
  subclass?: string; // e.g., "College of Lore", "College of Valor"

  @Prop({ required: true })
  description: string;

  @Prop()
  flavorText?: string;

  @Prop([String])
  tags: string[];
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
SpellSchema.index({ name: 'text', description: 'text' });
