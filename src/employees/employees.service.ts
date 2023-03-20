import { Injectable } from '@nestjs/common';
import { CreateUpdateEmployee } from '../models/employee.model';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { Model } from 'mongoose';

/**
 * Usage and Description - This file will directly call the
 * model and the defined database to perfom the CRUD operations
 *
 **/

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  /**
   * Usage - This method will be used to create an employee object in the
   * mongooese document
   *
   * @parms CreateUpdateEmployee @typedef Omit<CreateUpdateEmployee, 'id' | 'photo'>
   * @returns @typedef Promise<Employee>
   */
  async create(
    CreateUpdateEmployee: Omit<CreateUpdateEmployee, 'id' | 'photo'>,
  ): Promise<Employee> {
    return new this.employeeModel(CreateUpdateEmployee).save();
  }

  /**
   * Usage - This method will be used to fetch all employee objects in the
   * mongooese document
   *
   * @returns @typedef Promise<Employee[]>
   */
  async findAll() {
    return this.employeeModel.find();
  }

  /**
   * Usage - This method will be used to fetch an employee object for a
   * given employee id from the mongooese document
   *
   * @parms id @typedef string
   * @returns @typedef Promise<Employee>
   */
  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  /**
   * Usage - This method will be used to update an employee object for a
   * given employee id in the mongooese document
   *
   * @parms id @typedef string
   * @parms CreateUpdateEmployee @typedef Omit<CreateUpdateEmployee, 'id' | 'photo'>
   * @returns @typedef Promise<Employee>
   */
  async update(
    id: string,
    CreateUpdateEmployee: Omit<CreateUpdateEmployee, 'id' | 'photo'>,
  ) {
    return this.employeeModel.updateOne(
      { _id: id },
      { $set: { ...CreateUpdateEmployee } },
    );
  }

  /**
   * Usage - This method will be used to remove an employee object for a
   * given employee id in the mongooese document
   *
   * @parms id @typedef string
   * @returns @typedef Promise<Employee>
   */
  async remove(id: string) {
    return this.employeeModel.deleteOne({ id });
  }

  /**
   * Usage - This method will be used to seed multiple employees to
   * the defined mongooese document
   *
   * Note - this method will be used only in the defined seeders
   *
   * @parms employees @typedef Omit<CreateUpdateEmployee, 'id' | 'gender'>[]
   * @returns @typedef Promise<Employee[]>
   */
  async bulkInsertEmployees(
    employees: Omit<CreateUpdateEmployee, 'id' | 'gender'>[],
  ) {
    return this.employeeModel.insertMany(employees);
  }

  /**
   * Usage - This method will be used to remove all employees in
   * the defined mongooese document
   *
   * Note - this method will be used only in the defined seeders
   *
   * @returns @typedef Promise<any>
   */
  async deleteAllEmployees() {
    return this.employeeModel.remove({});
  }

  /**
   * Usage - This method will be used to find an employees in
   * the defined mongooese document for a given employee firstname
   *
   * @parms firstname @typedef string
   * @returns @typedef Promise<Employee>
   */
  async findEmployeeByName(firstname: string) {
    return this.employeeModel.find({ firstname: firstname });
  }

  /**
   * Usage - This method will be used to sort all employees in
   * the defined mongooese document for a given sort type
   *
   * Ex - 'asc' | 'desc'
   *
   * @parms type @typedef enum
   * @returns @typedef Promise<Employee[]>
   */
  async sortEmployees(type: 'asc' | 'desc') {
    return this.employeeModel.find().sort({ _id: type === 'asc' ? 1 : -1 });
  }
}
