require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { EmployeeCommand } from './utls/employee.command';

/**
 * Usage and Description - This file will act as the main
 * app wrapper combining the controller functions and the
 * service functions
 *
 **/

const developmentDBURL = `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`;

@Module({
  //'mongodb+srv://john:123@cluster0.5qfa3.mongodb.net/employee-manager-db?retryWrites=true&w=majority'
  imports: [
    CommandModule,
    EmployeesModule,
    MongooseModule.forRoot(
      process.env.SERVER_ENV == 'development'
        ? developmentDBURL
        : process.env.MONOGO_URL,
    ),
  ],
  controllers: [AppController],
  providers: [AppService, EmployeeCommand],
})
export class AppModule {}
