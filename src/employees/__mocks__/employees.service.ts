import { employeeStub } from '../__tests__/stubs/employee.stub';
import { employeesStub } from '../__tests__/stubs/employees.stub';

/**
 * Usage and Description - This file will return a mock serivice that will
 * act as a temp service that will be used for the unit testing
 **/

export const EmployeesService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(employeeStub()),
  findAll: jest.fn().mockResolvedValue(employeesStub()),
  create: jest.fn().mockResolvedValue(employeeStub()),
  update: jest.fn().mockResolvedValue(employeeStub()),
  remove: jest.fn().mockResolvedValue(employeeStub()),
});
