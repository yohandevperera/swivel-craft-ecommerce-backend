import { employeeStub } from '../__tests__/stubs/employee.stub';
import { employeesStub } from '../__tests__/stubs/employees.stub';

export const EmployeesService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(employeeStub()),
  findAll: jest.fn().mockResolvedValue(employeesStub()),
  create: jest.fn().mockResolvedValue(employeeStub()),
  update: jest.fn().mockResolvedValue(employeeStub()),
  remove: jest.fn().mockResolvedValue(employeeStub()),
});
