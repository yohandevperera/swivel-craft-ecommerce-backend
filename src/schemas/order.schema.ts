import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  userId: string;

  @Prop()
  craftId: string;

  @Prop()
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
