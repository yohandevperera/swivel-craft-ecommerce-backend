import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Usage and Description - This file will also act skeleton for to create
 * the mongodb document as well as the model that will perform all the
 * database operations
 *
 **/

export type CraftDocument = HydratedDocument<Craft>;

@Schema({ timestamps: true })
export class Craft {
  
  @Prop()
  name: string;

  @Prop()
  categoryId: string;

  @Prop({ maxlength: 400 })
  description: string;

  @Prop()
  qty: number;

  @Prop()
  price: number;

  @Prop()
  photo: string;
}

export const CraftSchema = SchemaFactory.createForClass(Craft);
