import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  //'mongodb+srv://john:123@cluster0.5qfa3.mongodb.net/employee-manager-db?retryWrites=true&w=majority'
  imports: [
    EmployeesModule,
    MongooseModule.forRoot(
      'mongodb://user:password@127.0.0.1:27017/'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

