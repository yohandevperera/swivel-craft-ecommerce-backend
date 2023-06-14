import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

/**
 * Usage and Description - This file will also act skeleton for to create
 * the mongodb document as well as the model that will perform all the
 * database operations
 *
 **/

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  orderId: string;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  craftId: Types.ObjectId;

  @Prop()
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
