import { Injectable } from '@nestjs/common';
import { CreateUpdateEmployee } from './dto/create-update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(CreateUpdateEmployee: CreateUpdateEmployee): Promise<Employee> {
    return new this.employeeModel(CreateUpdateEmployee).save();
  }

  async findAll() {
    return this.employeeModel.find();
  }

  async findOne(id: number) {
    return this.employeeModel.findById(id);
  }

  async update(id: number, CreateUpdateEmployee: CreateUpdateEmployee) {
    return this.employeeModel.updateOne(
      { id },
      { $set: { ...CreateUpdateEmployee } },
    );
  }

  async remove(id: number) {
    return this.employeeModel.deleteOne({ id });
  }

  async sortAllEmployees(orderType: 'ascend' | 'descend') {
    return this.employeeModel
      .find()
      .sort({ firstname: orderType == 'ascend' ? 'asc' : 'desc' });
  }

  async searchEmployees(firstName: string) {
    return this.employeeModel.findOne({ firstname: firstName });
  }
}
