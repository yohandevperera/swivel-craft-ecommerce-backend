import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { EmployeesService } from '../employees/employees.service';
import * as employees from '../utls/employees.json';
import _ = require('lodash');

/**
 * Usage and Description - This file will be used as custom command file
 * that could serve the purpose as a seeder to seed all the employees in the
 * json file as well as to remove all the employees using custom commands
 *
 **/

@Injectable()
export class EmployeeCommand {
  private readonly remappedEmployees = [];

  /**
   * Usage and Description - the constructor will map all the employees
   * to work with the defined mongoDB model
   *
   **/
  constructor(private readonly employeeService: EmployeesService) {
    this.remappedEmployees = employees.map((employee) => ({
      firstname: employee.first_name,
      lastname: employee.last_name,
      email: employee.email,
      phone: employee.number,
      gender: employee.gender,
      photo: employee.photo,
    }));
  }

  /**
   * Usage and Description - Using this function all the employee data
   * in the JSON file will be inserted to the mongooese document
   *
   **/
  @Command({
    command: 'seed:employees',
    describe: 'will insert all the meta data',
  })
  async seed() {
    try {
      if (!_.isUndefined(employees) || !_.isEmpty(employees)) {
        if (!_.isEmpty(this.remappedEmployees)) {
          const addedEmployees = await this.employeeService.bulkInsertEmployees(
            this.remappedEmployees,
          );
          console.log(addedEmployees);

          !_.isEmpty(addedEmployees)
            ? console.log('Employees added successfully')
            : console.log('Error adding employees');
        }
      }
    } catch (error) {
      console.log(`Seeder Exception  ${error}`);
    }
  }

  /**
   * Usage and Description - Using this function all the employee data
   * in mongooese document will be removed
   *
   **/
  @Command({
    command: 'remove:employees',
    describe: 'will delete all the meta data',
  })
  async deleteAllEmployees() {
    try {
      const deletedEmployees = await this.employeeService.deleteAllEmployees();
      console.log(deletedEmployees);
      !_.isEmpty(deletedEmployees)
        ? console.log('Employees deleted successfully')
        : console.log('Error deleting employees');
    } catch (error) {
      console.log(`Delete all Exception  ${error}`);
    }
  }
}
