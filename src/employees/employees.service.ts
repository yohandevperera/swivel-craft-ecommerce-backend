import { Injectable } from '@nestjs/common';
import { CreateUpdateEmployee } from '../models/employee.model';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(
    CreateUpdateEmployee: Omit<CreateUpdateEmployee, 'id' | "photo">,
  ): Promise<Employee> {
    return new this.employeeModel(CreateUpdateEmployee).save();
  }

  async findAll() {
    return this.employeeModel.find();
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async update(
    id: string,
    CreateUpdateEmployee: Omit<CreateUpdateEmployee, 'id'| "photo">,
  ) {
    return this.employeeModel.updateOne(
      { id },
      { $set: { ...CreateUpdateEmployee } },
    );
  }

  async remove(id: string) {
    return this.employeeModel.deleteOne({ id });
  }

  async bulkInsertEmployees(
    employees: Omit<CreateUpdateEmployee, 'id' | 'gender'>[],
  ) {
    return this.employeeModel.insertMany(employees);
  }

  async deleteAllEmployees() {
    return this.employeeModel.remove({});
  }
}
