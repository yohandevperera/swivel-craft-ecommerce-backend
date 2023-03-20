import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/schemas/employee.schema';
import { Logger } from '@nestjs/common/services';

/**
 * Usage and Description - This file will act as a wrapper to
 * combine the model functions, service functions and controller functions
 * 
 **/

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, Logger],
  exports: [EmployeesService],
})
export class EmployeesModule {}
