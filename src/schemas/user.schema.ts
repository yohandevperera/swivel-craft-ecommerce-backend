import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

/**
 * Usage and Description - This file will also act skeleton for to create
 * the mongodb document as well as the model that will perform all the
 * database operations
 *
 **/

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstname: string;

  @Prop({ unique: [true, 'Email should be unqiue'] })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.String, enum: ['ADMIN', 'USER'] })
  userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
