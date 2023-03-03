require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeCommand } from './utls/employee.command';

@Module({
  //'mongodb+srv://john:123@cluster0.5qfa3.mongodb.net/employee-manager-db?retryWrites=true&w=majority'
  imports: [
    CommandModule,
    EmployeesModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@127.0.0.1:27017/`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService, EmployeeCommand],
})
export class AppModule {}
