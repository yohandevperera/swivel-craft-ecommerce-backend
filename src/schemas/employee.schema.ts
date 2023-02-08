import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({type:mongoose.Schema.Types.String,enum:['M','F']})
  gender: string;

  @Prop()
  photo: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
