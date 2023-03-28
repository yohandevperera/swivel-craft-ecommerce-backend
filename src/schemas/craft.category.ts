import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Usage and Description - This file will also act skeleton for to create
 * the mongodb document as well as the model that will perform all the
 * database operations
 *
 **/

export type CraftCategoryDocument = HydratedDocument<CraftCategory>;

@Schema({ timestamps: true })
export class CraftCategory {
  @Prop()
  name: string;
}

export const CraftCategorySchema = SchemaFactory.createForClass(CraftCategory);
