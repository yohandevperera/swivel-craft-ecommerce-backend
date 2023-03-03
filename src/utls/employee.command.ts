import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { EmployeesService } from '../employees/employees.service';
import * as employees from '../utls/employees.json';
import _ = require('lodash');

@Injectable()
export class EmployeeCommand {
  private readonly remappedEmployees = [];
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
